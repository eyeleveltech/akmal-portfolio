# Akmal Portfolio — Deployment & Update Guide

Live site: **https://akmalrahman.com** · Admin: **https://akmalrahman.com/admin**

Stack: React + Vite (frontend, static) · Express + Prisma (backend API) · PostgreSQL · Apache (web server + reverse proxy) · PM2 (keeps the API running) · Hostinger VPS.

Project layout (two separate Node apps):

```
akmal-portfolio/
├── backend/    # Express + Prisma API (runs on port 5000)
└── frontend/   # React + Vite site (built to frontend/dist, served by Apache)
```

---

## Making changes

### A) Change article content (no code, no redeploy)
The Writing section is fully managed from the admin panel — **no deployment needed**.

1. Go to **https://akmalrahman.com/admin**
2. Log in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `backend/.env`
3. Add / edit / delete / drag-to-reorder articles
4. Changes appear on the live site within a few seconds

### B) Change the code (text, design, sections, logic)
Edit the source, then redeploy.

**1. Edit locally** (Windows machine).

**2. Push to GitHub:**
```bash
git add .
git commit -m "describe your change"
git push
```

**3. On the VPS, pull and rebuild the part you changed:**
```bash
cd /var/www/akmal-portfolio
git pull
```

If you changed the **frontend** (look / text / sections):
```bash
cd frontend
npm install
npm run build
# Apache serves the new files immediately — no restart needed
```

If you changed the **backend** (API / logic):
```bash
cd backend
npm install
npm run build
pm2 restart akmal-api
```

### Where to change common things
| You want to change... | File |
|---|---|
| Hero text / headline | `frontend/src/components/sections/HeroSection.tsx` |
| Nav menu / logo | `frontend/src/components/sections/Nav.tsx` |
| Story / About text | `frontend/src/components/sections/StorySection.tsx` |
| Work / projects | `frontend/src/components/sections/WorkSection.tsx` |
| Testimonials | `frontend/src/components/sections/TestimonialsSection.tsx` |
| Credentials / background | `frontend/src/components/sections/CredentialsSection.tsx` |
| Footer | `frontend/src/components/sections/Footer.tsx` |
| Booking form / times | `frontend/src/components/sections/BookCallSection.tsx` |
| Writing section layout | `frontend/src/components/sections/WritingSection.tsx` |

---

## First-time deployment (reference)

Replace placeholders: `YOUR_VPS_IP`, `STRONG_DB_PASSWORD`.

### 1. DNS (Hostinger → Domains → akmalrahman.com → DNS)
| Type | Name | Content | TTL |
|------|------|---------|-----|
| A | `@` | `YOUR_VPS_IP` | 3600 |
| CNAME | `www` | `akmalrahman.com` | 3600 |

Only **one** A record for `@`. Verify: `ping akmalrahman.com` → returns your VPS IP.

### 2. Server basics
```bash
ssh root@YOUR_VPS_IP
apt update && apt upgrade -y
apt install -y ufw git
ufw allow OpenSSH && ufw allow 'Apache Full' && ufw --force enable
```

### 3. Node.js 22
```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v && npm -v
```

### 4. PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable --now postgresql

sudo -u postgres psql <<SQL
CREATE DATABASE akmal_portfolio;
CREATE USER akmal_user WITH ENCRYPTED PASSWORD 'STRONG_DB_PASSWORD';
GRANT ALL PRIVILEGES ON DATABASE akmal_portfolio TO akmal_user;
\c akmal_portfolio
GRANT ALL ON SCHEMA public TO akmal_user;
SQL
```
> Use a letters-and-numbers-only password to avoid URL-encoding issues in `DATABASE_URL`.

### 5. Get the code
```bash
cd /var/www
sudo git clone https://github.com/eyeleveltech/akmal-portfolio.git
sudo chown -R $USER:$USER /var/www/akmal-portfolio
```

### 6. Backend
```bash
cd /var/www/akmal-portfolio/backend
nano .env
```
Paste (real values — this file is NOT in git):
```env
DATABASE_URL="postgresql://akmal_user:STRONG_DB_PASSWORD@localhost:5432/akmal_portfolio?schema=public"
PORT=5000
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="a-strong-admin-password"
JWT_SECRET="a-long-random-string"
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GOOGLE_REFRESH_TOKEN="..."
GOOGLE_CALENDAR_TIMEZONE="Asia/Kolkata"
```
Generate a `JWT_SECRET`: `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"`

Build, init DB, run under PM2:
```bash
npm install            # also runs prisma generate
npm run build          # compiles to dist/
npx prisma db push     # creates tables
npm run seed           # loads starter articles
sudo npm install -g pm2
pm2 start dist/server.js --name akmal-api
pm2 save
pm2 startup            # run the command it prints, then: pm2 save
```
Check: `curl http://localhost:5000/api/articles` → returns JSON.

### 7. Frontend
```bash
cd /var/www/akmal-portfolio/frontend
echo 'VITE_API_URL="/api"' > .env.production
npm install
npm run build          # outputs to frontend/dist
```

### 8. Apache
```bash
sudo apt install -y apache2
sudo a2enmod proxy proxy_http rewrite ssl headers

sudo tee /etc/apache2/sites-available/akmal.conf > /dev/null <<'EOF'
<VirtualHost *:80>
    ServerName akmalrahman.com
    ServerAlias www.akmalrahman.com

    DocumentRoot /var/www/akmal-portfolio/frontend/dist

    <Directory /var/www/akmal-portfolio/frontend/dist>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
        FallbackResource /index.html
    </Directory>

    ProxyPreserveHost On
    ProxyPass /api http://127.0.0.1:5000/api
    ProxyPassReverse /api http://127.0.0.1:5000/api

    ErrorLog ${APACHE_LOG_DIR}/akmal_error.log
    CustomLog ${APACHE_LOG_DIR}/akmal_access.log combined
</VirtualHost>
EOF

sudo a2ensite akmal.conf
sudo a2dissite 000-default.conf   # ignore "does not exist" if already off
sudo apache2ctl configtest        # Syntax OK
sudo systemctl reload apache2
```

### 9. HTTPS (free SSL)
```bash
sudo apt install -y certbot python3-certbot-apache
sudo certbot --apache -d akmalrahman.com -d www.akmalrahman.com
```
Choose redirect HTTP → HTTPS. Auto-renews; test: `sudo certbot renew --dry-run`.

### 10. Google Calendar in production
While the OAuth consent screen is in **Testing** mode, refresh tokens expire after 7 days. Fix once:
**Google Cloud Console → APIs & Services → OAuth consent screen → Publish App** (move to Production). No verification needed for your own account.

---

## Troubleshooting

| Symptom | Check |
|--------|-------|
| `npm error ENOENT package.json` | You're in the repo root — `cd backend` or `cd frontend` first |
| `datasource.url required` / `password must be a string` | `backend/.env` missing or `DATABASE_URL` not set. Test: `node -e "require('dotenv/config');console.log(process.env.DATABASE_URL)"` |
| `P1000 Authentication failed` | DB password in `.env` ≠ actual user password. Reset: `sudo -u postgres psql -c "ALTER USER akmal_user WITH PASSWORD 'NewPass123';"` then update `.env` |
| Site loads but no articles | `pm2 status` (API up?), `pm2 logs akmal-api`, `curl localhost:5000/api/articles` |
| `/admin` 404 on refresh | `FallbackResource /index.html` in vhost + `a2enmod rewrite` |
| 502 on `/api` | Backend down (`pm2 status`) or proxy modules not enabled |
| `Site akmal does not exist` | `/etc/apache2/sites-available/akmal.conf` not created (Step 8) |
| Frontend changes not showing | Re-run `npm run build` in `frontend/`; hard-refresh browser (Ctrl+F5) |

---

## Useful commands

```bash
pm2 status                 # backend process state
pm2 logs akmal-api         # live backend logs
pm2 restart akmal-api      # restart backend after changes
sudo systemctl reload apache2
sudo tail -f /var/log/apache2/akmal_error.log
```

## Security notes
- Real secrets live ONLY in `backend/.env` (git-ignored). Never put them in `.env.example`.
- Keep PostgreSQL bound to `localhost` (don't expose 5432 publicly).
- Use strong, unique values for `ADMIN_PASSWORD` and `JWT_SECRET` in production.

/**
 * One-time helper to obtain a Google OAuth REFRESH TOKEN for the booking
 * feature. Run it AFTER you have set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET
 * in your .env file:
 *
 *   npm run get-google-token
 *
 * LOCAL machine (default): listens on http://localhost:5000/oauth2callback.
 * Stop your dev server first so port 5000 is free.
 *
 * PRODUCTION server (browser is on a different device): set a public redirect
 * URI that points back to the VPS, and a free local port for Apache to proxy:
 *
 *   OAUTH_REDIRECT_URI="https://akmalrahman.com/oauth2callback" \
 *   OAUTH_CALLBACK_PORT=5050 npm run get-google-token
 *
 * The redirect URI must be added to your Google OAuth client's
 * "Authorized redirect URIs", and Apache must proxy /oauth2callback to the
 * local port (see DEPLOYMENT.md). The refresh token is printed to paste into
 * .env as GOOGLE_REFRESH_TOKEN.
 */
import 'dotenv/config';
import http from 'http';
import { google } from 'googleapis';

// Port the helper's local server listens on (Apache proxies to this in prod).
const PORT = Number(process.env.OAUTH_CALLBACK_PORT) || 5000;
// Redirect URI registered in Google Console. Defaults to localhost for local use.
const REDIRECT_URI =
  process.env.OAUTH_REDIRECT_URI || `http://localhost:${PORT}/oauth2callback`;
const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  console.error(
    '\nMissing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET in .env.\n' +
      'Add them first (see the integration steps), then re-run this script.\n'
  );
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIRECT_URI
);

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline', // required to receive a refresh token
  prompt: 'consent', // force a refresh token even on repeat authorisations
  scope: SCOPES,
});

const server = http.createServer(async (req, res) => {
  if (!req.url || !req.url.startsWith('/oauth2callback')) {
    res.writeHead(404).end();
    return;
  }

  const url = new URL(req.url, `http://localhost:${PORT}`);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    res.writeHead(400).end(`Authorisation failed: ${error}`);
    console.error(`\nAuthorisation failed: ${error}\n`);
    server.close();
    return;
  }

  if (!code) {
    res.writeHead(400).end('Missing authorisation code.');
    return;
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    res.writeHead(200, { 'Content-Type': 'text/html' }).end(
      '<h2>Success!</h2><p>You can close this tab and return to the terminal.</p>'
    );

    if (tokens.refresh_token) {
      console.log('\n========================================================');
      console.log('SUCCESS. Add this line to your backend/.env file:\n');
      console.log(`GOOGLE_REFRESH_TOKEN="${tokens.refresh_token}"`);
      console.log('========================================================\n');
    } else {
      console.log(
        '\nNo refresh token returned. Remove this app at ' +
          'https://myaccount.google.com/permissions and run the script again ' +
          '(the consent prompt only returns a refresh token on first approval).\n'
      );
    }
  } catch (e) {
    res.writeHead(500).end('Failed to exchange code for tokens.');
    console.error('\nFailed to exchange code for tokens:', e);
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log('\n1. Open this URL in your browser and approve access:\n');
  console.log(authUrl);
  console.log('\n2. After approving, the refresh token will appear here.\n');
});

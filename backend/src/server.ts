import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { authenticateAdmin } from './middleware/auth';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const app = express();
const prisma = new PrismaClient({ adapter });
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password123';
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev';

// Auth Route
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Public Route: Get all articles
app.get('/api/articles', async (req: Request, res: Response) => {
  try {
    const articles = await prisma.article.findMany({
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Protected Routes
app.post('/api/articles', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const lastArticle = await prisma.article.findFirst({
      orderBy: { order: 'desc' },
    });
    const order = lastArticle ? lastArticle.order + 1 : 0;

    const article = await prisma.article.create({
      data: { ...req.body, order },
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

import { createMeetEvent } from './services/googleCalendar';

app.post('/api/book-call', async (req: Request, res: Response) => {
  const { name, email, company, date, time } = req.body;

  if (!name || !email || !date || !time) {
    res.status(400).json({ error: 'Missing required fields' });
    return;
  }

  try {
    let meetLink = null;
    
    // Attempt to create the Google Meet event
    try {
      const meetEvent = await createMeetEvent(name, email, date, time);
      if (meetEvent.conferenceData && meetEvent.conferenceData.entryPoints) {
        const videoEntry = meetEvent.conferenceData.entryPoints.find((e: any) => e.entryPointType === 'video');
        if (videoEntry) meetLink = videoEntry.uri;
      }
    } catch (gcalError) {
      console.error('Failed to create Google Meet event, but proceeding to save booking:', gcalError);
    }

    // Save to database
    const booking = await prisma.booking.create({
      data: {
        name,
        email,
        company,
        date,
        time,
        meetLink
      }
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: 'Failed to process booking' });
  }
});

app.put('/api/articles/reorder', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    
    await prisma.$transaction(
      items.map((item: { id: string; order: number }) =>
        prisma.article.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    );
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reorder articles' });
  }
});

app.put('/api/articles/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const article = await prisma.article.update({
      where: { id: String(req.params.id) },
      data: req.body,
    });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

app.delete('/api/articles/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    await prisma.article.delete({
      where: { id: String(req.params.id) },
    });
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

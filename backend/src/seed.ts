import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const fallbackArticles = [
  {
    category: "Client-Side Insider",
    title: "Why every agency brief you've ever written has probably missed the point",
    excerpt: "The problem isn't that agencies don't listen. It's that we brief them on tactics when what we actually need is for them to understand our business model...",
    platform: "LinkedIn",
    readTime: "",
    url: "#"
  },
  {
    category: "AI + Marketing",
    title: "The AI tools that actually saved hours — and the ones that just looked good in demos",
    excerpt: "Six months of testing AI tools inside actual client campaigns. Here's what moved the needle — and what was just hype dressed up in a nice interface...",
    platform: "LinkedIn",
    readTime: "",
    url: "#"
  },
  {
    category: "360-Degree Philosophy",
    title: "Marketing isn't a department. It's a disposition.",
    excerpt: "The companies that grow fastest don't have great marketing teams. They have founders who understand that everything is marketing — from how you hire to how you price...",
    platform: "LinkedIn",
    readTime: "",
    url: "#"
  },
  {
    category: "Client-Side Insider",
    title: "What Agencies Don't Tell You When They Pitch to You",
    excerpt: "The deck is rehearsed. The strategy is not. I've been on both sides of the pitch table — as the marketing head being sold to, and now as the one pitching. Here's what actually happens in the room.",
    platform: "Medium",
    readTime: "4 min read",
    url: "https://medium.com/@akmal_29859/what-agencies-dont-tell-you-when-they-pitch-to-you-bc754ff54ddc"
  },
  {
    category: "360-Degree Philosophy",
    title: "The Mamdani Method: What Every Founder Can Steal From the Most Effective Digital Communicator in Modern Politics",
    excerpt: "I reverse-engineered how Zohran Mamdani built a mass following — and realised I'd been making all the wrong branding mistakes. Here's the framework any founder can apply.",
    platform: "Medium",
    readTime: "9 min read",
    url: "https://medium.com/@akmal_29859/the-mamdani-method-what-every-founder-can-steal-from-the-most-effective-digital-communicator-in-ebc5a9f980e3"
  }
];

async function main() {
  console.log('Seeding database with original articles...');
  for (const article of fallbackArticles) {
    // Check if it already exists to avoid duplicates if run multiple times
    const existing = await prisma.article.findFirst({
      where: { title: article.title }
    });
    if (!existing) {
      await prisma.article.create({
        data: article
      });
      console.log(`Created: ${article.title}`);
    } else {
      console.log(`Already exists: ${article.title}`);
    }
  }
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

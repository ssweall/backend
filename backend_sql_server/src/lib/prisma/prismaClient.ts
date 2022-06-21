import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const generateDbUrl = (): string => {
  const url = process.env.DATABASE_URL;

  if (!url) throw new Error('❌ Please provide a database url');

  return url;
};

const prismaClient = new PrismaClient({
  datasources: { db: { url: generateDbUrl() } },
});

export default prismaClient;

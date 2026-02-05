/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PrismaPg } from '@prisma/adapter-pg';
import { Category, PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.MOVIES_DATABASE_URL,
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const moviesData = [
  {
    title: 'Inception',
    description: 'A mind-bending thriller about dream invasion.',
    duration: 148,
    coverImage:
      'https://www.ecranlarge.com/content/uploads/2020/02/inception-affiche-francaise-1164840.png',
    category: Category.SCI_FI,
    releaseDate: new Date('2010-07-16'),
    rating: 8.8,
  },
  {
    title: 'The Godfather',
    description:
      'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
    duration: 175,
    coverImage:
      'https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg',
    category: Category.CRIME,
    releaseDate: new Date('1972-03-24'),
    rating: 9.2,
  },
  {
    title: 'The Dark Knight',
    description:
      'When the menace known as the Joker wreaks havoc, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    duration: 152,
    coverImage:
      'https://upload.wikimedia.org/wikipedia/en/8/8a/Dark_Knight.jpg',
    category: Category.ACTION,
    releaseDate: new Date('2008-07-18'),
    rating: 9.0,
  },
];

export async function main() {
  for (const movie of moviesData) {
    await prisma.movie.upsert({
      where: {
        title_releaseDate: {
          title: movie.title,
          releaseDate: movie.releaseDate,
        },
      },
      update: movie,
      create: movie,
    });
  }
  console.log('Seeding completed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

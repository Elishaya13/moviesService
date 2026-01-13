/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // 1. Create connection string from environment variables
    const connectionString = process.env.MOVIES_DATABASE_URL;

    // 2. Create the Postgres connection pool
    const pool = new Pool({
      connectionString,
    });

    // 3. Create the Prisma adapter
    const adapter = new PrismaPg(pool);

    // 4. Pass the adapter to the parent constructor
    super({ adapter });
  }

  // 5. Connect on module initialization
  async onModuleInit() {
    await this.$connect();
  }

  // 6. Disconnect on application shutdown
  async onModuleDestroy() {
    await this.$disconnect();
  }
}

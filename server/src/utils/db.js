import "dotenv/config";
import { PrismaClient } from "@prisma/client"; //the API you write queries against (type-safe)
import { PrismaPg } from "@prisma/adapter-pg"; //  bridge/adapter that lets Prisma use pg as its driver
import pg from "pg"; // the actual PostgreSQL driver (does the network work)
const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma = new PrismaClient({ adapter });

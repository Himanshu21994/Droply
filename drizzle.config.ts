import * as dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: ".env.local"});

if(!process.env.DATABASE_URL){
  throw new Error("DATABASE_URL is not set in .env.local")
}

export default defineConfig({
  out: './drizzle',
  schema: './app/lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!  // non-null assertion since we check above  
  },
  migrations: {           // if there will any changes in database schema, drizzle will keep track of them here
    table: "__drizzle_migrations",
    schema: "public"
  },
  verbose: true,  // helpful for debugging giving more details in console
  strict: true,  // give error instead of warning for potential issues
});

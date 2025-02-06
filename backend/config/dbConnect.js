import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';

dotenv.config();

//creates SQL connection using the environment variables
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

export const sql = neon(
  `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);

//This SQL function we export is used as a tagged temperate literal which allows us to write SQL queries in a more readable way.

// postgresql://neondb_owner:npg_w8JFir1dRWuS@ep-snowy-meadow-a90flkhf-pooler.gwc.azure.neon.tech/productstoredb?sslmode=require
//

//postgresql://neondb_owner:npg_w8JFir1dRWuS@ep-snowy-meadow-a90flkhf-pooler.gwc.azure.neon.tech/productstoredb?sslmode=require

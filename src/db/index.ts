import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

let dbInstance: MySql2Database<typeof schema> | null = null;

export const getDb = async () => {
  if (!dbInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error("DATABASE_URL environment variable is not defined");
    }
    const connection = await mysql.createConnection(process.env.DATABASE_URL);
    dbInstance = drizzle(connection, { schema, mode: "default" });
  }
  return dbInstance;
};

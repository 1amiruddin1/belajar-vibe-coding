import { Elysia } from "elysia";
import { getDb } from "./db";
import { sql } from "drizzle-orm";

const port = process.env.PORT || 3000;

const app = new Elysia()
  .get("/", () => "Welcome to Elysia + Drizzle + MySQL boilerplate!")
  .get("/health", async ({ set }) => {
    try {
      const db = await getDb();
      await db.execute(sql`SELECT 1`);
      return {
        status: "OK",
        database: "connected",
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      set.status = 500;
      return {
        status: "Error",
        database: "disconnected",
        error: error.message || error,
        timestamp: new Date().toISOString(),
      };
    }
  })
  .listen(port);

console.log(
  `🦊 Elysia server is running at http://${app.server?.hostname}:${app.server?.port}`
);

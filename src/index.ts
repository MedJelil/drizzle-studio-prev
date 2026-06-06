import "dotenv/config";
import { resolveDialect } from "./db/dialect";

export async function makeDb() {
  const url = process.env.DATABASE_URL!;

  if (resolveDialect(url) === "postgresql") {
    const { drizzle } = await import("drizzle-orm/node-postgres");
    return drizzle(url);
  }

  const { drizzle } = await import("drizzle-orm/mysql2");
  return drizzle(url);
}

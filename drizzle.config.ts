import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { resolveDialect } from "./src/db/dialect";

// Dialect is inferred from the DATABASE_URL scheme (mysql:// or postgresql://)
const dialect = resolveDialect();

export default defineConfig({
  out: `./drizzle/${dialect}`,
  schema: `./src/db/schema.${dialect}.ts`,
  dialect,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

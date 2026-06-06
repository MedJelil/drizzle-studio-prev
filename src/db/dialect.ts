// Infer the Drizzle dialect from the DATABASE_URL scheme.
export function resolveDialect(url = process.env.DATABASE_URL) {
  if (!url) throw new Error("DATABASE_URL is not set");

  const scheme = url.split("://")[0].toLowerCase();

  if (scheme === "mysql" || scheme === "mysql2") return "mysql" as const;
  if (scheme === "postgres" || scheme === "postgresql" || scheme === "pg")
    return "postgresql" as const;

  throw new Error(`Unsupported database URL scheme: "${scheme}://"`);
}

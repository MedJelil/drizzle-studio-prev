# drizzle-studio-prev

Preview and browse an existing **MySQL** or **PostgreSQL** database with
[Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview). The engine
is inferred automatically from the `DATABASE_URL` scheme — no extra config.

## Setup

```bash
pnpm install
cp .env.example .env
```

Then set `DATABASE_URL` in `.env` to your database:

```bash
# MySQL
DATABASE_URL=mysql://user:password@localhost:3306/dbname

# Postgres
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
```

The dialect (`mysql` vs `postgresql`) is resolved from the URL scheme by
[`src/db/dialect.ts`](src/db/dialect.ts), so switching engines is just a matter
of changing the connection string.

## Usage

```bash
# Launch Drizzle Studio (web UI to browse/query the DB)
pnpm studio

# Introspect an existing database into a schema file
pnpm pull
```

`pull` writes the generated schema and migrations into `drizzle/<dialect>/`.

## Schema

Table definitions are kept **per dialect**, since Drizzle's column builders
differ between engines:

- [`src/db/schema.mysql.ts`](src/db/schema.mysql.ts) — `drizzle-orm/mysql-core`
- [`src/db/schema.postgresql.ts`](src/db/schema.postgresql.ts) — `drizzle-orm/pg-core`

[`drizzle.config.ts`](drizzle.config.ts) automatically selects the schema and
output directory matching the current `DATABASE_URL`.

## Connecting in code

`makeDb()` in [`src/index.ts`](src/index.ts) returns a Drizzle client wired to
the correct driver (`mysql2` or `node-postgres`) based on the URL:

```ts
import { makeDb } from "./src/index";

const db = await makeDb();
```

## Project layout

```
drizzle.config.ts          # dialect-aware Drizzle Kit config
src/
  index.ts                 # makeDb() — runtime client
  db/
    dialect.ts             # resolveDialect(url) helper
    schema.mysql.ts        # MySQL tables
    schema.postgresql.ts   # Postgres tables
```

## Author

Jelil

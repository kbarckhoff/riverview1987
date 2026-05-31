// Creates the tables and (optionally) loads sample data.
//
//   npm run db:setup          -> create tables + load sample data
//   npm run db:setup -- --no-seed   -> create tables only
//
// Reads DATABASE_URL from .env.local (or your shell environment).

require("dotenv").config({ path: ".env.local" });
const fs = require("fs");
const path = require("path");
const { Client } = require("pg");

// SSL off for local Postgres, on for hosted. Override with PGSSL=require/disable.
function sslConfig() {
  const url = process.env.DATABASE_URL || "";
  if (process.env.PGSSL === "require") return { rejectUnauthorized: false };
  if (process.env.PGSSL === "disable") return false;
  const isLocal = /@(localhost|127\.0\.0\.1)(:|\/)/.test(url);
  return isLocal ? false : { rejectUnauthorized: false };
}

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error(
      "\n  Missing DATABASE_URL. Copy .env.example to .env.local and paste your connection string.\n"
    );
    process.exit(1);
  }

  const seed = !process.argv.includes("--no-seed");
  const client = new Client({ connectionString: url, ssl: sslConfig() });

  await client.connect();
  console.log("Connected. Creating tables...");
  const schema = fs.readFileSync(path.join(__dirname, "../db/schema.sql"), "utf8");
  await client.query(schema);
  console.log("Tables ready.");

  if (seed) {
    console.log("Loading sample data...");
    const seedSql = fs.readFileSync(path.join(__dirname, "../db/seed.sql"), "utf8");
    await client.query(seedSql);
    console.log("Sample data loaded.");
  }

  await client.end();
  console.log("\nDone. Run `npm run dev` and open http://localhost:3000\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

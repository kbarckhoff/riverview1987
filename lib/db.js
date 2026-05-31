import { Pool } from "pg";

// Decide whether to use SSL:
//  - Local Postgres (localhost/127.0.0.1) usually has SSL OFF.
//  - Hosted Postgres (Neon, Supabase, etc.) requires SSL ON.
//  - Override with PGSSL=require or PGSSL=disable if needed.
function sslConfig() {
  const url = process.env.DATABASE_URL || "";
  if (process.env.PGSSL === "require") return { rejectUnauthorized: false };
  if (process.env.PGSSL === "disable") return false;
  const isLocal = /@(localhost|127\.0\.0\.1)(:|\/)/.test(url);
  return isLocal ? false : { rejectUnauthorized: false };
}

// A single shared connection pool. In dev, Next.js hot-reloads modules, so we
// cache the pool on globalThis to avoid opening a new pool on every reload.
let pool = globalThis._pgPool;

if (!pool) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: sslConfig(),
    max: 5,
  });
  globalThis._pgPool = pool;
}

/**
 * Run a parameterized query.
 * @param {string} text - SQL with $1, $2 placeholders
 * @param {any[]} params - values for the placeholders
 * @returns {Promise<import('pg').QueryResult>}
 */
export async function query(text, params = []) {
  return pool.query(text, params);
}

export default pool;

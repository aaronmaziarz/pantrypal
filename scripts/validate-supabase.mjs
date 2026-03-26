import { existsSync } from "node:fs";

const requiredPaths = [
  "infra/supabase/config.toml",
  "infra/supabase/migrations",
  "infra/supabase/policies"
];

const missing = requiredPaths.filter((path) => !existsSync(path));

if (missing.length > 0) {
  console.error("Supabase scaffold is incomplete:");
  for (const path of missing) {
    console.error(`- ${path}`);
  }
  process.exit(1);
}

console.log("Supabase scaffold looks valid.");

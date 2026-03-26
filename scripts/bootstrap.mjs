import { execFileSync } from "node:child_process";

function run(command, args, options = {}) {
  execFileSync(command, args, {
    stdio: "inherit",
    ...options
  });
}

run("node", ["scripts/check-env.mjs"]);

run("npm", ["exec", "--", "nx", "show", "projects"]);

run("flutter", ["pub", "get"], {
  cwd: new URL("../apps/mobile", import.meta.url)
});

console.log("");
console.log("Bootstrap complete. Run `npm run lint`, `npm run test`, and `npm run build`.");

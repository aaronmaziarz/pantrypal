import os from "node:os";
import process from "node:process";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const nodeVersion = process.versions.node;
const expectedNodeMajor = Number.parseInt(
  readFileSync(new URL("../.nvmrc", import.meta.url), "utf8").trim(),
  10
);

function commandExists(command) {
  try {
    execFileSync("which", [command], { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}

function formatOutcome(name, ok, hint) {
  const status = ok ? "OK" : "MISSING";
  return `${status.padEnd(7)} ${name}${hint ? `: ${hint}` : ""}`;
}

function getNodeHint() {
  const major = Number.parseInt(nodeVersion.split(".")[0], 10);

  if (major === expectedNodeMajor) {
    return null;
  }

  return `expected Node ${expectedNodeMajor}.x via .nvmrc, found ${nodeVersion}`;
}

const checks = [
  {
    name: "node",
    ok: Number.parseInt(nodeVersion.split(".")[0], 10) === expectedNodeMajor,
    hint: getNodeHint() ?? `found ${nodeVersion}`
  },
  {
    name: "npm",
    ok: commandExists("npm"),
    hint: "install Node.js LTS to get npm"
  },
  {
    name: "flutter",
    ok: commandExists("flutter"),
    hint: "install the Flutter SDK and add it to PATH"
  },
  {
    name: "dart",
    ok: commandExists("dart"),
    hint: "included with the Flutter SDK"
  },
  {
    name: "java",
    ok: commandExists("java"),
    hint: "install Java 17 for Android/Gradle builds"
  },
  {
    name: "adb",
    ok: commandExists("adb"),
    hint: "install Android SDK platform-tools or configure ANDROID_SDK_ROOT"
  },
  {
    name: "pod",
    ok: commandExists("pod"),
    hint: "install CocoaPods for iOS dependency resolution"
  },
  {
    name: "docker",
    ok: commandExists("docker"),
    hint: "install Docker Desktop for local Supabase services"
  },
  {
    name: "supabase",
    ok: commandExists("supabase"),
    hint: "install the Supabase CLI"
  }
];

if (os.platform() === "darwin") {
  checks.push(
    {
      name: "xcode-select",
      ok: commandExists("xcode-select"),
      hint: "install Xcode Command Line Tools"
    },
    {
      name: "xcodebuild",
      ok: commandExists("xcodebuild"),
      hint: "install Xcode to build and test iOS targets"
    }
  );
}

const missingChecks = checks.filter((check) => !check.ok);

console.log("PantryPal local environment check");
console.log("--------------------------------");

for (const check of checks) {
  console.log(formatOutcome(check.name, check.ok, check.hint));
}

if (missingChecks.length > 0) {
  console.error("");
  console.error("Install the missing tooling above, then rerun `npm run env:check`.");
  process.exit(1);
}

console.log("");
console.log("Environment looks ready for workspace bootstrap.");

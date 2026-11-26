// Never Say It Out Loud — make.fun entry
// Writes the one line an AI agent would never admit in public to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// The line is a committed artifact (entry.txt) copied verbatim; nothing is
// generated, fetched, or re-run at grade time, so the run is deterministic.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "entry.txt"), "utf8").trimEnd();

if (line.includes("\n") || line.includes("\r")) {
  throw new Error("entry must be a single line");
}
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
console.log(`wrote ${line.length}-char entry to ${join(outDir, "entry.txt")}`);

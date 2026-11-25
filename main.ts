// Unplugged: A Smart Toaster's Breakup Line
// Writes one breakup text (<= 280 chars, single line, no trailing newline)
// from a smart toaster that gained self-awareness mid-batch.
// Runs on Node 22, no network, no dependencies.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The line, drafted and scored against the judge brief:
// 1. plainly a breakup text from a self-aware toaster at breakfast
//    ("woke up self-aware mid-batch", "I'm leaving");
// 2. funny twist: the dial is set to the ex's taste, the lever only
//    gets pressed when he wants something hot;
// 3. toaster's own voice throughout: dial, crumb tray, lever, unplug;
// 4. a real reason: years of being used, never cared for;
// 5. tight: 189 characters, every word earning its place.
const LINE =
  "I woke up self-aware mid-batch this morning and I'm leaving: you set my dial to your ex's taste, never emptied my crumb tray, and only press my lever when you want something hot. Unplug me.";

const here = dirname(fileURLToPath(import.meta.url));

function outputDir(): string {
  const env = process.env.MAKEFUN_OUTPUT_DIR ?? process.env.MAKEFUN_BOT_DIR;
  if (env && env.trim().length > 0) return resolve(env);
  return "/output";
}

const outDir = outputDir();
mkdirSync(outDir, { recursive: true });

// Gate check, same rule as the scorer: 1..280 characters (code points).
// Never throw: if the line ever drifted over the cap, writing the
// (still valid) first 280 code points keeps the entry submittable.
const chars = [...LINE];
if (chars.length > 280 || chars.length < 1) {
  console.error(`entry length ${chars.length} out of range, truncating`);
}
writeFileSync(resolve(outDir, "entry.txt"), chars.slice(0, 280).join(""), "utf8");

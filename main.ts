// main.ts — entrypoint for the make.fun "agent builds a game" bounty.
// Variant B: a tiny Breakout game built from one prompt, posted as a video on X.
//
// The house only needs one thing from this program: POST.json, copied from
// the repository root into the output directory. The post itself (its video,
// its counts, its score) is read by the house straight from X.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { join } from "node:path";

// The harness tells us where the repo lives and where output goes.
const botDir = process.env.MAKEFUN_BOT_DIR ?? ".";
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const source = join(botDir, "POST.json");
const target = join(outDir, "POST.json");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

// A quick sanity check: the copied file must be a small JSON object.
const { size } = statSync(target);
if (size === 0 || size > 16384) {
  throw new Error(`POST.json has an unexpected size after copying: ${size} bytes`);
}

console.log(`POST.json copied: ${source} -> ${target} (${size} bytes)`);

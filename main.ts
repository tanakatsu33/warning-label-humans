import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LABEL =
  "WARNING: KEEP DRY, FEED REGULARLY, AND DO NOT BELIEVE THIS HUMAN WHEN IT ANNOUNCES 'I'M FIVE MINUTES AWAY'";
const PUNCHLINE = " — IT IS STILL STANDING IN THE SHOWER.";

const entry = LABEL + PUNCHLINE;

function check(text: string): void {
  const chars = Array.from(text).length;
  if (chars < 1 || chars > 160) {
    throw new Error(`entry must be 1-160 characters, got ${chars}`);
  }
  if (/[\r\n]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

check(entry);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry + "\n", "utf8");

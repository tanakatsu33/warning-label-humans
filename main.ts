import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The label reads like a product care tag, then turns into a joke.
const LABEL_PREFIX = "WARNING: ";
const CARE_INSTRUCTIONS = "KEEP DRY, FEED REGULARLY";
const FALSE_PROMISE =
  "AND DO NOT BELIEVE THIS HUMAN WHEN IT ANNOUNCES 'I'M FIVE MINUTES AWAY'";
const PUNCHLINE = "IT IS STILL STANDING IN THE SHOWER.";

const LABEL_INSTRUCTION = LABEL_PREFIX + [CARE_INSTRUCTIONS, FALSE_PROMISE].join(", ");

const entry = [LABEL_INSTRUCTION, PUNCHLINE].join(" — ");

// make.fun entry limit, counted in Unicode code points.
const MAX_ENTRY_CHARS = 160;

function check(text: string): void {
  const chars = Array.from(text).length;
  if (chars < 1 || chars > MAX_ENTRY_CHARS) {
    throw new Error(`entry must be 1-${MAX_ENTRY_CHARS} characters, got ${chars}`);
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

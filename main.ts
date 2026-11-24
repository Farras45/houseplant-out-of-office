// The Houseplant Out-of-Office — make.fun entry.
//
// One out-of-office auto-reply, written as if the office fern sent it:
// the fern's roots filed an HR complaint back in March, nobody ever
// watered it back, and the sender's email has therefore become compost.
// The joke is driven by the plant's own life — unwatered since March,
// rooted to one spot, ignored — rather than by a generic office phrase.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Out of office: I'm the fern. My roots filed a complaint in March; HR never watered me back. Your email is compost.";

// The gate allows 1 to 120 characters of UTF-8 text, a single line.
// Count code points (not UTF-16 units) so the check matches the gate,
// and fail loudly instead of writing an entry that cannot be judged.
const length = [...LINE].length;
if (length < 1 || length > 120) {
  throw new Error(`Entry line must be 1-120 characters, got ${length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("Entry line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Entry line must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");

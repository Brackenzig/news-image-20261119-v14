// news-image v14 — newspaper front page for Thursday 19 November 2026.
// The image is the v9 front page (43 verified stories, hard-news leads,
// 7-region strip, narrative illustrations, per-story sources) and is saved
// as entry.png beside this file. This program copies it to the grader's
// output directory. Node 22, standard library only.
//
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = join(here, 'entry.png');
const dst = join(outDir, 'entry.png');
// Confirm the source is a real PNG before copying it.
const sig = readFileSync(src).subarray(0, 8);
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!sig.equals(PNG_SIG)) {
  throw new Error('entry.png is not a PNG file');
}
copyFileSync(src, dst);
// Confirm the copy landed whole: same byte count as the source.
if (statSync(dst).size !== statSync(src).size) {
  throw new Error('entry.png copy size mismatch');
}

import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const base = "/home/runner/work/Decentralized_App/Decentralized_App";

test("includes supported regional locales", async () => {
  const content = await readFile(`${base}/packages/localization/src/index.ts`, "utf8");
  assert.ok(content.includes('"hi"'));
  assert.ok(content.includes('"bn"'));
  assert.ok(content.includes('"ta"'));
});

test("has matrix signal bridge scaffold", async () => {
  const content = await readFile(`${base}/packages/messaging/src/matrixSignal.ts`, "utf8");
  assert.ok(content.includes("class MatrixSignalBridge"));
  assert.ok(content.includes("sendSecureMessage"));
});

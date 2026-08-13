import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const PACKAGE_URL = new URL("../package.json", import.meta.url);

test("the package exposes an importable ESM entry", async () => {
  const packageJson = JSON.parse(await readFile(PACKAGE_URL, "utf8"));
  const moduleUrl = new URL(`../${packageJson.module}`, import.meta.url);
  const hankoElements = await import(moduleUrl);

  assert.equal(typeof hankoElements.register, "function");
});

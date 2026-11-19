// Kontrollib, et saladused ei satu gitti (SPEC: "No credentials or secrets in Git").
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

const tracked = execFileSync("git", ["ls-files"], { encoding: "utf8" })
  .split(/\r?\n/)
  .filter(Boolean);

test("gitis pole ühtegi .env faili peale .env.example", () => {
  const envFiles = tracked.filter((f) => /(^|\/)\.env/.test(f));
  assert.deepEqual(envFiles, [".env.example"]);
});

test(".env.example sisaldab ainult nimesid, mitte väärtusi (ka kommentaarides)", () => {
  const lines = readFileSync(".env.example", "utf8").split(/\r?\n/);
  const vars = lines.filter((l) => l.trim() !== "" && !l.trim().startsWith("#"));

  assert.ok(vars.length > 0, ".env.example ei tohi olla tühi");
  for (const line of lines) {
    // NIMI=väärtus kas muutujana või välja kommenteerituna
    assert.doesNotMatch(line, /^\s*#?\s*[A-Z0-9_]+=\S/, `väärtus peab olema tühi: ${line}`);
  }
  for (const line of vars) {
    assert.match(line, /^[A-Z0-9_]+=$/, `vale rida: ${line}`);
  }
});

test("service_role võtit ei kasutata kuskil koodis", () => {
  const code = tracked.filter((f) => /^(src|\.env\.example)/.test(f) && !f.endsWith(".ico"));
  for (const file of code) {
    assert.doesNotMatch(readFileSync(file, "utf8"), /service_role|SERVICE_ROLE/i, file);
  }
});

test(".gitignore jätab .env failid välja, aga mitte .env.example", () => {
  const lines = readFileSync(".gitignore", "utf8").split(/\r?\n/);
  const ignore = lines.indexOf(".env*");
  const allow = lines.indexOf("!.env.example");
  assert.ok(ignore >= 0, ".env* puudub");
  // erand peab tulema pärast reeglit, muidu see ei kehti
  assert.ok(allow > ignore, "!.env.example peab olema pärast .env* rida");
});

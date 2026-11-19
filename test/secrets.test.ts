// Kontrollib, et saladused ei satu gitti (SPEC: "No credentials or secrets in Git").
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test(".env.example sisaldab ainult nimesid, mitte väärtusi", () => {
  const lines = readFileSync(".env.example", "utf8")
    .split(/\r?\n/)
    .filter((line) => line.trim() !== "" && !line.trim().startsWith("#"));

  assert.ok(lines.length > 0, ".env.example ei tohi olla tühi");
  for (const line of lines) {
    assert.match(line, /^[A-Z0-9_]+=$/, `väärtus peab olema tühi: ${line}`);
  }
});

test("service_role võtit ei kasutata kliendile nähtavas muutujas", () => {
  const text = readFileSync(".env.example", "utf8");
  assert.doesNotMatch(text, /NEXT_PUBLIC_[A-Z_]*SERVICE_ROLE/);
});

test(".gitignore jätab .env failid välja, aga mitte .env.example", () => {
  const lines = readFileSync(".gitignore", "utf8").split(/\r?\n/);
  assert.ok(lines.includes(".env*"));
  assert.ok(lines.includes("!.env.example"));
});

import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const root = process.cwd();
const postsDirectory = join(root, "content", "posts");

function frontmatter(filePath) {
  const source = readFileSync(filePath, "utf8");
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);

  assert.ok(match, `${filePath} must contain frontmatter`);

  return Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf(":");
        assert.notEqual(separator, -1, `Invalid frontmatter line: ${line}`);
        return [
          line.slice(0, separator).trim(),
          line.slice(separator + 1).trim().replace(/^"|"$/g, ""),
        ];
      })
  );
}

test("published posts contain required metadata", () => {
  for (const fileName of readdirSync(postsDirectory).filter((name) => name.endsWith(".md"))) {
    const metadata = frontmatter(join(postsDirectory, fileName));

    if (metadata.draft === "true") {
      continue;
    }

    assert.ok(metadata.title, `${fileName} needs a title`);
    assert.ok(metadata.category, `${fileName} needs a category`);
    assert.match(metadata.date, /^\d{4}-\d{2}-\d{2}$/, `${fileName} needs an ISO date`);
  }
});

test("every Chinese post has an English counterpart", () => {
  const names = new Set(readdirSync(postsDirectory));

  for (const fileName of names) {
    if (fileName.endsWith("-cn.md")) {
      assert.ok(
        names.has(fileName.replace(/-cn\.md$/, ".md")),
        `${fileName} needs an English counterpart`
      );
    }
  }
});

test("translated posts share one publication date", () => {
  const names = new Set(readdirSync(postsDirectory));

  for (const fileName of names) {
    if (!fileName.endsWith("-cn.md")) {
      continue;
    }

    const englishName = fileName.replace(/-cn\.md$/, ".md");
    const chineseMetadata = frontmatter(join(postsDirectory, fileName));
    const englishMetadata = frontmatter(join(postsDirectory, englishName));

    assert.equal(
      chineseMetadata.date,
      englishMetadata.date,
      `${fileName} and ${englishName} must use the same publication date`
    );
  }
});

test("project updates are bilingual and the article page exposes the language switch", () => {
  const names = new Set(readdirSync(postsDirectory));

  for (const fileName of names) {
    if (fileName.endsWith("-cn.md")) {
      continue;
    }

    const metadata = frontmatter(join(postsDirectory, fileName));
    if (metadata.category === "Project Updates") {
      assert.ok(
        names.has(fileName.replace(/\.md$/, "-cn.md")),
        `${fileName} needs a Chinese counterpart`
      );
    }
  }

  const articlePage = readFileSync(join(root, "app", "blog", "[slug]", "page.tsx"), "utf8");
  assert.match(articlePage, /translatedPost\s*&&/);
  assert.match(articlePage, /isChinese\s*\?\s*"English"\s*:\s*"中文"/);
});

test("the August update covers every active project in both languages", () => {
  const english = readFileSync(join(postsDirectory, "project-update-2026-08.md"), "utf8");
  const chinese = readFileSync(join(postsDirectory, "project-update-2026-08-cn.md"), "utf8");
  const projectNames = [
    "NOVA",
    "K&M AI Administration",
    "Email Assembler",
    "RedNotesHouseRenting",
    "WhatsApp Desktop",
    "RithumAuto",
  ];

  for (const projectName of projectNames) {
    assert.match(english, new RegExp(projectName));
    assert.match(chinese, new RegExp(projectName));
  }
});

test("job API route uses the correctly spelled latest path", () => {
  assert.ok(existsSync(join(root, "app", "api", "jobs", "latest", "route.ts")));
  assert.equal(existsSync(join(root, "app", "api", "jobs", "lastest", "route.ts")), false);
});

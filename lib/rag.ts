import fs from "fs";
import path from "path";

type Chunk = {
  source: string;
  content: string;
};

const DATA_DIR = path.join(process.cwd(), "data", "chenyu");

export function loadKnowledgeBase(): Chunk[] {
  const files = fs.readdirSync(DATA_DIR).filter((file) => file.endsWith(".md"));

  return files.map((file) => {
    const content = fs.readFileSync(path.join(DATA_DIR, file), "utf-8");

    return {
      source: file,
      content,
    };
  });
}

export function retrieveContext(question: string, topK = 3): Chunk[] {
  const docs = loadKnowledgeBase();

  const queryWords = question
    .toLowerCase()
    .split(/\s+/)
    .filter((word) => word.length > 2);

  const scored = docs.map((doc) => {
    const text = doc.content.toLowerCase();

    const score = queryWords.reduce((total, word) => {
      return total + (text.includes(word) ? 1 : 0);
    }, 0);

    return {
      ...doc,
      score,
    };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(({ source, content }) => ({ source, content }));
}
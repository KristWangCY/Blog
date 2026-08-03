import fs from "fs";
import path from "path";

export type Chunk = {
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

  const aliases: Record<string, string> = {
    项目: "projects project",
    技能: "skills programming technologies",
    经历: "experience career work",
    工作: "career work experience",
    职业: "career goals",
    论文: "dissertation research",
    交易: "trading quantitative finance",
    教育: "education academic university",
    关于: "about background",
  };

  const expandedQuestion = Object.entries(aliases).reduce(
    (result, [term, expansion]) =>
      question.includes(term) ? `${result} ${expansion}` : result,
    question.toLowerCase()
  );

  const queryWords = Array.from(
    new Set(expandedQuestion.match(/[a-z0-9]{3,}/g) ?? [])
  );

  const scored = docs.map((doc) => {
    const text = doc.content.toLowerCase();

    const score = queryWords.reduce((total, word) => {
      const matches = text.match(new RegExp(`\\b${word}\\b`, "g"));
      return total + Math.min(matches?.length ?? 0, 5);
    }, 0);

    return {
      ...doc,
      score,
    };
  });

  const ranked = scored.sort((a, b) => b.score - a.score);
  const matches = ranked.filter((doc) => doc.score > 0);

  return (matches.length > 0 ? matches : ranked)
    .slice(0, Math.max(1, topK))
    .map(({ source, content }) => ({ source, content }));
}

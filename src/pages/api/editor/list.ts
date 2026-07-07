import fs from "node:fs";
import path from "node:path";

function getPostsDir() {
  return path.join(process.cwd(), "src", "content", "posts");
}

function walkDir(dir: string, base = ""): string[] {
  const results: string[] = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      results.push(...walkDir(path.join(dir, entry.name), relPath));
    } else if (/\.(md|mdx)$/i.test(entry.name)) {
      results.push(relPath);
    }
  }
  return results;
}

/** 解析 frontmatter，支持多行值和数组 */
function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---/);
  if (!match) return {};
  const lines = match[1].split("\n");
  const result: Record<string, string> = {};
  let currentKey = "";
  let currentVal = "";

  for (const line of lines) {
    // 新的 key: value 行
    const kv = line.match(/^(\w+):\s*(.*)$/);
    if (kv) {
      // 保存上一个 key
      if (currentKey) result[currentKey] = currentVal.trim();
      currentKey = kv[1];
      currentVal = kv[2];
    } else if (currentKey && (line.startsWith("  ") || line.startsWith("\t"))) {
      // 多行续行
      currentVal += " " + line.trim();
    }
  }
  if (currentKey) result[currentKey] = currentVal.trim();

  // 去除引号
  for (const [k, v] of Object.entries(result)) {
    result[k] = v.replace(/^["']|["']$/g, "");
  }
  return result;
}

export async function GET() {
  try {
    const postsDir = getPostsDir();
    const files = walkDir(postsDir);

    const posts = files.map((file) => {
      const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const meta = parseFrontmatter(content);
      return {
        slug: file,
        title: meta.title || file.replace(/\.(md|mdx)$/i, ""),
        published: meta.published || "",
        draft: meta.draft || "false",
        category: meta.category || "",
        tags: meta.tags || "",
        description: meta.description || "",
      };
    });

    posts.sort((a, b) => (b.published > a.published ? 1 : -1));

    return new Response(JSON.stringify({ success: true, posts }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[editor] list error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

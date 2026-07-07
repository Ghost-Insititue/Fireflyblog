import fs from "node:fs";
import path from "node:path";

function getPostsDir() {
  return path.join(process.cwd(), "src", "content", "posts");
}

/** 安全路径校验 */
function safePath(slug: string): string | null {
  const postsDir = getPostsDir();
  const safeSlug = slug.replace(/\.\./g, "").replace(/^\//, "");
  const resolved = path.resolve(postsDir, safeSlug);
  if (!resolved.startsWith(path.resolve(postsDir) + path.sep) && resolved !== path.resolve(postsDir)) {
    return null;
  }
  return resolved;
}

export async function POST(context: any) {
  try {
    const body = await context.request.json();
    const { slug, content } = body;

    if (!slug || content === undefined) {
      return new Response(
        JSON.stringify({ success: false, error: "缺少 slug 或 content" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const filePath = safePath(slug);
    if (!filePath) {
      return new Response(
        JSON.stringify({ success: false, error: "非法路径" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 确保目录存在
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, content, "utf-8");

    return new Response(
      JSON.stringify({ success: true, message: "保存成功", path: slug }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[editor] save error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

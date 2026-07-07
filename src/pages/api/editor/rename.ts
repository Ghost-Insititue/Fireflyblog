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
    const { oldSlug, newSlug } = body;

    if (!oldSlug || !newSlug) {
      return new Response(
        JSON.stringify({ success: false, error: "缺少 oldSlug 或 newSlug" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const oldPath = safePath(oldSlug);
    const newPath = safePath(newSlug);

    if (!oldPath || !newPath) {
      return new Response(
        JSON.stringify({ success: false, error: "非法路径" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!fs.existsSync(oldPath)) {
      return new Response(
        JSON.stringify({ success: false, error: "原文件不存在" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    if (fs.existsSync(newPath)) {
      return new Response(
        JSON.stringify({ success: false, error: "目标文件已存在" }),
        { status: 409, headers: { "Content-Type": "application/json" } }
      );
    }

    // 确保目标目录存在
    const dir = path.dirname(newPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.renameSync(oldPath, newPath);

    return new Response(
      JSON.stringify({ success: true, message: "重命名成功", newSlug }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[editor] rename error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

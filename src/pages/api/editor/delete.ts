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
    const { slug } = body;

    if (!slug) {
      return new Response(
        JSON.stringify({ success: false, error: "缺少 slug" }),
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

    if (!fs.existsSync(filePath)) {
      return new Response(
        JSON.stringify({ success: false, error: "文章不存在" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // 移到回收站（重命名为 .deleted 后缀），而不是直接删除
    const trashPath = filePath + ".deleted";
    fs.renameSync(filePath, trashPath);

    return new Response(
      JSON.stringify({ success: true, message: "已移到回收站" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[editor] delete error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

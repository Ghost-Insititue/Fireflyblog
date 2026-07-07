import fs from "node:fs";
import path from "node:path";

function getPostsDir() {
  return path.join(process.cwd(), "src", "content", "posts");
}

function safePath(slug: string): string | null {
  const postsDir = getPostsDir();
  const safeSlug = slug.replace(/\.\./g, "").replace(/^\//, "");
  const resolved = path.resolve(postsDir, safeSlug);
  if (!resolved.startsWith(path.resolve(postsDir) + path.sep) && resolved !== path.resolve(postsDir)) {
    return null;
  }
  return resolved;
}

export async function GET(context: any) {
  try {
    const url = new URL(context.request.url);
    const slug = url.searchParams.get("slug") || context.url?.searchParams?.get("slug");

    if (!slug) {
      return new Response(
        JSON.stringify({ success: false, error: "缺少 slug 参数" }),
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

    const content = fs.readFileSync(filePath, "utf-8");
    const stat = fs.statSync(filePath);

    return new Response(
      JSON.stringify({ success: true, content, slug, modified: stat.mtime.toISOString() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[editor] load error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

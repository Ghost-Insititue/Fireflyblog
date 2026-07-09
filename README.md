<div align="center">

# 🍀 小埋小站

> 基于 [Firefly](https://github.com/CuteLeaf/Firefly) 主题深度定制的个人博客

[![Astro](https://img.shields.io/badge/Astro-7.0.2-orange)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-brightgreen)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D9-blue)](https://pnpm.io/)
[![License](https://img.shields.io/github/license/Ghost-Insititue/Fireflyblog)](LICENSE)

**[🖥️ 在线预览](https://xiaomaisos.me)** · **[📝 原版文档](https://docs-firefly.cuteleaf.cn/)** · **[🍀 原版仓库](https://github.com/CuteLeaf/Firefly)**

</div>

---

## 📖 项目简介

本仓库基于 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly) Astro 博客主题进行深度自定义修改，保留了原版清新美观的设计风格，同时新增了多项功能和优化。

> **致谢：** 本项目核心主题由 [CuteLeaf](https://github.com/CuteLeaf) 开发，遵循 MIT 协议。如需使用原版主题，请前往 [Firefly 仓库](https://github.com/CuteLeaf/Firefly)。

---

## ✨ 相比原版的改动

### 🎵 音乐播放器增强
- **自动识别模式（auto）**：将歌曲、封面、歌词放入同一文件夹，按 `序号 - 歌曲名 - 歌手` 命名，运行脚本自动生成播放列表
- **歌词间距优化**：调整歌词显示区域的内边距，减少顶部空白
- 支持 mp3、flac、wav、ogg、m4a、aac、wma 等多种音频格式

### 📐 页面布局调整
- **页面缩放优化**：调整根字体大小，使初始页面呈现约 85% 缩放效果，更紧凑美观
- **侧边栏智能显示**：站点统计、站点信息仅在主页显示，其他页面自动隐藏

### ⚡ 性能优化
- **Cloudflare CDN 加速**：接入 Cloudflare CDN，提升全球访问速度
- 修复编辑页加载缓慢问题

### 🔧 其他修改
- 自定义横幅标题和副标题
- 导航栏、侧边栏等细节调整
- 多处样式和交互优化

---

## 🚀 快速开始

### 环境要求

- Node.js ≥ 22
- pnpm ≥ 9

### 安装运行

```bash
# 1. 克隆仓库
git clone https://github.com/Ghost-Insititue/Fireflyblog.git
cd Fireflyblog

# 2. 安装依赖
pnpm install

# 3. 启动开发服务器
pnpm dev
```

访问 http://localhost:4321 查看效果。

### 构建部署

```bash
pnpm run build
```

构建产物在 `dist/` 目录，可部署至 Vercel、Netlify、Cloudflare Pages、GitHub Pages 等平台。

---

## 🎵 音乐播放器使用

本项目新增了 `auto` 模式，无需手动编辑代码即可管理音乐：

### 1. 放置文件

```
public/assets/music/
├── 01 - 知我 (宁姚) - 谭渊.mp3
├── 01 - 知我 (宁姚) - 谭渊.jpg     ← 同名自动匹配封面
├── 01 - 知我 (宁姚) - 谭渊.lrc     ← 同名自动匹配歌词
├── 02 - 晴天 - 周杰伦.mp3
├── 02 - 晴天 - 周杰伦.webp
└── 02 - 晴天 - 周杰伦.lrc
```

### 2. 生成播放列表

```bash
node scripts/generate-music-playlist.mjs
```

### 3. 配置

编辑 `src/config/musicConfig.ts`：

```typescript
mode: "auto",  // 使用自动模式
```

支持三种模式：`meting`（在线API）、`local`（手动配置）、`auto`（自动扫描）

---

## ⚙️ 主要配置文件

```
src/config/
├── siteConfig.ts           # 站点基础配置（标题、描述、主题色等）
├── backgroundWallpaper.ts  # 背景壁纸和横幅文字配置
├── musicConfig.ts          # 音乐播放器配置
├── sidebarConfig.ts        # 侧边栏组件配置
├── commentConfig.ts        # 评论系统配置
├── profileConfig.ts        # 个人资料配置
└── ...                     # 更多配置项
```

详细配置说明请参考 [Firefly 使用文档](https://docs-firefly.cuteleaf.cn/)。

---

## 📁 目录结构

```
├── scripts/                    # 构建脚本
│   └── generate-music-playlist.mjs  # 音乐播放列表自动生成
├── src/
│   ├── components/             # 组件
│   │   ├── features/           # 功能组件（音乐播放器、特效等）
│   │   ├── widget/             # 侧边栏小组件
│   │   └── layout/             # 布局组件（侧边栏、导航栏等）
│   ├── config/                 # 配置文件
│   ├── layouts/                # 页面布局
│   ├── pages/                  # 页面路由
│   ├── styles/                 # 样式文件
│   ├── types/                  # TypeScript 类型定义
│   └── utils/                  # 工具函数
├── public/                     # 静态资源
│   └── assets/music/           # 音乐文件目录
├── astro.config.mjs            # Astro 配置
└── package.json
```

---

## 🛠️ 技术栈

- **框架：** [Astro](https://astro.build/) 7.0
- **UI：** [Svelte](https://svelte.dev/) + [Tailwind CSS](https://tailwindcss.com/)
- **语言：** [TypeScript](https://www.typescriptlang.org/)
- **搜索：** [Pagefind](https://pagefind.app/)
- **代码高亮：** [Expressive Code](https://expressive-code.com/)
- **数学公式：** [KaTeX](https://katex.org/)
- **部署：** GitHub Pages / Vercel / Cloudflare Pages

---

## 📝 致谢

- **主题作者：** [CuteLeaf](https://github.com/CuteLeaf) — [Firefly 主题](https://github.com/CuteLeaf/Firefly)
- **原始模板：** [Fuwari](https://github.com/saicaca/fuwari)

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

核心主题代码版权归 [CuteLeaf](https://github.com/CuteLeaf) 所有。

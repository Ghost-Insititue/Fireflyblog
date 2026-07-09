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

本仓库基于 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly) Astro 博客主题进行深度自定义修改。保留了原版清新美观的设计风格，同时新增了多项功能和优化。

> **致谢：** 核心主题由 [CuteLeaf](https://github.com/CuteLeaf) 开发，遵循 MIT 协议。如需使用原版主题，请前往 [Firefly 仓库](https://github.com/CuteLeaf/Firefly)。

---

## ✨ 相比原版的改动

### 🎵 音乐播放器增强

| 功能 | 说明 |
|------|------|
| **自动识别模式（auto）** | 新增 `auto` 模式，歌曲/封面/歌词放同一文件夹，按 `序号 - 歌曲名 - 歌手` 命名，运行脚本自动生成播放列表 |
| **自动生成脚本** | 新增 `scripts/generate-music-playlist.mjs`，扫描文件夹自动生成 `playlist.json` |
| **歌词间距优化** | 调整歌词区域 `py-24` → `py-[30px]`，减少顶部空白 |
| **多格式支持** | 支持 mp3、flac、wav、ogg、m4a、aac、wma |

**使用方式：**
```bash
# 1. 放文件到 public/assets/music/
# 01 - 知我 (宁姚) - 谭渊.mp3
# 01 - 知我 (宁姚) - 谭渊.jpg    ← 同名自动匹配封面
# 01 - 知我 (宁姚) - 谭渊.lrc    ← 同名自动匹配歌词

# 2. 生成播放列表
node scripts/generate-music-playlist.mjs

# 3. 配置 src/config/musicConfig.ts
# mode: "auto"
```

**涉及文件：**
- `scripts/generate-music-playlist.mjs`（新增）
- `src/config/musicConfig.ts`（修改：新增 auto 模式配置）
- `src/types/musicConfig.ts`（修改：新增 auto 类型定义）
- `src/components/features/MusicManager.astro`（修改：新增 `fetchAutoPlaylist()`）
- `src/components/features/MusicPlayer.astro`（修改：歌词间距调整）

---

### 📐 页面布局优化

| 功能 | 说明 |
|------|------|
| **页面缩放** | 调整根字体大小 `text-[14px] md:text-[16px]` → `text-[12px] md:text-[14px]`，使初始页面呈现约 85% 缩放效果，更紧凑美观 |
| **侧边栏智能显示** | 站点统计（stats）、站点信息（siteInfo）仅在主页显示，其他页面自动隐藏 |

**侧边栏主页专属显示实现原理：**
- 服务端（SideBar.astro）：渲染时判断是否主页，非主页添加 `hidden` class
- 客户端（Layout.astro）：swup 切页时动态更新组件显隐，确保切换页面后状态正确

**涉及文件：**
- `src/layouts/Layout.astro`（修改：根字体大小 + 客户端 widget 显隐逻辑）
- `src/components/layout/SideBar.astro`（修改：服务端主页判断 + `widget-home-page-only` class）
- `src/config/sidebarConfig.ts`（修改：stats/siteInfo 添加 `homePageOnly: true`）
- `src/types/sidebarConfig.ts`（修改：新增 `homePageOnly` 类型定义）

---

### 🎨 横幅文字自定义

自定义主页横幅标题和打字机效果副标题：

```typescript
// src/config/backgroundWallpaper.ts
homeText: {
    title: "Lovely firefly!",
    subtitle: [
        "In Reddened Chrysalis, I Once Rest",
        "From Shattered Sky, I Free Fall",
        // ...
    ],
},
```

**涉及文件：**
- `src/config/backgroundWallpaper.ts`（修改：自定义横幅文字）

---

### ⚡ 性能优化

| 功能 | 说明 |
|------|------|
| **Cloudflare CDN** | 接入 Cloudflare CDN 加速，提升全球访问速度 |
| **加载优化** | 修复编辑页加载缓慢问题 |

---

### ✏️ 在线 Markdown 编辑器（新增）

全新开发的在线 Markdown 编辑器，无需本地工具，直接在浏览器中撰写、编辑、发布博客文章。

#### 文章元数据

| 字段 | 说明 |
|------|------|
| 标题 | 文章标题（必填），支持置顶和评论开关 |
| 描述 | 一句话描述文章内容（可选） |
| 分类 | 文章分类，如「技术笔记」 |
| 标签 | 文章标签，逗号分隔，如「JavaScript, Astro」 |
| 封面图 | 支持输入 URL 或上传本地图片 |
| 文章密码 | 加密文章功能，支持设置密码提示 |

#### 编辑器功能

| 功能 | 说明 |
|------|------|
| **Markdown 工具栏** | 加粗、斜体、删除线、标题(H1-H4)、有序/无序/任务列表、引用、行内代码、代码块、链接、图片、表格、分割线、撤销/重做 |
| **实时预览** | 左右分栏模式，左侧编辑右侧实时渲染预览 |
| **视图切换** | 编辑模式、分栏模式、预览模式、全屏预览 四种视图 |
| **同步滚动** | 编辑区和预览区滚动同步 |
| **字数统计** | 底部实时显示字数、字符数、行数 |

#### 发布与保存

| 功能 | 说明 |
|------|------|
| **保存草稿** | Ctrl+Shift+S 快捷键保存，支持自定义草稿名称，LocalStorage 存储 |
| **草稿管理** | 草稿箱弹窗，支持查看、加载、删除、批量删除、全选 |
| **下载 .md** | 将文章导出为 Markdown 文件下载到本地 |
| **发布到 GitHub** | 通过 GitHub API 直接发布文章到仓库的 `src/content/posts/` 目录，支持配置 Token、仓库、分支 |
| **复制内容** | 一键复制 Markdown 源码 |

#### 图片处理

| 功能 | 说明 |
|------|------|
| **图片插入** | 支持输入图片 URL 或上传本地图片 |
| **图片上传** | 本地图片自动转为 Base64 或上传到图床 |
| **图片预览** | 上传前可预览图片 |

#### API 接口

编辑器后端 API 用于草稿管理：

| 接口 | 说明 |
|------|------|
| `api/editor/list` | 获取草稿列表 |
| `api/editor/load` | 加载草稿内容 |
| `api/editor/save` | 保存草稿 |
| `api/editor/rename` | 重命名草稿 |
| `api/editor/delete` | 删除草稿 |

**涉及文件：**
- `src/pages/editor.astro`（新增：编辑器主页面，约1300行）
- `src/pages/api/editor/list.ts`（新增：草稿列表接口）
- `src/pages/api/editor/load.ts`（新增：加载草稿接口）
- `src/pages/api/editor/save.ts`（新增：保存草稿接口）
- `src/pages/api/editor/rename.ts`（新增：重命名草稿接口）
- `src/pages/api/editor/delete.ts`（新增：删除草稿接口）

---

### 🔧 其他修改

- 站点标题、描述、关键词等基础配置自定义
- 导航栏标题自定义
- 评论系统配置
- 统计分析配置
- 多处样式和交互细节调整

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

## ⚙️ 主要配置文件

```
src/config/
├── siteConfig.ts              # 站点基础配置（标题、描述、主题色等）
├── backgroundWallpaper.ts     # 背景壁纸和横幅文字配置
├── musicConfig.ts             # 音乐播放器配置（meting/local/auto 三种模式）
├── sidebarConfig.ts           # 侧边栏组件配置（含主页专属显示）
├── commentConfig.ts           # 评论系统配置
├── profileConfig.ts           # 个人资料配置
├── analyticsConfig.ts         # 统计分析配置
├── navbarConfig.ts            # 导航栏配置
├── announcementConfig.ts      # 公告配置
├── coverImageConfig.ts        # 封面图配置
├── effectsConfig.ts           # 动画特效配置
├── expressiveCodeConfig.ts    # 代码高亮配置
├── fontConfig.ts              # 字体配置
├── footerConfig.ts            # 页脚配置
├── friendsConfig.ts           # 友链配置
├── galleryConfig.ts           # 相册配置
├── licenseConfig.ts           # 许可证配置
├── sponsorConfig.ts           # 赞助配置
└── plantumlConfig.ts          # PlantUML 配置
```

详细配置说明请参考 [Firefly 使用文档](https://docs-firefly.cuteleaf.cn/)。

---

## 📁 目录结构

```
├── scripts/                         # 构建脚本
│   ├── generate-icons.js            # 图标生成（原版）
│   ├── generate-lqips.ts            # LQIP 生成（原版）
│   └── generate-music-playlist.mjs  # 音乐播放列表自动生成（新增）
├── src/
│   ├── components/
│   │   ├── features/                # 功能组件
│   │   │   ├── MusicManager.astro   # 音乐管理器（修改：支持 auto 模式）
│   │   │   ├── MusicPlayer.astro    # 音乐播放器（修改：歌词间距）
│   │   │   └── ...
│   │   ├── widget/                  # 侧边栏小组件
│   │   │   ├── SiteStats.astro      # 站点统计
│   │   │   ├── SiteInfo.astro       # 站点信息
│   │   │   ├── Music.astro          # 音乐 widget
│   │   │   └── ...
│   │   └── layout/                  # 布局组件
│   │       ├── SideBar.astro        # 侧边栏（修改：主页专属显示）
│   │       └── ...
│   ├── config/                      # 配置文件
│   ├── layouts/
│   │   ├── Layout.astro             # 主布局（修改：字体缩放 + widget 显隐）
│   │   └── MainGridLayout.astro     # 网格布局
│   ├── pages/                       # 页面路由
│   │   ├── editor.astro             # 在线编辑器（新增）
│   │   ├── api/editor/              # 编辑器 API（新增）
│   │   └── ...
│   ├── styles/                      # 样式文件
│   ├── types/                       # TypeScript 类型定义
│   │   ├── sidebarConfig.ts         # （修改：新增 homePageOnly）
│   │   ├── musicConfig.ts           # （修改：新增 auto 模式）
│   │   └── ...
│   └── utils/                       # 工具函数
├── public/
│   └── assets/music/                # 音乐文件目录
├── astro.config.mjs                 # Astro 配置
├── package.json
└── README-copy.md                   # 原版 README 备份
```

---

## 🎵 音乐播放器配置

支持三种模式：

| 模式 | 数据来源 | 适用场景 |
|------|----------|----------|
| `meting` | 在线 API（网易云/QQ音乐等） | 使用在线歌单 |
| `local` | musicConfig.ts 中手动配置 | 少量固定歌曲 |
| `auto` | playlist.json（自动生成） | **新增**，放文件即用 |

### auto 模式使用

```bash
# 文件命名规则：序号 - 歌曲名 - 歌手.扩展名
public/assets/music/
├── 01 - 知我 (宁姚) - 谭渊.mp3
├── 01 - 知我 (宁姚) - 谭渊.jpg
├── 01 - 知我 (宁姚) - 谭渊.lrc
└── playlist.json  # 自动生成

# 生成播放列表
node scripts/generate-music-playlist.mjs
```

---

## 🛠️ 技术栈

- **框架：** [Astro](https://astro.build/) 7.0
- **UI：** [Svelte](https://svelte.dev/) + [Tailwind CSS](https://tailwindcss.com/)
- **语言：** [TypeScript](https://www.typescriptlang.org/)
- **搜索：** [Pagefind](https://pagefind.app/)
- **代码高亮：** [Expressive Code](https://expressive-code.com/)
- **数学公式：** [KaTeX](https://katex.org/)
- **CDN：** [Cloudflare](https://www.cloudflare.com/)
- **部署：** GitHub Pages / Vercel / Cloudflare Pages

---

## 📝 致谢

- **主题作者：** [CuteLeaf](https://github.com/CuteLeaf) — [Firefly 主题](https://github.com/CuteLeaf/Firefly)
- **原始模板：** [Fuwari](https://github.com/saicaca/fuwari)

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

核心主题代码版权归 [CuteLeaf](https://github.com/CuteLeaf) 所有。

# GTA VI Guide - 侠盗猎车手6攻略网站

一个参考游民星空游戏专区风格设计的GTA6游戏攻略网站，支持通过GitHub API发布内容。

## 功能特性

- 🎮 **游戏资讯** - 最新GTA6动态与新闻
- 📖 **游戏攻略** - 全面详细的游戏攻略指南
- 🗺️ **流程指南** - 完整主线任务攻略
- 📊 **游戏资料** - 载具、武器、成就等数据库
- ⬇️ **下载中心** - 存档、工具等下载资源
- 🔧 **管理后台** - 本地运行的内容管理系统
- 🚀 **GitHub发布** - 通过GitHub API发布网站内容

## 技术栈

- **框架**: Next.js 16 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS 4
- **GitHub集成**: Octokit (GitHub REST API)
- **内容管理**: Gray Matter + Markdown

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

### 管理后台

访问 [http://localhost:3000/admin](http://localhost:3000/admin) 进入后台管理。

### GitHub 发布配置

1. 在 GitHub 创建 Personal Access Token (需要 `repo` 权限)
2. 复制 `.env.local.example` 为 `.env.local`
3. 填写以下配置：

```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_OWNER=your-github-username
GITHUB_REPO=gta6-guide
GITHUB_BRANCH=main
```

4. 重启开发服务器
5. 在管理后台的"发布管理"页面发布内容

### 构建生产版本

```bash
npm run build
```

静态文件将输出到 `out/` 目录。

## 部署到 GitHub Pages

### 方式一：GitHub Actions 自动部署

1. 将代码推送到 GitHub 仓库
2. 在仓库 Settings → Pages 中选择 "GitHub Actions" 作为 Source
3. 推送代码到 main 分支，GitHub Actions 会自动构建和部署

### 方式二：通过 API 手动发布

1. 配置 `.env.local` 中的 GitHub 环境变量
2. 在管理后台创建/编辑文章
3. 使用"发布管理"功能将内容推送到 GitHub

## 项目结构

```
gta6-guide/
├── src/
│   ├── app/
│   │   ├── page.tsx              # 首页
│   │   ├── layout.tsx            # 全局布局
│   │   ├── news/                 # 资讯页面
│   │   ├── guides/               # 攻略页面
│   │   ├── walkthrough/          # 流程页面
│   │   ├── downloads/            # 下载页面
│   │   ├── database/             # 资料页面
│   │   ├── article/[slug]/       # 文章详情页
│   │   ├── admin/                # 管理后台
│   │   │   ├── page.tsx          # 后台主页
│   │   │   ├── ArticleEditor.tsx # 文章编辑器
│   │   │   └── PublishPanel.tsx  # 发布面板
│   │   └── api/                  # API 路由
│   │       ├── articles/         # 文章API
│   │       ├── publish/          # 发布API
│   │       └── github/           # GitHub API
│   ├── components/               # 公共组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── ArticleList.tsx
│   │   └── GuideSectionGrid.tsx
│   └── lib/                      # 工具库
│       ├── types.ts              # 类型定义
│       ├── data.ts               # 数据
│       ├── github.ts             # GitHub API封装
│       └── content-manager.ts    # 内容管理
├── .github/workflows/
│   └── deploy.yml                # GitHub Actions 部署
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

## 国际化

网站当前为中文版本，后续可切换为英文服务海外用户。主要修改点：

- 导航标签：`navItems` 中的 `labelEn` 字段
- 文章内容：直接替换为英文版本
- UI文案：全局搜索中文文案替换

## License

MIT

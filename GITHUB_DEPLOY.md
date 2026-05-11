# GTA6 攻略网站 - GitHub Pages 部署指南

## 📋 前置准备

1. **安装 Git**：从 https://git-scm.com/ 下载并安装
2. **创建 GitHub 账号**：访问 https://github.com/ 注册
3. **配置 Git**（首次使用）：
   ```bash
   git config --global user.name "你的用户名"
   git config --global user.email "你的邮箱"
   ```

---

## 🚀 部署步骤

### 第一步：更新配置文件

编辑 `src/config/site.json`，替换为你的 GitHub 用户名：

```json
{
  "title": "GTA6 攻略",
  "description": "GTA6 游戏攻略网站",
  "author": "你的用户名",
  "url": "https://你的用户名.github.io/gta6-guide/",
  "repoUrl": "https://github.com/你的用户名/gta6-guide",
  "i18n": {
    "defaultLang": "zh",
    "supportedLangs": ["zh", "en"]
  }
}
```

### 第二步：初始化 Git 仓库

在项目目录打开命令行（PowerShell 或 CMD）：

```bash
cd d:\Work\game\gta6-guide

# 初始化 Git 仓库
git init

# 添加所有文件到暂存区
git add .

# 创建首次提交
git commit -m "feat: init GTA6 guide website"
```

### 第三步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. **Repository name** 输入：`gta6-guide`
3. **Description** 输入：`GTA6 游戏攻略网站`
4. 选择 **Public**
5. ⚠️ **不要**勾选 "Initialize this repository with a README"
6. 点击 **Create repository**

### 第四步：推送代码到 GitHub

```bash
# 添加远程仓库（替换 你的用户名 为实际用户名）
git remote add origin https://github.com/你的用户名/gta6-guide.git

# 推送代码到 main 分支
git branch -M main
git push -u origin main
```

### 第五步：启用 GitHub Pages

1. 在 GitHub 仓库页面，点击 **Settings** 选项卡
2. 左侧菜单找到 **Pages**（可能在 "Code and automation" 下）
3. **Build and deployment** → **Source** 选择：**GitHub Actions**
4. 等待约 1-2 分钟，GitHub Actions 会自动构建并部署

### 第六步：访问网站

部署完成后，访问：

```
https://你的用户名.github.io/gta6-guide/
```

---

## 🔧 故障排除

### 问题 1：构建失败

检查 GitHub Actions 日志：
1. 进入仓库 **Actions** 选项卡
2. 点击失败的 workflow run
3. 查看错误日志

**常见错误**：
- `npm run build` 失败 → 本地先运行 `npm run build` 确保能成功
- 依赖安装失败 → 检查 package.json 格式

### 问题 2：页面 404

- 确认 `vite.config.ts` 中的 `base` 路径是 `/gta6-guide/`
- 确认 GitHub Pages source 设置为 "GitHub Actions"

### 问题 3：样式或路由不正常

- 确认 `base` 路径正确
- 检查浏览器控制台是否有 404 资源加载错误

---

## 🔄 后续更新

每次修改代码后，推送到 GitHub 会自动触发部署：

```bash
git add .
git commit -m "feat: 添加新攻略"
git push
```

---

## 📞 需要帮助？

如果遇到问题，告诉我：
1. 错误信息（截图或文字）
2. GitHub Actions 日志
3. 浏览器控制台错误

我会帮你解决！

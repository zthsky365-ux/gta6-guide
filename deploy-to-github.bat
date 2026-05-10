@echo off
chcp 65001 >nul
echo ================================
echo GTA6 攻略网站 - GitHub 部署脚本
echo ================================
echo.

REM 检查 Git 是否安装
git --version >nul 2>&1
if errorlevel 1 (
    echo [错误] Git 未安装，请先安装 Git
    echo 下载地址: https://git-scm.com/download/win
    pause
    exit /b 1
)

echo [1/5] 配置 Git 用户信息...
set /p git_name="请输入你的 GitHub 用户名: "
set /p git_email="请输入你的 GitHub 邮箱: "

git config --global user.name "%git_name%"
git config --global user.email "%git_email%"

echo.
echo [2/5] 初始化 Git 仓库...
git init
git add .
git commit -m "feat: init GTA6 guide website"

echo.
echo [3/5] 更新配置文件...
set /p github_user="请输入你的 GitHub 用户名（用于配置 URL）: "

REM 更新 site.json
powershell -Command "(Get-Content src/config/site.json) -replace 'yourusername', '%github_user%' | Set-Content src/config/site.json"

git add src/config/site.json
git commit -m "chore: update site config with GitHub username"

echo.
echo [4/5] 推送到 GitHub...
echo.
echo 请先在 GitHub 创建仓库:
echo   1. 访问 https://github.com/new
echo   2. Repository name 输入: gta6-guide
echo   3. 选择 Public
echo   4. 不要勾选 "Initialize this repository with a README"
echo   5. 点击 Create repository
echo.
pause

git remote add origin https://github.com/%github_user%/gta6-guide.git
git branch -M main
git push -u origin main

echo.
echo [5/5] 部署完成！
echo.
echo ================================
echo 下一步：启用 GitHub Pages
echo ================================
echo 1. 访问: https://github.com/%github_user%/gta6-guide/settings/pages
echo 2. Source 选择: GitHub Actions
echo 3. 等待 1-2 分钟自动部署
echo 4. 访问: https://%github_user%.github.io/gta6-guide/
echo ================================
echo.
pause

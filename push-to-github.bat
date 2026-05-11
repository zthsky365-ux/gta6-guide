@echo off
chcp 65001 >nul
echo ================================
echo GTA6 攻略网站 - 推送到 GitHub
echo ================================
echo.

REM 检查是否在正确的目录
if not exist ".git" (
    echo [错误] 未找到 .git 目录，请确保在项目目录中运行此脚本
    pause
    exit /b 1
)

echo [1/3] 检查远程仓库配置...
git remote -v | find "origin" >nul
if errorlevel 1 (
    echo 添加远程仓库...
    git remote add origin https://github.com/zthsky365-ux/gta6-guide.git
)

echo.
echo [2/3] 设置默认分支为 main...
git branch -M main

echo.
echo [3/3] 推送到 GitHub...
echo 注意：当提示输入密码时，请粘贴你的 GitHub Token（不是密码）
echo.
git push -u origin main

echo.
echo ================================
echo 如果推送成功，下一步：
echo 1. 访问: https://github.com/zthsky365-ux/gta6-guide/settings/pages
echo 2. Source 选择: GitHub Actions
echo 3. 等待 1-2 分钟
echo 4. 访问: https://zthsky365-ux.github.io/gta6-guide/
echo ================================
echo.
pause

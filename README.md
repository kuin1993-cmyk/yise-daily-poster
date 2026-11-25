# 衣色能量 · 每日发圈自动出图系统

配合微信小程序「衣色穿搭小助手」，通过 **GitHub Actions 每天早上 06:30（北京时间）自动生成大众通用版穿搭海报 + 双机差异化文案**，发布到免费的 GitHub Pages，再由 **iPhone 14 / 17 桌面一键快捷指令** 5 秒发朋友圈（0 封号风险、0 服务器费用）。

---

## 一、本地运行测试

零 `npm` 依赖，直接运行即可在 `dist/` 生成今日海报和文案：

```bash
node scripts/generate.mjs
# 也可以指定任意日期测试：
node scripts/generate.mjs 2026-11-25
```

生成产物：
- `dist/today.jpg`：1500px 高清日报海报（约 400KB，手机秒下）
- `dist/today.json`：给 iPhone 快捷指令读取的数据（含 `image_url`、`caption_14`、`caption_17`）
- `dist/index.html`：手机网页备用预览页

---

## 二、5 分钟部署到 GitHub（免费永久托管）

1. 在 GitHub 新建一个 **Public（公开）** 仓库（例如 `yise-daily-poster`）。
2. 把本目录推送到该仓库的 `main` 分支：
   ```bash
   git init
   git add .
   git commit -m "init daily poster"
   git branch -M main
   git remote add origin https://github.com/<你的用户名>/yise-daily-poster.git
   git push -u origin main
   ```
3. 打开仓库的 **Settings → Pages**：
   - **Source** 选择 **GitHub Actions**。
4. 打开仓库的 **Actions → Generate Daily Poster → Run workflow** 手动触发一次。
5. 等约 30 秒绿勾后，你就拥有了永久免费的静态链接：
   - 数据接口：`https://<你的用户名>.github.io/yise-daily-poster/today.json`
   - 今日海报：`https://<你的用户名>.github.io/yise-daily-poster/today.jpg`
   - 备用网页：`https://<你的用户名>.github.io/yise-daily-poster/`

以后每天早上 **06:30（北京时间）** GitHub Actions 会自动更新当日海报和文案。

---

## 三、iPhone 14 & 17 桌面一键按钮配置（快捷指令）

在苹果自带的 **「快捷指令」App** 中新建一个指令，命名为 **「发今日衣色」**，依次添加以下 **6 个动作**：

1. **获取 URL 内容**
   - URL 填：`https://<你的用户名>.github.io/yise-daily-poster/today.json`
2. **获取词典值**
   - 键（Key）：
     - iPhone 14 填 `caption_14`
     - iPhone 17 填 `caption_17`
   - 词典：选择上一步的「URL 的内容」
3. **拷贝至剪贴板**
   - 拷贝内容：选择上一步的「词典值」
4. **获取词典值**
   - 键（Key）：填 `image_url`
   - 词典：选择第 1 步的「URL 的内容」
5. **获取 URL 内容**
   - URL：选择上一步的「词典值」
6. **存储到相簿**
   - 存储对象：选择上一步的「URL 的内容」
   - 目标相簿：选「最近项目」（或新建一个「每日衣色」相簿）
7. **打开 App**（或 **打开 URL**：`weixin://`）
   - App 选 **微信**

### 添加到桌面
- 点快捷指令右上角分享图标 → **「添加到主屏幕」**，换一个好看的图标。
- 以后女朋友每天想发圈时，**点一下桌面图标**：
  - 自动下载今日高清海报进相册
  - 自动复制专属朋友圈文案
  - 自动跳进微信
- 她只需要点 **发现 → 朋友圈 → 选第一张图 → 粘贴 → 发表**，全程 5 秒搞定！

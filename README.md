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

以后每天凌晨 **00:30（北京时间）** GitHub Actions 会自动更新当日海报和文案，确保早上起床发朋友圈前早就准备好了。

---

## 三、配置方案 A（AI 每日现写文案，可选）

系统默认已内置 **方案 B（30 套三风格动态文案库）**，开箱即用；如果你想开启 **方案 A（AI 每天早上自动现写不重样文案，AI 不可用时自动降级到方案 B）**，只需在 GitHub 仓库里加一个 Secret：

1. 打开仓库 **Settings → Secrets and variables → Actions → New repository secret**
2. 添加 **`AI_API_KEY`**（支持 DeepSeek / 智谱 / 硅基流动 / 通义千问 / Google Gemini）
3. 如使用非 DeepSeek 服务，再可选添加 **`AI_BASE_URL`** 和 **`AI_MODEL`**：
   - **DeepSeek（默认）**：只需填 `AI_API_KEY`（默认 `https://api.deepseek.com/v1` + `deepseek-chat`）
   - **Google Gemini**：`AI_BASE_URL` 填 `https://generativelanguage.googleapis.com`，`AI_MODEL` 填 `gemini-2.5-flash`
   - **智谱 GLM**：`AI_BASE_URL` 填 `https://open.bigmodel.cn/api/paas/v4`，`AI_MODEL` 填 `glm-4-flash`

---

## 四、iPhone 11 / 14 / 17 桌面一键按钮配置（快捷指令）

在苹果自带的 **「快捷指令」App** 中新建一个指令，命名为 **「发今日衣色」**，依次添加以下 **6 个动作**：

1. **获取 URL 内容**
   - URL 填：`https://kuin1993-cmyk.github.io/yise-daily-poster/today.json`
2. **获取字典值**
   - 键（Key）：
     - **iPhone 11（温柔闺蜜分享风）** 填：`caption_11`
     - **iPhone 14（极简高级风）** 填：`caption_14`
     - **iPhone 17（水晶手串软广风）** 填：`caption_17`
   - 字典：自动连接第 1 步，不用改
3. **拷贝至剪贴板**
   - 自动连接第 2 步，不用改
4. **获取 URL 内容**
   - URL 填：`https://kuin1993-cmyk.github.io/yise-daily-poster/today.jpg`
5. **存储到“照片”相簿**
   - 自动连接第 4 步，默认存到「最近项目」
6. **打开 App**
   - App 选 **微信**

### 添加到桌面
- 点快捷指令右上角分享图标 → **「添加到主屏幕」**，换一个好看的图标。
- 以后女朋友每天想发圈时，**点一下桌面图标**：
  - 自动下载今日高清海报进相册
  - 自动复制专属朋友圈文案
  - 自动跳进微信
- 她只需要点 **发现 → 朋友圈 → 选第一张图 → 粘贴 → 发表**，全程 5 秒搞定！

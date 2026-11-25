import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildDailyPayload } from '../src/daily-engine.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT, 'assets');
const DIST_DIR = path.join(ROOT, 'dist');

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  ].filter(Boolean);
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  throw new Error('未找到 Chrome/Edge/Chromium，请安装浏览器或设置 CHROME_PATH 环境变量');
}

function extractKaitiDataUri() {
  const jsPath = path.join(ASSETS_DIR, 'kaiti-font.js');
  if (!fs.existsSync(jsPath)) return '';
  const content = fs.readFileSync(jsPath, 'utf8');
  const m = content.match(/kaitiBase64\s*=\s*'([^']+)'/);
  return m ? `data:font/ttf;base64,${m[1]}` : '';
}

function fileToDataUri(relPath) {
  if (!relPath) return '';
  const cleanRel = relPath.replace(/^\/+/, '');
  const full = path.join(ASSETS_DIR, cleanRel);
  if (!fs.existsSync(full)) return '';
  const ext = path.extname(full).toLowerCase();
  const mime = ext === '.png' ? 'image/png' : (ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'application/octet-stream');
  return `data:${mime};base64,${fs.readFileSync(full).toString('base64')}`;
}

function buildPreviewHtml(meta) {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>衣色能量 · 今日发圈海报 (${esc(meta.date)})</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif; background: #f6f1e9; color: #4a3a2a; margin: 0; padding: 16px; }
    .wrap { max-width: 480px; margin: 0 auto; }
    h1 { font-size: 20px; text-align: center; margin: 8px 0 4px; }
    .sub { text-align: center; font-size: 13px; color: #8a7a6a; margin-bottom: 16px; }
    .card { background: #fff; border-radius: 16px; padding: 14px; margin-bottom: 14px; box-shadow: 0 2px 10px rgba(90,74,58,0.08); }
    .label { font-size: 13px; font-weight: 600; color: #8a7048; margin-bottom: 8px; }
    pre { white-space: pre-wrap; font-family: inherit; font-size: 14px; line-height: 1.6; margin: 0 0 10px; background: #faf7f2; padding: 10px; border-radius: 10px; }
    button { width: 100%; padding: 10px; border: none; border-radius: 10px; background: #8a7048; color: #fff; font-size: 15px; font-weight: 600; cursor: pointer; }
    button:active { opacity: 0.85; }
    img { width: 100%; border-radius: 14px; display: block; box-shadow: 0 4px 16px rgba(90,74,58,0.12); }
    .tip { text-align: center; font-size: 12px; color: #9a8a7a; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>衣色能量 · 今日发圈素材</h1>
    <div class="sub">${esc(meta.date)} ${esc(meta.weekDay)} · 农历${esc(meta.lunar)} · 五行属${esc(meta.wuxing)} · 文案来源：${meta.caption_source === 'ai' ? 'AI 现写' : '精选文案库'}</div>
    <div class="card">
      <div class="label">📱 iPhone 11 文案（温柔闺蜜分享风）</div>
      <pre id="c11">${esc(meta.caption_11)}</pre>
      <button onclick="copyText('c11', this)">一键复制 11 文案</button>
    </div>
    <div class="card">
      <div class="label">📱 iPhone 14 文案（极简高级风）</div>
      <pre id="c14">${esc(meta.caption_14)}</pre>
      <button onclick="copyText('c14', this)">一键复制 14 文案</button>
    </div>
    <div class="card">
      <div class="label">📱 iPhone 17 文案（水晶手串软广风）</div>
      <pre id="c17">${esc(meta.caption_17)}</pre>
      <button onclick="copyText('c17', this)">一键复制 17 文案</button>
    </div>
    <div class="card">
      <div class="label">🖼️ 今日海报（长按图片可直接保存相册）</div>
      <img src="./today.jpg?v=${esc(meta.date)}" alt="今日衣色穿搭海报">
      <div class="tip">更新时间：${esc(meta.updated_at)}</div>
    </div>
  </div>
  <script>
    function copyText(id, btn) {
      const text = document.getElementById(id).innerText;
      navigator.clipboard.writeText(text).then(() => {
        const old = btn.innerText;
        btn.innerText = '✅ 已复制，去微信粘贴吧';
        setTimeout(() => btn.innerText = old, 2000);
      });
    }
  </script>
</body>
</html>`;
}

function runBrowser(browserPath, args) {
  return new Promise((resolve, reject) => {
    execFile(browserPath, args, { maxBuffer: 50 * 1024 * 1024, timeout: 25000 }, (err, stdout, stderr) => {
      if (err) {
        reject(new Error(`浏览器执行失败: ${err.message}\n${stderr.slice(0, 600)}`));
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}

async function main() {
  const customDate = process.argv[2];
  const payload = await buildDailyPayload(customDate);
  console.log(`[daily-poster] 生成日期: ${payload.dateStr} (${payload.lunarDate}, 五行:${payload.wuxing}, 宜忌来源:${payload.yiJiSource})`);

  fs.mkdirSync(DIST_DIR, { recursive: true });
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'yise-poster-'));
  const tmpProfile = path.join(tmpDir, 'profile');
  const tmpHtmlPath = path.join(tmpDir, 'render.html');

  try {
    const assetsMap = {
      qr: fileToDataUri('/images/qr-code.png'),
      dress: fileToDataUri('/images/clothes-icon-female.png'),
      bg: fileToDataUri(payload.shareBg),
      crystals: (payload.crystals || []).map(c => fileToDataUri(c.img))
    };

    const template = fs.readFileSync(path.join(ROOT, 'src', 'render-template.html'), 'utf8');
    const html = template
      .replace('__KAITI_DATA_URI__', extractKaitiDataUri())
      .replace('__POSTER_DATA_JSON__', JSON.stringify(payload))
      .replace('__ASSETS_JSON__', JSON.stringify(assetsMap));

    fs.writeFileSync(tmpHtmlPath, html, 'utf8');
    const browserPath = findBrowser();

    const { stdout } = await runBrowser(browserPath, [
      '--headless=new',
      '--dump-dom',
      '--virtual-time-budget=6000',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--disable-extensions',
      '--no-first-run',
      '--no-default-browser-check',
      `--user-data-dir=${tmpProfile}`,
      pathToFileURL(tmpHtmlPath).href
    ]);

    const errMatch = stdout.match(/<div id="err">([\s\S]*?)<\/div>/);
    if (errMatch && errMatch[1].trim()) {
      throw new Error('页面渲染脚本报错: ' + errMatch[1].trim());
    }

    const resMatch = stdout.match(/<div id="result">(data:image\/(?:jpeg|png);base64,[^<]+)<\/div>/);
    if (!resMatch) {
      throw new Error('未在渲染结果中找到图片数据');
    }

    const imgBuf = Buffer.from(resMatch[1].replace(/^data:image\/(?:jpeg|png);base64,/, ''), 'base64');
    const imgPath = path.join(DIST_DIR, 'today.jpg');
    fs.writeFileSync(imgPath, imgBuf);

    const baseUrl = (process.env.SITE_BASE_URL || '').replace(/\/$/, '');
    const meta = {
      date: payload.dateStr,
      weekDay: payload.weekDay,
      lunar: payload.lunarDate,
      wuxing: payload.wuxing,
      best_colors: payload.bestColors,
      caption_11: payload.caption_11,
      caption_14: payload.caption_14,
      caption_17: payload.caption_17,
      caption_source: payload.caption_source,
      image_url: baseUrl ? `${baseUrl}/today.jpg?v=${payload.dateStr}` : `./today.jpg?v=${payload.dateStr}`,
      updated_at: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai', hour12: false })
    };

    fs.writeFileSync(path.join(DIST_DIR, 'today.json'), JSON.stringify(meta, null, 2), 'utf8');
    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), buildPreviewHtml(meta), 'utf8');
    console.log(`[daily-poster] 生成成功: ${imgPath} (${(imgBuf.length / 1024).toFixed(1)} KB)`);
  } finally {
    try { fs.rmSync(tmpDir, { recursive: true, force: true }); } catch {}
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

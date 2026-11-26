// 每日朋友圈文案引擎：方案 A（AI 每日现写）+ 方案 B（三风格动态文案库无缝兜底）
// 风格分配：
//   caption_11 -> 温柔闺蜜分享风（iPhone 11）
//   caption_14 -> 极简高级风（iPhone 14）
//   caption_17 -> 带一点水晶手串软广风（iPhone 17）

function hash32(n) {
  let h = n | 0;
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

function pick(arr, seed) {
  return arr[hash32(seed) % arr.length];
}

const WEEKDAY_MOODS = {
  '周一': {
    bestie: '周一开工别焦虑，先挑个显气色的颜色给自己加点缓冲～',
    minimal: '新周开启，以顺色定调。',
    crystal: '周一想快速进入状态，衣色配对了、手腕再搭一串顺手的晶石，一整天都稳。'
  },
  '周二': {
    bestie: '周二节奏慢慢顺起来啦，今天穿对色系会觉得做事轻松很多✨',
    minimal: '周二，稳步推进。',
    crystal: '周二事情多，挑个温和又提气的配色，搭配手串把杂念收一收。'
  },
  '周三': {
    bestie: '一周过半啦！周三换个好心情颜色，给自己续一波能量～',
    minimal: '周中留白，张弛有度。',
    crystal: '周中容易犯懒，换上今日首推色，再叠戴一串同频水晶，精气神立马回来。'
  },
  '周四': {
    bestie: '坚持一下就周五啦，今天穿得温柔清爽一点，好运气都偏爱松弛的人🌿',
    minimal: '周四，蓄势而行。',
    crystal: '周四适合收尾谈事，顺着今日五行选穿搭和手串，沟通都会顺畅不少。'
  },
  '周五': {
    bestie: '终于周五啦！下班约饭逛街，照着今天的好看色系穿准没错💫',
    minimal: '周五，松弛赴约。',
    crystal: '周五晚上有约会的姐妹，衣服选今日主色，手腕来点细闪水晶超上镜！'
  },
  '周六': {
    bestie: '周末早安呀～不管出门晒太阳还是宅家充电，穿对颜色心情都会亮一点☀️',
    minimal: '周六，自在随心。',
    crystal: '周末出门拍照，衣色和水晶手串呼应起来，细节氛围感直接拉满。'
  },
  '周日': {
    bestie: '周日慢慢过，把状态养足了再迎接新一周，今天的配色很耐看哦🌸',
    minimal: '周日，归零复元。',
    crystal: '周日给衣橱和自己都做个减法，戴上温润的天然水晶，舒舒服服蓄电。'
  }
};

// ===== 方案 B：高质量三风格动态兜底文案库（30+ 组合）=====
export function buildFallbackCaptions(d) {
  const seed = d.year * 10000 + d.month * 100 + d.day;
  const dateShort = `${d.month}月${d.day}日`;
  const cr1 = d.crystals[0] || { name: '白水晶', effect: '净化能量' };
  const cr2 = d.crystals[1] || { name: '黄水晶', effect: '平和温润' };
  const crPair = `${cr1.name}、${cr2.name}`;
  const mainColor = String(d.bestColors).split('、')[0];
  const yiSample = (d.yiItems || []).slice(0, 3).join('、') || '出行、纳财';
  const mood = WEEKDAY_MOODS[d.weekDay] || WEEKDAY_MOODS['周三'];

  // 1) iPhone 11：温柔闺蜜分享风（简约版 10 套，30~50字）
  const bestiePool = [
    `早安🌷 ${dateShort} 属「${d.wuxing}」\n今天穿【${d.bestColors}】很提气色，配一串${cr1.name}刚刚好✨`,
    `${dateShort} ${d.weekDay}｜别纠结穿啥啦\n首选【${d.bestColors}】，搭点${cr1.name}，祝你今天顺顺当当💛`,
    `☀️ ${dateShort} 穿搭小纸条\n今日首推【${d.bestColors}】，避开【${d.worstColors}】，完整黄历看图👇`,
    `早呀✨ ${dateShort} 农历${d.lunarDate}\n今天穿【${d.bestColors}】最衬状态，记得带点${cr1.name}在身边～`,
    `🌿 ${dateShort} ${d.weekDay}\n属「${d.wuxing}」的一天，穿【${d.bestColors}】，愿你今天「${d.bestTag}」～`,
    `${dateShort} 配色灵感💡\n${mainColor}系闭眼穿，手腕搭一串${cr2.name}就很精致✨`,
    `每天换个对的颜色🌸\n今日推荐【${d.bestColors}】· 宜${yiSample}，图里有明日预告哦～`,
    `姐妹们早～${dateShort} 色卡更新🎨\n主推【${d.bestColors}】，搭配【${cr1.name}】，今天也要开心呀！`,
    `✨ ${dateShort} ${d.weekDay}\n今天穿【${d.bestColors}】最能接住好状态，色卡存图备用👇`,
    `早安☕ ${dateShort} 农历${d.lunarDate}\n今日答案：【${d.bestColors}】× ${cr1.name}，舒服又耐看～`
  ];

  // 2) iPhone 14：极简高级风（简约版 10 套，20~40字）
  const minimalPool = [
    `${dateShort}｜属${d.wuxing} · ${d.bestTag}\n宜着：${d.bestColors}\n宜配：${cr1.name}`,
    `Daily Color · ${d.year}.${d.month}.${d.day}\n主色：${d.bestColors}\n晶石：${cr1.name}`,
    `${dateShort} ${d.weekDay}。\n首选${d.bestColors}，慎选${d.worstColors}。\n腕间一抹${cr1.name}，恰到好处。`,
    `农历${d.lunarDate} · ${d.riGanZhi}日\n今日色系：${d.bestColors}\n顺色而行，自在生风。`,
    `${dateShort} · 顺势穿衣\n主推｜${d.bestColors}\n搭配｜${crPair}`,
    `今日属${d.wuxing}。\n${mainColor}系打底，${cr1.name}点睛。`,
    `${d.year}.${d.month}.${d.day}｜${d.weekDay}\n宜：${yiSample}\n色：${d.bestColors}`,
    `「${d.bestTag}」—— ${dateShort}\n推荐色：${d.bestColors} · ${cr1.name}`,
    `早安｜${dateShort}\n今日衣色：${d.bestColors}\n少即是多，穿对胜过穿繁。`,
    `今日五行：${d.wuxing}\n色彩：${d.bestColors}\n配饰：${cr1.name} / ${cr2.name}`
  ];

  // 3) iPhone 17：水晶手串轻种草风（简约版 10 套，35~55字）
  const crystalPool = [
    `✨ ${dateShort} 衣色 × 水晶\n今天穿【${d.bestColors}】，腕间搭一串${cr1.name}（${cr1.effect}），显白又有质感💎 想配同款随时问我～`,
    `💎 ${dateShort} ${d.weekDay} 每日一搭\n衣服选【${d.bestColors}】，配【${cr1.name}】或【${cr2.name}】刚好同频，看图查今日色卡👇`,
    `${dateShort} 属「${d.wuxing}」✨\n首选【${d.bestColors}】+ 一串温润${cr1.name}，把「${d.bestTag}」气场拉满，同款手串可私信挑～`,
    `☀️ ${dateShort} 每日配色\n宜穿：${d.bestColors}｜宜戴：${crPair} 💎\n扫码可查每日黄历和色卡哦～`,
    `🌿 ${dateShort} 穿搭灵感\n${mainColor}系衣服配一条透亮${cr1.name}，上班约会都百搭✨ 喜欢的姐妹随时滴滴～`,
    `🎨 ${dateShort} 农历${d.lunarDate}\n今日主色【${d.bestColors}】，搭【${cr1.name}】超耐看💎 完整色卡和宜忌在图里👇`,
    `今天穿什么最顺？\n${dateShort} 首选【${d.bestColors}】× ${cr1.name}（${cr1.effect}）✨ 选专属手串可私聊呀～`,
    `💫 ${dateShort} ${d.weekDay}\n穿【${d.bestColors}】+ 戴【${cr2.name}】，细节感直接拉满，想按色系配手串随时找我～`,
    `🌸 ${dateShort} 属「${d.wuxing}」\n主推【${d.bestColors}】｜好搭档【${crPair}】💎 长按图中小程序码看更多配色👇`,
    `✨ ${dateShort} · ${mainColor}系 × ${cr1.name}\n衣色配对了，再加一点天然晶石光泽，一整天都顺心💎`
  ];

  return {
    caption_11: pick(bestiePool, seed + 101),
    caption_14: pick(minimalPool, seed + 307),
    caption_17: pick(crystalPool, seed + 709),
    caption_source: 'fallback'
  };
}

// ===== 方案 A：AI 每日现写（支持 OpenAI 兼容接口 & Gemini 原生接口）=====
function buildPrompt(d) {
  const crText = (d.crystals || []).map(c => `${c.name}（${c.effect}）`).join('、');
  const yiText = (d.yiItems || []).slice(0, 6).join('、');
  const jiText = (d.jiItems || []).slice(0, 4).join('、');
  return `你是一位经营天然水晶手串店的女生主理人，每天早上会配一张「衣色能量·穿搭日报」海报发微信朋友圈（同时打理 3 个微信号，不能发重复文案）。

今天的数据如下：
- 公历：${d.year}年${d.month}月${d.day}日 ${d.weekDay}
- 农历：${d.lunarDate}（${d.nianGanZhi}年 ${d.riGanZhi}日）
- 今日五行：${d.wuxing}
- 首推穿搭色（非常好）：${d.bestColors}（状态词：${d.bestTag}）
- 次推穿搭色（很好）：${d.goodColors}
- 不推荐/避开色：${d.worstColors}
- 宜佩戴水晶：${crText}
- 老黄历宜：${yiText || '常规出行'}；忌：${jiText || '无特别忌讳'}

请严格按以下要求生成 3 条**简约、克制、像真人随手发的短文案**（切忌写长段落、切忌堆砌信息），严格返回合法 JSON（不要 markdown 代码块，不要多余解释）：
{
  "caption_11": "温柔闺蜜分享风：严格控制在30~50字，2~3句短句，轻松早安感，点出今日首推色系和1个水晶或小提醒，1~2个emoji",
  "caption_14": "极简高级风：严格控制在20~38字，极简留白短句，只点出日期、今日主色和水晶名，0~1个emoji",
  "caption_17": "水晶手串轻种草风：严格控制在35~55字，2~3句短句，一句话讲今日衣色配${crText}的质感，结尾轻轻带半句选款/私信/看图提示，不生硬，1~2个emoji"
}

注意：
1. 字数一定要精炼简约，每条都不要超过上限，适合手机刷朋友圈一眼看完；
2. 严禁出现"算命、改命、转运、招财、辟邪、化煞"等生硬迷信词，用"顺心、提气色、好状态、舒缓、气场"等优雅日常表达；
3. 3 条文案的开头、句式和用词必须明显不同；
4. 只输出纯 JSON 对象。`;
}

function parseJsonObject(rawText) {
  const cleaned = String(rawText || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('AI 返回内容中未找到 JSON 对象');
  const parsed = JSON.parse(cleaned.slice(start, end + 1));
  if (!parsed.caption_11 || !parsed.caption_14 || !parsed.caption_17) {
    throw new Error('AI 返回的 JSON 缺少 caption_11/14/17 字段');
  }
  return {
    caption_11: String(parsed.caption_11).trim(),
    caption_14: String(parsed.caption_14).trim(),
    caption_17: String(parsed.caption_17).trim(),
    caption_source: 'ai'
  };
}

async function callGemini(apiKey, model, prompt) {
  const m = model || 'gemini-2.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(m)}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.9, responseMimeType: 'application/json' }
      }),
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`Gemini HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    return parseJsonObject(text);
  } finally {
    clearTimeout(timer);
  }
}

async function callOpenAICompatible(apiKey, baseUrl, model, prompt) {
  const endpoint = `${baseUrl.replace(/\/$/, '')}/chat/completions`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        temperature: 0.9,
        messages: [
          { role: 'system', content: '你是擅长写高质感微信朋友圈文案的生活美学主理人，严格只输出合法 JSON。' },
          { role: 'user', content: prompt }
        ]
      }),
      signal: controller.signal
    });
    if (!res.ok) throw new Error(`AI API HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
    const data = await res.json();
    const text = data?.choices?.[0]?.message?.content;
    return parseJsonObject(text);
  } finally {
    clearTimeout(timer);
  }
}

export async function generateCaptions(d) {
  const apiKey = (process.env.AI_API_KEY || '').trim();
  const baseUrl = (process.env.AI_BASE_URL || 'https://api.deepseek.com/v1').trim();
  const model = (process.env.AI_MODEL || '').trim();

  if (!apiKey) {
    console.log('[caption] 未配置 AI_API_KEY，自动使用方案 B 三风格兜底文案库');
    return buildFallbackCaptions(d);
  }

  const prompt = buildPrompt(d);
  try {
    const isGemini = baseUrl.includes('generativelanguage.googleapis.com') || model.startsWith('gemini');
    const result = isGemini
      ? await callGemini(apiKey, model || 'gemini-2.5-flash', prompt)
      : await callOpenAICompatible(apiKey, baseUrl, model || 'deepseek-chat', prompt);
    console.log(`[caption] 方案 A AI 现写文案成功 (${isGemini ? 'Gemini' : baseUrl})`);
    return result;
  } catch (err) {
    console.warn(`[caption] 方案 A AI 调用失败，自动降级为方案 B 兜底文案库: ${err.message}`);
    return buildFallbackCaptions(d);
  }
}

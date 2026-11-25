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

  // 1) iPhone 11：温柔闺蜜分享风（10 套）
  const bestiePool = [
    `早安姐妹们🌷 ${dateShort} ${d.weekDay}｜农历${d.lunarDate}\n${mood.bestie}\n今天五行属「${d.wuxing}」，衣柜里翻翻【${d.bestColors}】，穿在身上特别衬状态～\n顺手戴一串${cr1.name}，温柔又提气色✨ 完整色卡和黄历都存图里啦！`,
    `姐妹们今天别纠结穿啥啦～\n${dateShort} 属「${d.wuxing}」：首推【${d.bestColors}】，次选【${d.goodColors}】🎨\n今日关键词是「${d.bestTag}」，配一点${cr1.name}或${cr2.name}的小细节刚刚好，愿我们今天都顺顺利利💛`,
    `☀️ ${dateShort} ${d.weekDay} 穿搭小纸条来啦\n农历${d.lunarDate} · 今日宜${yiSample}\n今天特别适合穿【${d.bestColors}】，整个人看起来干净又有精神！\n避开【${d.worstColors}】就好，记得存图对照衣柜呀👇`,
    `早上打开衣柜不知道穿什么的时候，看看每日衣色真的省心好多✨\n${dateShort} 属「${d.wuxing}」，优先挑【${d.bestColors}】准没错\n再搭一条${cr1.name}（${cr1.effect}），${mood.bestie}`,
    `🌿 ${dateShort} 早安打卡｜农历${d.lunarDate}\n今日好穿色系：【${d.bestColors}】\n舒服自在的备选：【${d.goodColors}】\n今天状态偏向「${d.bestTag}」，穿对颜色真的会悄悄变开心，图里有完整黄历和明日预告哦～`,
    `分享一下今天的穿搭灵感💡 ${dateShort} ${d.weekDay}\n今天五行属「${d.wuxing}」，${mainColor}系闭眼冲！\n不想太单调的话，手腕配一串${cr2.name}，精致度一下就出来啦✨`,
    `每天换一个对的颜色，日子也会跟着亮起来🌸\n${dateShort} 首推【${d.bestColors}】，尽量少碰【${d.worstColors}】\n今日宜${yiSample}，适合带点${cr1.name}在身边，祝你今天一切顺心呀～`,
    `姐妹们早～今天的每日色卡更新好啦🎨\n${dateShort} 农历${d.lunarDate}｜属「${d.wuxing}」\n主推【${d.bestColors}】· 搭配水晶【${crPair}】\n${mood.bestie}`,
    `✨ ${dateShort} 穿衣小心机\n今天五行属「${d.wuxing}」，穿【${d.bestColors}】最能接住好状态（${d.bestTag}）\n出门前瞄一眼图里的方位和宜忌，心里踏实又从容～`,
    `早安呀☕ ${dateShort} ${d.weekDay}\n今天衣色答案给你们备好了：【${d.bestColors}】\n${cr1.name}和${cr2.name}跟今天气场超合拍，点开大图还能提前看明天的推荐色哦👇`
  ];

  // 2) iPhone 14：极简高级风（10 套）
  const minimalPool = [
    `${dateShort}｜${d.weekDay} · 农历${d.lunarDate}\n五行属${d.wuxing} · ${d.bestTag}\n宜着：${d.bestColors}\n宜配：${cr1.name} / ${cr2.name}\n顺色而行，自在生风。`,
    `🎨 Daily Color · ${d.year}.${d.month}.${d.day}\n今日主色｜${d.bestColors}\n次选色系｜${d.goodColors}\n今日宜${yiSample}。${mood.minimal}`,
    `${dateShort} 穿搭色卡。\n属「${d.wuxing}」之日，首选${d.bestColors}，慎选${d.worstColors}。\n腕间一抹${cr1.name}，${cr1.effect}，恰到好处。`,
    `农历${d.lunarDate} · ${d.nianGanZhi}年 ${d.riGanZhi}日\n今日色系：${d.bestColors}\n状态关键词：${d.bestTag}\n颜色对了，气场自然舒展。`,
    `${dateShort} · 顺势穿衣\n首推｜${d.bestColors}\n晶石｜${crPair}\n${mood.minimal} 完整宜忌见图。`,
    `今日属${d.wuxing}。\n${mainColor}系打底，${cr1.name}点睛。\n不争不抢，自有分寸感。`,
    `${d.year}.${d.month}.${d.day}｜${d.weekDay}\n今日宜：${yiSample}\n今日色：${d.bestColors}\n把情绪交给色彩，把步调留给自己。`,
    `「${d.bestTag}」—— ${dateShort} 穿衣注脚。\n推荐色：${d.bestColors}\n搭配物：${cr1.name}（${cr1.effect}）`,
    `早安｜${dateShort} 农历${d.lunarDate}\n今日衣色：${d.bestColors}\n次选：${d.goodColors}\n少即是多，穿对胜过穿繁。`,
    `今日五行：${d.wuxing}\n色彩建议：${d.bestColors}\n灵感配饰：${crPair}\n${mood.minimal}`
  ];

  // 3) iPhone 17：带一点水晶手串软广风（10 套）
  const crystalPool = [
    `✨ ${dateShort} ${d.weekDay}｜衣色 × 水晶每日搭配\n今天五行属「${d.wuxing}」，衣服优先选【${d.bestColors}】\n手腕叠戴一串「${cr1.name}」或「${cr2.name}」，${cr1.effect}又显手白💎\n${mood.crystal} 想看自己适合什么色系手串可以戳图里小程序测一下👇`,
    `💎 今日穿衣 + 手串作业来抄啦！\n${dateShort} 农历${d.lunarDate}｜宜${yiSample}\n穿搭首推：【${d.bestColors}】\n本命搭档：【${cr1.name}】（${cr1.effect}）+【${cr2.name}】（${cr2.effect}）\n衣色和天然水晶一起搭，日常精致感真的不一样，同款晶石随时欢迎来挑～`,
    `很多姐妹问每天手串怎么配衣服，照着五行色来最省心✨\n今天 ${dateShort} 属「${d.wuxing}」：衣服穿【${d.bestColors}】，戴【${cr1.name}】刚好呼应今天的「${d.bestTag}」气场！\n图里有今日完整黄历和色卡，需要配专属手串的姐妹随时滴滴我～`,
    `☀️ ${dateShort} 每日能量配色已更新\n今日主推穿：${d.bestColors}\n今日宜佩戴：${cr1.name} / ${cr2.name} 💎\n衣服决定第一眼印象，手腕那一抹天然晶石的光泽才是隐藏加分项✨ 扫码可查每日色卡哦～`,
    `🌿 ${dateShort} ${d.weekDay}｜今日属「${d.wuxing}」\n${mood.crystal}\n今日首推穿【${d.bestColors}】，配【${cr1.name}】特别有质感，上班约会都百搭！\n不知道挑哪条手串配今天衣服的，直接看图里的推荐就行👇`,
    `🎨 ${dateShort} 穿搭 & 水晶灵感\n农历${d.lunarDate} · 今日宜${yiSample}\n穿衣主色：${d.bestColors}（${d.bestTag}）\n推荐佩戴：${crPair}，温润耐看又好搭衣服💎\n喜欢天然水晶手串的姐妹，保存色卡每天跟着搭准没错～`,
    `今天穿什么颜色最顺？答案在图里啦👇\n${dateShort} 属「${d.wuxing}」，首选【${d.bestColors}】，尽量避开【${d.worstColors}】\n顺手配一串${cr1.name}（${cr1.effect}），细节满满还能稳住一天好状态✨ 店里新到的几条${cr1.name}质感超绝！`,
    `💫 ${dateShort} ${d.weekDay} 早安配色\n穿【${d.bestColors}】+ 戴【${cr2.name}】，把今天的「${d.bestTag}」氛围直接拉满！\n每天五秒看一眼衣色和黄历，穿得顺心、戴得开心，想定制五行专属手串的姐妹随时私我哦～`,
    `🌸 穿搭和水晶一样，顺应每天的节律会更舒服\n${dateShort} 属「${d.wuxing}」｜首推【${d.bestColors}】\n今日好搭档：${cr1.name}（${cr1.effect}）、${cr2.name}（${cr2.effect}）💎\n长按图中小程序码，还能看更多每日穿搭和水晶图鉴👇`,
    `✨ ${dateShort} 每日一搭｜${mainColor}系 × ${cr1.name}\n农历${d.lunarDate}，今日宜${yiSample}\n衣服选【${d.bestColors}】，手腕搭一条透亮温润的${cr1.name}，温柔又有高级感💎\n需要按自己生辰/日常色系配手串的宝子，随时找我聊聊呀～`
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

请严格按以下要求生成 3 条**自然、像真人随手写的**微信朋友圈文案，严格返回合法 JSON（不要 markdown 代码块，不要多余解释）：
{
  "caption_11": "温柔闺蜜分享风：80~120字，像和好朋友早安闲聊，结合今天是${d.weekDay}和首推色系，自然带一点今天的水晶或黄历，适度用2~3个emoji，结尾轻轻引导看图",
  "caption_14": "极简高级风：45~80字，克制留白、短句排版、有杂志质感，点出日期、今日主色和水晶名称，不超过1个emoji",
  "caption_17": "带一点水晶手串软广风：90~130字，从今天穿什么颜色切入，自然过渡到搭配${crText}的质感/细节，顺带一句很轻的私信/选款/扫码提示（不要像硬广微商，要高级自然），适度用2~3个emoji"
}

注意：
1. 严禁出现"算命、改命、转运、招财、辟邪、化煞"等生硬迷信词，用"顺心、提气色、好状态、舒缓、能量、气场"等优雅日常表达；
2. 3 条文案的开头、句式和用词必须明显不同，避免像模板复制；
3. 只输出纯 JSON 对象。`;
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

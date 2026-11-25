// 衣色能量 · 大众通用版每日计算引擎（1:1 复用小程序 pages/index/index.js 逻辑）

const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const WUXING_GAN = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
};
const WEEK_DAYS = ['日', '一', '二', '三', '四', '五', '六'];

export const SHARE_BGS = [
  '/images/share-bg-0.jpg',
  '/images/share-bg-1.jpg',
  '/images/share-bg-2.jpg',
  '/images/share-bg-3.jpg',
  '/images/share-bg-4.jpg',
  '/images/share-bg-5.jpg',
  '/images/share-bg-6.jpg'
];

export const WUXING_DATA = {
  '金': {
    best: ['白色、银色、金色', '乳白色、米色、香槟'],
    good: ['黄色、浅咖色、卡其', '杏色、奶茶色、驼色'],
    ok: ['绿色、青色、薄荷', '湖蓝、水绿、抹茶'],
    bad: ['红色、橙色、粉色', '玫红、珊瑚、橘红'],
    worst: ['黑色、蓝色、深紫', '藏蓝、墨色、靛青'],
    tags: ['清朗通透', '从容舒展', '平稳顺利', '节奏放缓', '留白舒缓'],
    fortune: { caishen: '正西', fushen: '西南', xishen: '西北', guiren: '正南' },
    yi: ['嫁娶', '祭祀', '祈福', '开光', '出行', '纳采', '纳财'],
    ji: ['动土', '上梁', '入宅', '安葬', '破土', '伐木', '开仓']
  },
  '木': {
    best: ['绿色、青色、翠绿', '草绿、薄荷、松石绿'],
    good: ['黑色、蓝色、灰色', '藏青、烟灰、墨蓝'],
    ok: ['白色、银色、米色', '奶茶、象牙、浅杏'],
    bad: ['黄色、咖啡色、棕色', '焦糖、土黄、赭石'],
    worst: ['红色、紫色、金色', '玫红、品红、亮金'],
    tags: ['蓬勃向上', '舒展生长', '随缘自在', '收敛蓄势', '沉淀积累'],
    fortune: { caishen: '正东', fushen: '东南', xishen: '东北', guiren: '正北' },
    yi: ['出行', '开市', '交易', '立券', '挂匾', '纳财', '栽种'],
    ji: ['嫁娶', '入宅', '移徙', '安床', '造桥', '掘井', '开仓']
  },
  '水': {
    best: ['黑色、蓝色、灰色', '藏蓝、银灰、靛青'],
    good: ['白色、银色、金色', '米白、珍珠、香槟'],
    ok: ['绿色、青色、湖水蓝', '薄荷、孔雀绿、水蓝'],
    bad: ['黄色、棕色、咖啡', '卡其、焦糖、奶茶'],
    worst: ['红色、橙色、粉色', '火红、珊瑚、玫红'],
    tags: ['清澈明朗', '顺势而为', '波澜不惊', '流动不定', '起伏多变'],
    fortune: { caishen: '正南', fushen: '正西', xishen: '正东', guiren: '东南' },
    yi: ['祭祀', '沐浴', '扫舍', '纳财', '捕捉', '结网', '取鱼'],
    ji: ['嫁娶', '开市', '入宅', '出行', '安床', '动土', '破土']
  },
  '火': {
    best: ['红色、紫色、粉色', '玫红、珊瑚、酒红'],
    good: ['绿色、青色、翠绿', '草绿、橄榄、森林绿'],
    ok: ['黄色、橙色、金色', '杏色、蜜桃、暖金'],
    bad: ['黑色、蓝色、灰色', '深灰、藏蓝、墨色'],
    worst: ['白色、银色、米色', '纯白、冰银、浅灰'],
    tags: ['热情明朗', '神采飞扬', '温暖常在', '心浮气躁', '缓缓蓄力'],
    fortune: { caishen: '正北', fushen: '正东', xishen: '正南', guiren: '西南' },
    yi: ['嫁娶', '开光', '祈福', '求嗣', '出行', '解除', '伐木'],
    ji: ['入宅', '安葬', '动土', '开仓', '纳财', '置产', '渡水']
  },
  '土': {
    best: ['黄色、咖色、茶色', '焦糖、驼色、卡其'],
    good: ['红色、橙色、粉色', '珊瑚、蜜桃、暖橘'],
    ok: ['白色、金色、米色', '香槟、奶白、浅杏'],
    bad: ['绿色、青色、翠绿', '薄荷、孔雀、松石'],
    worst: ['黑色、蓝色、灰色', '藏蓝、墨色、深灰'],
    tags: ['厚德载物', '稳步前行', '踏实安稳', '缓行宜稳', '起伏多变'],
    fortune: { caishen: '正北', fushen: '东北', xishen: '东南', guiren: '东北' },
    yi: ['祈福', '祭祀', '纳财', '开市', '交易', '立券', '开光'],
    ji: ['出行', '嫁娶', '入宅', '安床', '动土', '破土', '安葬']
  }
};

export const CRYSTAL_DATA = {
  '金': [
    { emoji: '💎', img: '/images/crystal/clear-quartz.png', name: '白水晶', effect: '净化能量' },
    { emoji: '✨', img: '/images/crystal/citrine.png', name: '黄水晶', effect: '平和温润' },
    { emoji: '🌟', img: '/images/crystal/moonstone.png', name: '月光石', effect: '柔和安定' }
  ],
  '木': [
    { emoji: '🌿', img: '/images/crystal/green-phantom.png', name: '绿幽灵', effect: '成长向上' },
    { emoji: '🍀', img: '/images/crystal/prehnite.png', name: '葡萄石', effect: '舒缓压力' },
    { emoji: '💚', img: '/images/crystal/malachite.png', name: '孔雀石', effect: '自然气息' }
  ],
  '水': [
    { emoji: '🔮', img: '/images/crystal/aquamarine.png', name: '海蓝宝', effect: '沟通顺畅' },
    { emoji: '💎', img: '/images/crystal/obsidian.png', name: '黑曜石', effect: '沉稳内敛' },
    { emoji: '🌙', img: '/images/crystal/labradorite.png', name: '拉长石', effect: '灵感闪耀' }
  ],
  '火': [
    { emoji: '❤️', img: '/images/crystal/red-agate.png', name: '红玛瑙', effect: '活力满满' },
    { emoji: '🌹', img: '/images/crystal/rose-quartz.png', name: '粉水晶', effect: '舒缓心情' },
    { emoji: '🔥', img: '/images/crystal/garnet.png', name: '石榴石', effect: '提升自信' }
  ],
  '土': [
    { emoji: '🤎', img: '/images/crystal/tiger-eye.png', name: '虎眼石', effect: '坚定意志' },
    { emoji: '🧡', img: '/images/crystal/amber.png', name: '琥珀', effect: '安神定志' },
    { emoji: '⭐', img: '/images/crystal/rutilated.png', name: '钛晶', effect: '助力日常' }
  ]
};

const ZODIAC_LIST = [
  { name: '摩羯座', symbol: '♑', start: [1, 1], end: [1, 19] },
  { name: '水瓶座', symbol: '♒', start: [1, 20], end: [2, 18] },
  { name: '双鱼座', symbol: '♓', start: [2, 19], end: [3, 20] },
  { name: '白羊座', symbol: '♈', start: [3, 21], end: [4, 19] },
  { name: '金牛座', symbol: '♉', start: [4, 20], end: [5, 20] },
  { name: '双子座', symbol: '♊', start: [5, 21], end: [6, 21] },
  { name: '巨蟹座', symbol: '♋', start: [6, 22], end: [7, 22] },
  { name: '狮子座', symbol: '♌', start: [7, 23], end: [8, 22] },
  { name: '处女座', symbol: '♍', start: [8, 23], end: [9, 23] },
  { name: '天秤座', symbol: '♎', start: [9, 23], end: [10, 23] },
  { name: '天蝎座', symbol: '♏', start: [10, 24], end: [11, 22] },
  { name: '射手座', symbol: '♐', start: [11, 23], end: [12, 21] },
  { name: '摩羯座', symbol: '♑', start: [12, 22], end: [12, 31] }
];

const ZODIAC_LUCKY_COLORS = {
  '白羊座': ['红', '橙', '金'], '金牛座': ['绿', '粉', '棕'],
  '双子座': ['黄', '银', '浅蓝'], '巨蟹座': ['白', '银', '月光银'],
  '狮子座': ['金', '红', '橙'], '处女座': ['米', '浅绿', '灰'],
  '天秤座': ['粉', '浅蓝', '薰衣草'], '天蝎座': ['酒红', '黑', '深紫'],
  '射手座': ['紫', '蓝', '橙'], '摩羯座': ['黑', '深灰', '深棕'],
  '水瓶座': ['蓝', '紫', '银'], '双鱼座': ['薄荷绿', '海蓝', '淡紫']
};

const SHENGXIAO_MAP = {
  '金': { lucky: '🐔 🐵 🐭', warn: '🐕 🐉 🐰' },
  '木': { lucky: '🐯 🐱 🐷', warn: '🐍 🐏 🐶' },
  '水': { lucky: '🐭 🐵 🐉', warn: '🐎 🐑 🐔' },
  '火': { lucky: '🐍 🐲 🐶', warn: '🐗 🐭 🐵' },
  '土': { lucky: '🐔 🐵 🐭', warn: '🐕 🐉 🐰' }
};

// ===== 农历数据表 1900-2100 =====
const LUNAR_INFO = [
  0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
  0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
  0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
  0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
  0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
  0x06ca0,0x0b550,0x15355,0x04da0,0x0a5b0,0x14573,0x052b0,0x0a9a8,0x0e950,0x06aa0,
  0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
  0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b6a0,0x195a6,
  0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
  0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
  0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
  0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
  0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
  0x05aa0,0x076a3,0x096d0,0x04afb,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
  0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0,
  0x14b63,0x09370,0x049f8,0x04970,0x064b0,0x168a6,0x0ea50,0x06b20,0x1a6c4,0x0aae0,
  0x0a2e0,0x0d2e3,0x0c960,0x0d557,0x0d4a0,0x0da50,0x05d55,0x056a0,0x0a6d0,0x055d4,
  0x052d0,0x0a9b8,0x0a950,0x0b4a0,0x0b6a6,0x0ad50,0x055a0,0x0aba4,0x0a5b0,0x052b0,
  0x0b273,0x06930,0x07337,0x06aa0,0x0ad50,0x14b55,0x04b60,0x0a570,0x054e4,0x0d160,
  0x0e968,0x0d520,0x0daa0,0x16aa6,0x056d0,0x04ae0,0x0a9d4,0x0a2d0,0x0d150,0x0f252,
  0x0d520
];

function _leapMonth(y) { return LUNAR_INFO[y - 1900] & 0xf; }
function _leapDays(y) { return _leapMonth(y) ? ((LUNAR_INFO[y - 1900] & 0x10000) ? 30 : 29) : 0; }
function _monthDays(y, m) { return (LUNAR_INFO[y - 1900] & (0x10000 >> m)) ? 30 : 29; }
function _lunarYearDays(y) {
  let sum = 348;
  for (let i = 0x8000; i > 0x8; i >>= 1) {
    sum += (LUNAR_INFO[y - 1900] & i) ? 1 : 0;
  }
  return sum + _leapDays(y);
}

export function solarToLunar(y, m, d) {
  if (y < 1900 || y > 2100) return '';
  let offset = Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(1900, 0, 31)) / 86400000);
  let i, temp = 0;
  for (i = 1900; i < 2101 && offset > 0; i++) {
    temp = _lunarYearDays(i);
    offset -= temp;
  }
  if (offset < 0) { offset += temp; i--; }
  const year = i;
  const leap = _leapMonth(year);
  const months = [];
  for (let j = 1; j <= 12; j++) {
    months.push({ m: j, leap: false, days: _monthDays(year, j) });
    if (leap > 0 && j === leap) months.push({ m: j, leap: true, days: _leapDays(year) });
  }
  let month = 1, day = 1, isLeap = false;
  for (let j = 0; j < months.length; j++) {
    temp = months[j].days;
    if (offset < temp) {
      month = months[j].m;
      isLeap = months[j].leap;
      day = offset + 1;
      break;
    }
    offset -= temp;
  }
  const lm = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
  const ld = [
    '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
    '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
    '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
  ];
  return (isLeap ? '闰' : '') + lm[month - 1] + '月' + ld[day - 1];
}

const _sfCache = {};
function _springFestivalTs(y) {
  if (_sfCache[y]) return _sfCache[y];
  let sf = null;
  for (let m = 1; m <= 2 && !sf; m++) {
    const maxD = m === 1 ? 31 : 29;
    for (let d = 1; d <= maxD; d++) {
      if (solarToLunar(y, m, d) === '正月初一') {
        sf = Date.UTC(y, m - 1, d);
        break;
      }
    }
  }
  if (sf === null) sf = Date.UTC(y, 0, 31);
  _sfCache[y] = sf;
  return sf;
}
function _lunarYearOf(y, mo, da) {
  return Date.UTC(y, mo - 1, da) >= _springFestivalTs(y) ? y : y - 1;
}

function _hash32(n) {
  let h = n | 0;
  h = Math.imul(h ^ (h >>> 16), 2246822507);
  h = Math.imul(h ^ (h >>> 13), 3266489909);
  return (h ^ (h >>> 16)) >>> 0;
}

function _bgRawIdx(dayOfYear) {
  return _hash32(Math.imul(dayOfYear, 2654435761)) % SHARE_BGS.length;
}

export function pickShareBg(y, m, d, offset = 0) {
  const dayOfYear = Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 0)) / 86400000);
  const len = SHARE_BGS.length;
  let idx = _bgRawIdx(dayOfYear);
  if (dayOfYear > 0 && idx === _bgRawIdx(dayOfYear - 1)) {
    idx = (idx + 1 + (_hash32(dayOfYear) % (len - 1))) % len;
  }
  let off = offset % len;
  if (off < 0) off += len;
  return SHARE_BGS[(idx + off) % len];
}

export function getDayWuxing(y, m, d) {
  const diffRaw = Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(2024, 0, 1)) / 86400000);
  const diff = ((diffRaw % 60) + 60) % 60;
  const gan = TIAN_GAN[diff % 10];
  return { gan, zhi: DI_ZHI[diff % 12], wuxing: WUXING_GAN[gan] };
}

function getMonthGanZhi(y, m, d) {
  const monthZhi = DI_ZHI[(m + 1) % 12];
  const yearGanIndex = TIAN_GAN.indexOf(getDayWuxing(y, m, d).gan);
  const monthGanStart = [2, 4, 6, 8, 0, 2][yearGanIndex % 5];
  const monthGan = TIAN_GAN[(monthGanStart + m - 1) % 10];
  return monthGan + monthZhi;
}

function getWeekOfYear(y, m, d) {
  const startDow = new Date(Date.UTC(y, 0, 1)).getUTCDay();
  const days = Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 86400000);
  return Math.ceil((days + startDow + 1) / 7);
}

function getZodiacAnimal(y) {
  const yearGanZhi = getDayWuxing(y, 1, 1);
  const zhiIndex = DI_ZHI.indexOf(yearGanZhi.zhi);
  const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  return zodiacs[zhiIndex];
}

function getZodiac(m, d) {
  for (const z of ZODIAC_LIST) {
    if ((m > z.start[0] || (m === z.start[0] && d >= z.start[1])) &&
        (m < z.end[0] || (m === z.end[0] && d <= z.end[1]))) {
      return z;
    }
  }
  return ZODIAC_LIST[0];
}

function dayRandom(seed) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function extractColors(text) {
  const colors = [];
  const colorNames = [
    '白色', '银色', '金色', '乳白', '米色', '香槟', '黄色', '浅咖', '卡其', '杏色', '奶茶', '驼色',
    '绿色', '青色', '翠绿', '草绿', '薄荷', '松石绿', '湖蓝', '水绿', '抹茶', '孔雀绿', '黑色', '蓝色', '灰色',
    '藏青', '烟灰', '墨蓝', '靛青', '红色', '橙色', '粉色', '玫红', '珊瑚', '橘红', '酒红', '品红', '亮金',
    '紫色', '深紫', '焦糖', '土黄', '赭石', '冰银', '浅灰', '藏蓝', '墨色', '深灰', '蜜桃', '暖金', '暖橘',
    '森林绿', '橄榄', '象牙', '浅杏', '薰衣草', '薄荷绿', '海蓝', '淡紫', '深棕', '月光银',
    '咖啡', '棕', '浅蓝', '浅绿', '灰', '红', '橙', '黑', '紫', '蓝', '绿', '粉'
  ];
  const map = {
    '白色': '#FFFFFF', '银色': '#C0C0C0', '金色': '#FFD700', '乳白': '#FFFAF0', '米色': '#F5F5DC', '香槟': '#F7E7CE',
    '黄色': '#FFD700', '浅咖': '#D2B48C', '卡其': '#F0E68C', '杏色': '#FFDAB9', '奶茶': '#D2B48C', '驼色': '#BC8F5F',
    '绿色': '#228B22', '青色': '#00CED1', '翠绿': '#00A86B', '草绿': '#7CFC00', '薄荷': '#98FF98', '松石绿': '#40E0D0',
    '湖蓝': '#4682B4', '水绿': '#20B2AA', '抹茶': '#97BC62', '孔雀绿': '#046307', '黑色': '#000000',
    '蓝色': '#0000FF', '灰色': '#808080', '藏青': '#2F4F4F', '烟灰': '#708090', '墨蓝': '#082567', '靛青': '#400080',
    '红色': '#FF0000', '橙色': '#FFA500', '粉色': '#FFC0CB', '玫红': '#FF007F', '珊瑚': '#FF7F50', '橘红': '#FF4500',
    '酒红': '#722F37', '品红': '#FF00FF', '亮金': '#FFDF00', '紫色': '#800080', '深紫': '#4B0082', '焦糖': '#8B4513',
    '土黄': '#BDB76B', '赭石': '#CC7722', '冰银': '#E6E6FA', '浅灰': '#D3D3D3', '藏蓝': '#191970', '墨色': '#333333',
    '深灰': '#404040', '蜜桃': '#FFE5B4', '暖金': '#FFB347', '暖橘': '#FF7F49', '森林绿': '#228B22',
    '橄榄': '#808000', '象牙': '#FFFFF0', '浅杏': '#FFDD99', '薰衣草': '#B57EDC', '薄荷绿': '#98FF98',
    '海蓝': '#4682B4', '淡紫': '#E6E6FA', '深棕': '#5C4033', '月光银': '#D3D3D3',
    '咖啡': '#6F4E37', '棕': '#964B00', '灰': '#808080', '红': '#FF0000', '橙': '#FFA500',
    '黑': '#000000', '紫': '#800080', '蓝': '#0000FF', '绿': '#228B22', '粉': '#FFC0CB'
  };
  for (const name of colorNames) {
    if (text.indexOf(name) !== -1) {
      colors.push(map[name] || '#888888');
    }
  }
  return colors.length ? colors : ['#CCCCCC', '#BBBBBB', '#AAAAAA'];
}

export function dayMainColor(y, m, d) {
  const wi = getDayWuxing(y, m, d);
  const wd = WUXING_DATA[wi.wuxing] || WUXING_DATA['土'];
  const seed = y * 10000 + m * 100 + d;
  const r1 = Math.floor(dayRandom(seed) * 2);
  const text = wd.best[r1];
  const hex = extractColors(text);
  return { text, name: String(text).split('、')[0], hex: hex[0] || '#CCCCCC', allHex: hex.slice(0, 3) };
}

export async function fetchRealYiJi(y, m, d) {
  const dateNum = `${y}${String(m).padStart(2, '0')}${String(d).padStart(2, '0')}`;
  const url = `https://api.shwgij.com/api/lunars/lunar?key=aoS1TJU1lVJSTL8334YsLx1tIe&date=${dateNum}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    const json = await res.json();
    const data = (json.code === 201 || json.code === 200) ? json.data : json;
    if (!data) return null;
    const yi = (data.YiDay || '').split(/\s+/).filter(Boolean);
    const ji = (data.JiDay || '').split(/\s+/).filter(Boolean);
    if (yi.length || ji.length) return { yi, ji };
  } catch {
    // 网络不可用或超时时静默降级为五行默认宜忌
  }
  return null;
}

export function getBeijingDateParts(customDateStr) {
  if (customDateStr && /^\d{4}-\d{1,2}-\d{1,2}$/.test(customDateStr)) {
    const [y, m, d] = customDateStr.split('-').map(Number);
    return { y, m, d };
  }
  const now = new Date();
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Shanghai',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const [y, m, d] = fmt.format(now).split('-').map(Number);
  return { y, m, d };
}

function buildCaptions(d) {
  const crNames = d.crystals.map(c => c.name).join(' / ');
  const dateLabel = `${d.month}月${d.day}日`;
  const seed = d.year * 10000 + d.month * 100 + d.day;

  const pool14 = [
    `✨ ${dateLabel} ${d.weekDay}｜今日五行属「${d.wuxing}」\n今日首推穿：${d.bestColors}\n搭配水晶：${crNames} 💎\n每天换一个对的颜色，状态自然顺起来～\n（保存图片看完整色卡 & 黄历宜忌👇）`,
    `🌿 早安｜${dateLabel} 农历${d.lunarDate}\n今天穿【${d.bestColors}】最提气色，配 ${crNames} 刚刚好✨\n今日状态关键词：${d.bestTag}，祝你今天顺心自在～`,
    `🎨 ${dateLabel} 每日穿搭色卡已更新！\n今日属「${d.wuxing}」：首推 ${d.bestColors}，次推 ${d.goodColors}\n宜佩戴：${crNames} ✨\n不知道穿什么颜色，直接照着图里选就对了～`
  ];

  const pool17 = [
    `☀️ ${dateLabel} ${d.weekDay} · 农历${d.lunarDate}\n今日穿衣主色：${d.bestColors}（${d.bestTag}）\n出门戴一串 ${crNames}，把今天的好状态拉满✨`,
    `💫 今天穿什么颜色？答案在图里啦👇\n${dateLabel} 五行属「${d.wuxing}」\n首选色系：${d.bestColors}\n推荐搭配水晶：${crNames}\n扫码还能查每日黄历和更多配色哦～`,
    `🌸 ${dateLabel} 穿搭灵感｜属「${d.wuxing}」的一天\n建议穿：${d.bestColors}，尽量避开 ${d.worstColors}\n今日好搭档：${crNames} 💎\n收藏一下，明天还有新的色卡更新～`
  ];

  const idx14 = _hash32(seed) % pool14.length;
  const idx17 = _hash32(seed + 7919) % pool17.length;
  return {
    caption_14: pool14[idx14],
    caption_17: pool17[idx17]
  };
}

export async function buildDailyPayload(customDateStr) {
  const { y, m, d } = getBeijingDateParts(customDateStr);
  const dow = new Date(Date.UTC(y, m - 1, d)).getUTCDay();
  const wi = getDayWuxing(y, m, d);
  const wuxing = wi.wuxing;
  const wd = WUXING_DATA[wuxing];

  const seed = y * 10000 + m * 100 + d;
  const r1 = Math.floor(dayRandom(seed) * 2);
  const r2 = Math.floor(dayRandom(seed + 1) * 2);
  const r3 = Math.floor(dayRandom(seed + 2) * 2);

  const zo = getZodiac(m, d);
  const lp = ZODIAC_LUCKY_COLORS[zo.name] || ['白色', '金色', '银色'];
  const tipLP = lp[Math.floor(dayRandom(seed + 3) * lp.length)];

  const cd = CRYSTAL_DATA[wuxing] || CRYSTAL_DATA['土'];
  const crystals = [cd[0], cd[1]];
  const sx = SHENGXIAO_MAP[wuxing];

  const lunarYear = _lunarYearOf(y, m, d);
  const nianGZ = TIAN_GAN[(lunarYear - 4) % 10] + DI_ZHI[(lunarYear - 4) % 12];

  // 本周 7 天主色（周一起）
  const monOff = dow === 0 ? -6 : 1 - dow;
  const weekColors = [];
  for (let i = 0; i < 7; i++) {
    const dt = new Date(Date.UTC(y, m - 1, d + monOff + i));
    const wy = dt.getUTCFullYear(), wm = dt.getUTCMonth() + 1, wdDay = dt.getUTCDate();
    const mc = dayMainColor(wy, wm, wdDay);
    weekColors.push({
      hex: mc.hex,
      isSel: wy === y && wm === m && wdDay === d
    });
  }

  // 明日预告
  const tmrDt = new Date(Date.UTC(y, m - 1, d + 1));
  const tmrY = tmrDt.getUTCFullYear(), tmrM = tmrDt.getUTCMonth() + 1, tmrD = tmrDt.getUTCDate();
  const tmrC = dayMainColor(tmrY, tmrM, tmrD);
  const tmrWd = '周' + WEEK_DAYS[tmrDt.getUTCDay()];

  // 尝试拉取真实黄历宜忌
  const realYiJi = await fetchRealYiJi(y, m, d);

  const payload = {
    dateStr: `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`,
    year: y,
    month: m,
    day: d,
    weekDay: '周' + WEEK_DAYS[dow],
    lunarDate: solarToLunar(y, m, d),
    nianGanZhi: nianGZ,
    monthGanZhi: getMonthGanZhi(y, m, d),
    riGanZhi: wi.gan + wi.zhi,
    weekOfYear: getWeekOfYear(y, m, d),
    zodiacAnimal: getZodiacAnimal(y),
    wuxing,
    bestColors: wd.best[r1],
    goodColors: wd.good[r2],
    okColors: wd.ok[r3],
    badColors: wd.bad[r1],
    worstColors: wd.worst[r2],
    bestHex: extractColors(wd.best[r1]).slice(0, 3),
    goodHex: extractColors(wd.good[r2]).slice(0, 3),
    okHex: extractColors(wd.ok[r3]).slice(0, 3),
    badHex: extractColors(wd.bad[r1]).slice(0, 3),
    worstHex: extractColors(wd.worst[r2]).slice(0, 3),
    bestTag: wd.tags[0],
    goodTag: wd.tags[1],
    okTag: wd.tags[2],
    badTag: wd.tags[3],
    worstTag: wd.tags[4],
    caishen: wd.fortune.caishen,
    fushen: wd.fortune.fushen,
    xishen: wd.fortune.xishen,
    guiren: wd.fortune.guiren,
    sxLucky: sx.lucky,
    sxWarn: sx.warn,
    crystals,
    tipsTitle: `${zo.symbol} ${zo.name}今日幸运色：${tipLP}`,
    yiItems: realYiJi ? realYiJi.yi : wd.yi,
    jiItems: realYiJi ? realYiJi.ji : wd.ji,
    yiJiSource: realYiJi ? 'api' : 'fallback',
    shareBg: pickShareBg(y, m, d, 0),
    weekColors,
    tomorrow: {
      month: tmrM,
      day: tmrD,
      weekDay: tmrWd,
      name: tmrC.name,
      hex: tmrC.allHex
    }
  };

  const captions = buildCaptions(payload);
  return { ...payload, ...captions };
}

/**
 * Hán-Việt — bảng tra âm Hán-Việt cho thuật ngữ Tử Vi Đẩu Số.
 * 汉越音对照表：把星曜、宫位、干支、格局等紫微术语转成越南汉越读音。
 *
 * hv('紫微')      → 'Tử Vi'
 * hv('紫府同宫')  → 'Tử Phủ Đồng Cung'
 * hv('水二局')    → 'Thủy Nhị Cục'
 *
 * Ưu tiên khớp cụm dài nhất trong TERMS, sau đó đọc từng chữ theo CHARS.
 * Chữ không có trong bảng được giữ nguyên.
 */

/** Cụm thuật ngữ có cách đọc riêng (khác ghép từng chữ) hoặc cần ổn định */
const TERMS: Record<string, string> = {
  // ── 14 chính tinh 主星 ──
  紫微: 'Tử Vi', 天机: 'Thiên Cơ', 太阳: 'Thái Dương', 武曲: 'Vũ Khúc', 天同: 'Thiên Đồng',
  廉贞: 'Liêm Trinh', 天府: 'Thiên Phủ', 太阴: 'Thái Âm', 贪狼: 'Tham Lang', 巨门: 'Cự Môn',
  天相: 'Thiên Tướng', 天梁: 'Thiên Lương', 七杀: 'Thất Sát', 破军: 'Phá Quân',
  // ── Cát tinh / phụ tinh 吉星 辅星 ──
  左辅: 'Tả Phù', 右弼: 'Hữu Bật', 文昌: 'Văn Xương', 文曲: 'Văn Khúc', 天魁: 'Thiên Khôi',
  天钺: 'Thiên Việt', 禄存: 'Lộc Tồn', 天马: 'Thiên Mã', 三台: 'Tam Thai', 八座: 'Bát Tọa',
  凤阁: 'Phượng Các', 华盖: 'Hoa Cái', 台辅: 'Thai Phụ', 天喜: 'Thiên Hỷ', 天官: 'Thiên Quan',
  天寿: 'Thiên Thọ', 天巫: 'Thiên Vu', 天德: 'Thiên Đức', 天才: 'Thiên Tài', 天福: 'Thiên Phúc',
  天贵: 'Thiên Quý', 封诰: 'Phong Cáo', 年解: 'Niên Giải', 恩光: 'Ân Quang', 月德: 'Nguyệt Đức',
  红鸾: 'Hồng Loan', 解神: 'Giải Thần', 龙池: 'Long Trì', 劫煞: 'Kiếp Sát', 咸池: 'Hàm Trì',
  天厨: 'Thiên Trù', 天姚: 'Thiên Diêu', 破碎: 'Phá Toái', 龙德: 'Long Đức',
  // ── Sát tinh / hung tinh 煞星 ──
  擎羊: 'Kình Dương', 陀罗: 'Đà La', 火星: 'Hỏa Tinh', 铃星: 'Linh Tinh', 地空: 'Địa Không',
  地劫: 'Địa Kiếp', 天空: 'Thiên Không', 截空: 'Triệt Không', 副截: 'Phó Triệt', 旬空: 'Tuần Không',
  副旬: 'Phó Tuần', 大耗: 'Đại Hao', 小耗: 'Tiểu Hao', 天伤: 'Thiên Thương', 天使: 'Thiên Sứ',
  天刑: 'Thiên Hình', 天哭: 'Thiên Khốc', 天月: 'Thiên Nguyệt', 天虚: 'Thiên Hư', 孤辰: 'Cô Thần',
  寡宿: 'Quả Tú', 蜚廉: 'Phi Liêm', 阴煞: 'Âm Sát',
  // ── 12 cung 宫位 ──
  命宫: 'Mệnh', 身宫: 'Thân', 兄弟: 'Huynh Đệ', 夫妻: 'Phu Thê', 子女: 'Tử Tức', 财帛: 'Tài Bạch',
  疾厄: 'Tật Ách', 迁移: 'Thiên Di', 仆役: 'Nô Bộc', 交友: 'Nô Bộc', 官禄: 'Quan Lộc',
  田宅: 'Điền Trạch', 福德: 'Phúc Đức', 父母: 'Phụ Mẫu',
  兄弟宫: 'Huynh Đệ', 夫妻宫: 'Phu Thê', 子女宫: 'Tử Tức', 财帛宫: 'Tài Bạch', 疾厄宫: 'Tật Ách',
  迁移宫: 'Thiên Di', 仆役宫: 'Nô Bộc', 交友宫: 'Nô Bộc', 官禄宫: 'Quan Lộc', 田宅宫: 'Điền Trạch',
  福德宫: 'Phúc Đức', 父母宫: 'Phụ Mẫu',
  // ── Tứ Hóa 四化 ──
  化禄: 'Hóa Lộc', 化权: 'Hóa Quyền', 化科: 'Hóa Khoa', 化忌: 'Hóa Kỵ', 四化: 'Tứ Hóa',
  // ── Cục 五行局 ──
  水二局: 'Thủy Nhị Cục', 木三局: 'Mộc Tam Cục', 金四局: 'Kim Tứ Cục', 土五局: 'Thổ Ngũ Cục',
  火六局: 'Hỏa Lục Cục', 五行局: 'Ngũ Hành Cục',
  阳男: 'Dương Nam', 阴男: 'Âm Nam', 阳女: 'Dương Nữ', 阴女: 'Âm Nữ',
  // ── 12 thần 十二神 ──
  博士: 'Bác Sĩ', 力士: 'Lực Sĩ', 青龙: 'Thanh Long', 将军: 'Tướng Quân', 奏书: 'Tấu Thư',
  飞廉: 'Phi Liêm', 喜神: 'Hỷ Thần', 病符: 'Bệnh Phù', 伏兵: 'Phục Binh', 官符: 'Quan Phù',
  岁建: 'Thái Tuế', 晦气: 'Hối Khí', 丧门: 'Tang Môn', 贯索: 'Quán Sách', 岁破: 'Tuế Phá',
  白虎: 'Bạch Hổ', 吊客: 'Điếu Khách', 将星: 'Tướng Tinh', 攀鞍: 'Phan An', 岁驿: 'Tuế Dịch',
  息神: 'Tức Thần', 灾煞: 'Tai Sát', 天煞: 'Thiên Sát', 指背: 'Chỉ Bối', 月煞: 'Nguyệt Sát',
  亡神: 'Vong Thần', 长生: 'Trường Sinh', 沐浴: 'Mộc Dục', 冠带: 'Quan Đới', 临官: 'Lâm Quan',
  帝旺: 'Đế Vượng',
  // ── Cách cục 格局 ──
  君臣庆会: 'Quân Thần Khánh Hội', 紫府同宫: 'Tử Phủ Đồng Cung', 府相朝垣: 'Phủ Tướng Triều Viên',
  阳梁昌禄: 'Dương Lương Xương Lộc', 武贪格: 'Vũ Tham Cách', 杀破狼: 'Sát Phá Tham',
  机月同梁: 'Cơ Nguyệt Đồng Lương', 日月同宫: 'Nhật Nguyệt Đồng Cung', 日月夹命: 'Nhật Nguyệt Giáp Mệnh',
  石中隐玉: 'Thạch Trung Ẩn Ngọc', 明珠出海: 'Minh Châu Xuất Hải', 双禄朝垣: 'Song Lộc Triều Viên',
  三奇加会: 'Tam Kỳ Gia Hội', 马头带箭: 'Mã Đầu Đới Tiễn', 日月并明: 'Nhật Nguyệt Tịnh Minh',
  七杀朝斗: 'Thất Sát Triều Đẩu', 三方四正: 'Tam Phương Tứ Chính',
  // ── Khác ──
  紫微斗数: 'Tử Vi Đẩu Số', 斗数: 'Đẩu Số', 命盘: 'Lá số', 大限: 'Đại hạn', 流年: 'Lưu niên',
  小限: 'Tiểu hạn', 命主: 'Mệnh chủ', 身主: 'Thân chủ', 空宫: 'Vô chính diệu', 子时: 'Giờ Tý',
};

/** Âm Hán-Việt từng chữ (giản thể) */
const CHARS: Record<string, string> = {
  // can chi
  甲: 'Giáp', 乙: 'Ất', 丙: 'Bính', 丁: 'Đinh', 戊: 'Mậu', 己: 'Kỷ', 庚: 'Canh', 辛: 'Tân', 壬: 'Nhâm', 癸: 'Quý',
  子: 'Tý', 丑: 'Sửu', 寅: 'Dần', 卯: 'Mão', 辰: 'Thìn', 巳: 'Tỵ', 午: 'Ngọ', 未: 'Mùi', 申: 'Thân', 酉: 'Dậu', 戌: 'Tuất', 亥: 'Hợi',
  // ngũ hành, số
  金: 'Kim', 木: 'Mộc', 水: 'Thủy', 火: 'Hỏa', 土: 'Thổ',
  一: 'Nhất', 二: 'Nhị', 三: 'Tam', 四: 'Tứ', 五: 'Ngũ', 六: 'Lục', 七: 'Thất', 八: 'Bát', 九: 'Cửu', 十: 'Thập',
  // độ sáng 亮度
  庙: 'Miếu', 旺: 'Vượng', 得: 'Đắc', 利: 'Lợi', 平: 'Bình', 不: 'Bất', 闲: 'Nhàn', 陷: 'Hãm', 地: 'Địa',
  // tứ hóa
  禄: 'Lộc', 权: 'Quyền', 科: 'Khoa', 忌: 'Kỵ', 化: 'Hóa',
  // thường gặp trong tên sao, cung, cách cục
  紫: 'Tử', 微: 'Vi', 天: 'Thiên', 机: 'Cơ', 太: 'Thái', 阳: 'Dương', 阴: 'Âm', 武: 'Vũ', 曲: 'Khúc',
  同: 'Đồng', 廉: 'Liêm', 贞: 'Trinh', 府: 'Phủ', 贪: 'Tham', 狼: 'Lang', 巨: 'Cự', 门: 'Môn',
  相: 'Tướng', 梁: 'Lương', 杀: 'Sát', 破: 'Phá', 军: 'Quân', 左: 'Tả', 右: 'Hữu', 辅: 'Phụ', 弼: 'Bật',
  文: 'Văn', 昌: 'Xương', 魁: 'Khôi', 钺: 'Việt', 存: 'Tồn', 马: 'Mã', 羊: 'Dương', 陀: 'Đà', 罗: 'La',
  铃: 'Linh', 星: 'Tinh', 空: 'Không', 劫: 'Kiếp', 日: 'Nhật', 月: 'Nguyệt', 命: 'Mệnh', 身: 'Thân',
  宫: 'Cung', 夹: 'Giáp', 会: 'Hội', 朝: 'Triều', 垣: 'Viên', 格: 'Cách', 局: 'Cục', 入: 'Nhập',
  财: 'Tài', 官: 'Quan', 双: 'Song', 奇: 'Kỳ', 加: 'Gia', 君: 'Quân', 臣: 'Thần', 庆: 'Khánh',
  石: 'Thạch', 中: 'Trung', 隐: 'Ẩn', 玉: 'Ngọc', 明: 'Minh', 珠: 'Châu', 出: 'Xuất', 海: 'Hải',
  头: 'Đầu', 带: 'Đới', 箭: 'Tiễn', 并: 'Tịnh', 斗: 'Đẩu', 数: 'Số', 盘: 'Bàn', 大: 'Đại', 小: 'Tiểu',
  限: 'Hạn', 流: 'Lưu', 年: 'Niên', 主: 'Chủ', 吉: 'Cát', 凶: 'Hung', 煞: 'Sát', 神: 'Thần',
  龙: 'Long', 凤: 'Phượng', 虎: 'Hổ', 德: 'Đức', 福: 'Phúc', 寿: 'Thọ', 喜: 'Hỷ', 贵: 'Quý',
  红: 'Hồng', 鸾: 'Loan', 华: 'Hoa', 盖: 'Cái', 台: 'Thai', 座: 'Tọa', 阁: 'Các', 恩: 'Ân', 光: 'Quang',
  解: 'Giải', 池: 'Trì', 咸: 'Hàm', 厨: 'Trù', 姚: 'Diêu', 刑: 'Hình', 哭: 'Khốc', 虚: 'Hư', 孤: 'Cô',
  寡: 'Quả', 宿: 'Tú', 耗: 'Hao', 伤: 'Thương', 使: 'Sứ', 截: 'Triệt', 旬: 'Tuần', 副: 'Phó',
  才: 'Tài', 巫: 'Vu', 封: 'Phong', 诰: 'Cáo', 碎: 'Toái', 蜚: 'Phi', 擎: 'Kình', 生: 'Sinh',
  死: 'Tử', 病: 'Bệnh', 墓: 'Mộ', 绝: 'Tuyệt', 胎: 'Thai', 养: 'Dưỡng', 衰: 'Suy', 帝: 'Đế',
  冠: 'Quan', 临: 'Lâm', 沐: 'Mộc', 浴: 'Dục', 长: 'Trường', 兄: 'Huynh', 弟: 'Đệ', 夫: 'Phu',
  妻: 'Thê', 女: 'Nữ', 男: 'Nam', 帛: 'Bạch', 疾: 'Tật', 厄: 'Ách', 迁: 'Thiên', 移: 'Di',
  仆: 'Bộc', 役: 'Dịch', 交: 'Giao', 友: 'Hữu', 田: 'Điền', 宅: 'Trạch', 父: 'Phụ', 母: 'Mẫu',
  岁: 'Tuế', 建: 'Kiến', 晦: 'Hối', 气: 'Khí', 丧: 'Tang', 贯: 'Quán', 索: 'Sách', 符: 'Phù',
  白: 'Bạch', 吊: 'Điếu', 客: 'Khách', 将: 'Tướng', 攀: 'Phan', 鞍: 'An', 驿: 'Dịch', 息: 'Tức',
  灾: 'Tai', 指: 'Chỉ', 背: 'Bối', 亡: 'Vong', 博: 'Bác', 士: 'Sĩ', 力: 'Lực', 青: 'Thanh',
  奏: 'Tấu', 书: 'Thư', 飞: 'Phi', 伏: 'Phục', 兵: 'Binh', 全: 'Toàn', 集: 'Tập', 骨: 'Cốt',
  髓: 'Tủy', 赋: 'Phú', 纪: 'Kỷ', 倪: 'Nghê', 厦: 'Hạ', 闰: 'Nhuận', 时: 'Thời',
  正: 'Chính', 对: 'Đối', 方: 'Phương', 合: 'Hợp', 借: 'Tá', 自: 'Tự', 宗: 'Tông', 派: 'Phái',
};

const MAX_TERM_LEN = Math.max(...Object.keys(TERMS).map(k => k.length));
const HAN = /[一-鿿]/;

/** Đọc một chuỗi chữ Hán thành âm Hán-Việt. Phần không phải chữ Hán giữ nguyên. */
export function hv(text: string | undefined | null): string {
  if (!text) return '';
  const out: string[] = [];
  let i = 0;
  let pendingRaw = '';
  const flushRaw = () => { if (pendingRaw) { out.push(pendingRaw); pendingRaw = ''; } };
  while (i < text.length) {
    const ch = text[i];
    if (!HAN.test(ch)) { pendingRaw += ch; i++; continue; }
    let matched = false;
    for (let len = Math.min(MAX_TERM_LEN, text.length - i); len >= 2; len--) {
      const seg = text.slice(i, i + len);
      if (TERMS[seg]) { flushRaw(); out.push(TERMS[seg]); i += len; matched = true; break; }
    }
    if (matched) continue;
    flushRaw();
    out.push(CHARS[ch] ?? ch);
    i++;
  }
  flushRaw();
  // ghép bằng khoảng trắng giữa các âm tiết, không chèn trước/sau dấu câu
  return out.reduce((acc, part) => {
    if (!acc) return part;
    const prevHan = /[A-Za-zÀ-ỹ]$/.test(acc);
    const nextHan = /^[A-Za-zÀ-ỹ]/.test(part);
    return acc + (prevHan && nextHan ? ' ' : '') + part;
  }, '');
}

/** Tên cung: '命宫' → 'Mệnh', '财帛' → 'Tài Bạch' */
export const hvPalace = (name: string) => hv(name);

/** Can/chi theo chỉ số */
export const STEMS_VI = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
export const BRANCHES_VI = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];

/** Tứ hóa một chữ → tiếng Việt */
export const SIHUA_VI: Record<string, string> = { 禄: 'Lộc', 权: 'Quyền', 科: 'Khoa', 忌: 'Kỵ' };

/**
 * Dịch nghĩa (không phải đọc âm) cho từ khóa ngắn hay xuất hiện trong engine:
 * tính chất sao, từ khóa tính cách, nhóm sao.
 * 词义翻译：星曜性质、性格关键词等短语。
 */
const MEANING: Record<string, string> = {
  // tính chất 性质
  吉星: 'Cát tinh', 凶星: 'Hung tinh', 中性: 'Trung tính', 中性偏吉: 'Trung tính thiên cát',
  凶中带吉: 'Trong hung có cát', 吉中带凶: 'Trong cát có hung', 主星: 'Chính tinh', 辅星: 'Phụ tinh',
  煞星: 'Sát tinh', 杂曜: 'Tạp diệu',
  // từ khóa 14 chính tinh 关键词
  帝王: 'Đế vương', 尊贵: 'Tôn quý', 独立: 'Độc lập', 智慧: 'Trí tuệ', 机变: 'Cơ biến', 谋略: 'Mưu lược',
  阳刚: 'Dương cương', 官贵: 'Quan quý', 慷慨: 'Khảng khái', 财富: 'Tài phú', 刚毅: 'Cương nghị',
  果断: 'Quả đoán', 温和: 'Ôn hòa', 享福: 'Hưởng phúc', 随缘: 'Tùy duyên', 才艺: 'Tài nghệ',
  刑囚: 'Hình tù', 桃花: 'Đào hoa', 财库: 'Tài khố', 稳重: 'Ổn trọng', 保守: 'Bảo thủ',
  柔美: 'Nhu mỹ', 阴柔: 'Âm nhu', 欲望: 'Dục vọng', 多才: 'Đa tài', 口舌: 'Khẩu thiệt',
  是非: 'Thị phi', 善辩: 'Giỏi biện luận', 辅佐: 'Phụ tá', 行政: 'Hành chính', 印绶: 'Ấn thụ',
  荫护: 'Ấm hộ', 医药: 'Y dược', 长辈: 'Bậc trưởng bối', 将星: 'Tướng tinh', 果决: 'Quả quyết',
  孤克: 'Cô khắc', 开创: 'Khai sáng', 变动: 'Biến động', 破坏: 'Phá hoại',
  // nhóm thể loại
  商业: 'Kinh doanh', 文艺: 'Văn nghệ', 科技: 'Khoa học kỹ thuật', 体育: 'Thể thao', 历史: 'Lịch sử',
  // chủ đề luận 主题
  命格: 'Mệnh cách', 性格: 'Tính cách', 感情: 'Tình cảm', 婚姻: 'Hôn nhân', 事业: 'Sự nghiệp',
  财运: 'Tài vận', 健康: 'Sức khỏe', 六亲: 'Lục thân', 子女: 'Con cái', 迁移: 'Xuất ngoại / Thiên di',
  人际: 'Quan hệ', 田宅: 'Nhà đất', 精神: 'Tinh thần', 父母: 'Cha mẹ', 兄弟: 'Anh em', 财富运: 'Tài vận',
};

/** Dịch nghĩa một cụm ngắn; cụm ghép bằng '·' hoặc '、' được dịch từng phần. Không có thì đọc Hán-Việt. */
export function vt(text: string | undefined | null): string {
  if (!text) return '';
  if (MEANING[text]) return MEANING[text];
  if (/[·、，,]/.test(text)) {
    return text.split(/([·、，,])/).map(p => (/^[·、，,]$/.test(p) ? (p === '·' ? ' · ' : ', ') : vt(p))).join('');
  }
  return hv(text);
}

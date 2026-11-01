/**
 * Nơi sinh tại Việt Nam và múi giờ lịch sử.
 * 越南出生地（经度）与历史时区。
 *
 * Cấp tỉnh: 34 đơn vị hành chính cấp tỉnh sau sáp nhập (hiệu lực 2025).
 * Bên trong mỗi tỉnh: các tỉnh/thành cũ (63 đơn vị trước 2025) — người sinh trước 2025 quen tên cũ,
 * và mỗi tỉnh cũ cho kinh độ sát nơi sinh hơn. Kinh độ lấy theo trung tâm hành chính của tỉnh cũ.
 *
 * Múi giờ: giờ đồng hồ ở Việt Nam không phải lúc nào cũng là UTC+7.
 *   · Toàn Đông Dương: 31/12/1942 – 14/3/1945 dùng UTC+8; 14/3/1945 – 2/9/1945 dùng UTC+9 (giờ Tokyo).
 *   · Miền Nam: 1/4/1947 – 30/6/1955 UTC+8; 1/7/1955 – 31/12/1959 UTC+7; 1/1/1960 – 12/6/1975 UTC+8.
 *   · Từ 13/6/1975 cả nước thống nhất UTC+7.
 * Nguồn: tz database (Asia/Ho_Chi_Minh) và bài "Time in Vietnam" (Wikipedia). Giai đoạn 1947–1954 ở miền Bắc
 * không thống nhất (vùng tự do dùng UTC+7), ở đây lấy UTC+7. Các mốc chuyển lúc 23:00 được làm tròn theo ngày.
 */
import type { ProvinceInfo } from './cities';

export interface VnPlace {
  name: string;
  longitude: number;
  /** Thuộc miền Nam theo ranh giới 1954–1975 (nam sông Bến Hải) — dùng cho múi giờ lịch sử */
  south: boolean;
}

export interface VnProvince {
  name: string;
  places: VnPlace[];
}

const N = false;
const S = true;

export const VN_PROVINCES: VnProvince[] = [
  { name: 'Hà Nội', places: [{ name: 'Hà Nội', longitude: 105.85, south: N }] },
  { name: 'Huế', places: [{ name: 'Huế (Thừa Thiên Huế)', longitude: 107.59, south: S }] },
  { name: 'Lai Châu', places: [{ name: 'Lai Châu', longitude: 103.46, south: N }] },
  { name: 'Điện Biên', places: [{ name: 'Điện Biên', longitude: 103.02, south: N }] },
  { name: 'Sơn La', places: [{ name: 'Sơn La', longitude: 103.91, south: N }] },
  { name: 'Lạng Sơn', places: [{ name: 'Lạng Sơn', longitude: 106.76, south: N }] },
  { name: 'Quảng Ninh', places: [{ name: 'Quảng Ninh', longitude: 107.08, south: N }] },
  { name: 'Thanh Hóa', places: [{ name: 'Thanh Hóa', longitude: 105.78, south: N }] },
  { name: 'Nghệ An', places: [{ name: 'Nghệ An', longitude: 105.69, south: N }] },
  { name: 'Hà Tĩnh', places: [{ name: 'Hà Tĩnh', longitude: 105.90, south: N }] },
  { name: 'Cao Bằng', places: [{ name: 'Cao Bằng', longitude: 106.26, south: N }] },
  { name: 'Tuyên Quang', places: [
    { name: 'Tuyên Quang', longitude: 105.22, south: N },
    { name: 'Hà Giang', longitude: 104.98, south: N },
  ] },
  { name: 'Lào Cai', places: [
    { name: 'Lào Cai', longitude: 103.97, south: N },
    { name: 'Yên Bái', longitude: 104.87, south: N },
  ] },
  { name: 'Thái Nguyên', places: [
    { name: 'Thái Nguyên', longitude: 105.84, south: N },
    { name: 'Bắc Kạn', longitude: 105.83, south: N },
  ] },
  { name: 'Phú Thọ', places: [
    { name: 'Phú Thọ', longitude: 105.40, south: N },
    { name: 'Vĩnh Phúc', longitude: 105.60, south: N },
    { name: 'Hòa Bình', longitude: 105.34, south: N },
  ] },
  { name: 'Bắc Ninh', places: [
    { name: 'Bắc Ninh', longitude: 106.08, south: N },
    { name: 'Bắc Giang', longitude: 106.19, south: N },
  ] },
  { name: 'Hưng Yên', places: [
    { name: 'Hưng Yên', longitude: 106.05, south: N },
    { name: 'Thái Bình', longitude: 106.34, south: N },
  ] },
  { name: 'Hải Phòng', places: [
    { name: 'Hải Phòng', longitude: 106.68, south: N },
    { name: 'Hải Dương', longitude: 106.33, south: N },
  ] },
  { name: 'Ninh Bình', places: [
    { name: 'Ninh Bình', longitude: 105.97, south: N },
    { name: 'Hà Nam', longitude: 105.91, south: N },
    { name: 'Nam Định', longitude: 106.17, south: N },
  ] },
  { name: 'Quảng Trị', places: [
    { name: 'Quảng Trị', longitude: 107.10, south: S },
    { name: 'Quảng Bình', longitude: 106.60, south: N },
  ] },
  { name: 'Đà Nẵng', places: [
    { name: 'Đà Nẵng', longitude: 108.21, south: S },
    { name: 'Quảng Nam', longitude: 108.47, south: S },
  ] },
  { name: 'Quảng Ngãi', places: [
    { name: 'Quảng Ngãi', longitude: 108.80, south: S },
    { name: 'Kon Tum', longitude: 108.00, south: S },
  ] },
  { name: 'Gia Lai', places: [
    { name: 'Gia Lai', longitude: 108.00, south: S },
    { name: 'Bình Định', longitude: 109.22, south: S },
  ] },
  { name: 'Khánh Hòa', places: [
    { name: 'Khánh Hòa', longitude: 109.19, south: S },
    { name: 'Ninh Thuận', longitude: 108.99, south: S },
  ] },
  { name: 'Lâm Đồng', places: [
    { name: 'Lâm Đồng', longitude: 108.44, south: S },
    { name: 'Đắk Nông', longitude: 107.69, south: S },
    { name: 'Bình Thuận', longitude: 108.10, south: S },
  ] },
  { name: 'Đắk Lắk', places: [
    { name: 'Đắk Lắk', longitude: 108.05, south: S },
    { name: 'Phú Yên', longitude: 109.30, south: S },
  ] },
  { name: 'TP. Hồ Chí Minh', places: [
    { name: 'TP. Hồ Chí Minh (Sài Gòn)', longitude: 106.70, south: S },
    { name: 'Bình Dương', longitude: 106.65, south: S },
    { name: 'Bà Rịa – Vũng Tàu', longitude: 107.17, south: S },
  ] },
  { name: 'Đồng Nai', places: [
    { name: 'Đồng Nai', longitude: 106.82, south: S },
    { name: 'Bình Phước', longitude: 106.90, south: S },
  ] },
  { name: 'Tây Ninh', places: [
    { name: 'Tây Ninh', longitude: 106.10, south: S },
    { name: 'Long An', longitude: 106.41, south: S },
  ] },
  { name: 'Cần Thơ', places: [
    { name: 'Cần Thơ', longitude: 105.77, south: S },
    { name: 'Sóc Trăng', longitude: 105.97, south: S },
    { name: 'Hậu Giang', longitude: 105.47, south: S },
  ] },
  { name: 'Vĩnh Long', places: [
    { name: 'Vĩnh Long', longitude: 105.97, south: S },
    { name: 'Bến Tre', longitude: 106.38, south: S },
    { name: 'Trà Vinh', longitude: 106.34, south: S },
  ] },
  { name: 'Đồng Tháp', places: [
    { name: 'Đồng Tháp', longitude: 105.63, south: S },
    { name: 'Tiền Giang', longitude: 106.36, south: S },
  ] },
  { name: 'Cà Mau', places: [
    { name: 'Cà Mau', longitude: 105.15, south: S },
    { name: 'Bạc Liêu', longitude: 105.72, south: S },
  ] },
  { name: 'An Giang', places: [
    { name: 'An Giang', longitude: 105.43, south: S },
    { name: 'Kiên Giang', longitude: 105.08, south: S },
    { name: 'Phú Quốc', longitude: 103.97, south: S },
  ] },
];

/** Dạng ProvinceInfo để form dùng chung với danh sách Trung Quốc */
export const VN_PROVINCE_INFOS: ProvinceInfo[] = VN_PROVINCES.map(p => ({
  name: p.name,
  cities: p.places.map(pl => ({ name: pl.name, longitude: pl.longitude })),
}));

export function findVnPlace(province: string, city: string): VnPlace | undefined {
  return VN_PROVINCES.find(p => p.name === province)?.places.find(pl => pl.name === city);
}

const ymd = (y: number, m: number, d: number) => y * 10000 + m * 100 + d;

/**
 * Múi giờ chuẩn (phút, đông dương) của đồng hồ tại Việt Nam vào ngày sinh.
 * south = undefined khi chưa chọn nơi sinh: chỉ áp dụng các mốc chung toàn quốc.
 */
export function vnUtcOffsetMinutes(year: number, month: number, day: number, south?: boolean): number {
  const t = ymd(year, month, day);
  if (t >= ymd(1975, 6, 13)) return 420;
  if (t >= ymd(1943, 1, 1) && t < ymd(1945, 3, 15)) return 480;
  if (t >= ymd(1945, 3, 15) && t < ymd(1945, 9, 2)) return 540;
  if (south) {
    if (t >= ymd(1947, 4, 1) && t < ymd(1955, 7, 1)) return 480;
    if (t >= ymd(1960, 1, 1)) return 480;
  }
  return 420;
}

export function formatUtcOffset(minutes: number): string {
  const sign = minutes >= 0 ? '+' : '−';
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}

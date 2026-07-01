import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const TOUR_API_KEY = process.env.TOUR_API_KEY;
const BASE_URL = 'https://apis.data.go.kr/B551011/KorService2/detailCommon2';
const INTRO_URL = 'https://apis.data.go.kr/B551011/KorService2/detailIntro2';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetry = async (url, params, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const { data } = await axios.get(url, { params });
      const raw = data?.response?.body?.items?.item ?? null;
      if (!raw) return null;
      return Array.isArray(raw) ? raw[0] : raw;
    } catch (err) {
      if (err.response?.status === 429) {
        const wait = 2000 * (i + 1);
        console.log(`[RATE LIMIT] 재시도 ${i + 1}/${retries} (${wait}ms 대기)`);
        await sleep(wait);
      } else {
        throw err;
      }
    }
  }
  throw new Error('최대 재시도 횟수 초과');
};

const fetchSpotDetail = (contentId) =>
  fetchWithRetry(BASE_URL, {
    serviceKey: TOUR_API_KEY,
    contentId,
    MobileOS: 'ETC',
    MobileApp: 'Hisspot',
    _type: 'json',
    numOfRows: 1,
    pageNo: 1,
    defaultYN: 'Y',
    firstImageYN: 'Y',
    addrinfoYN: 'Y',
    mapinfoYN: 'Y',
    overviewYN: 'N',
  });

const fetchSpotIntro = (contentId) =>
  fetchWithRetry(INTRO_URL, {
    serviceKey: TOUR_API_KEY,
    contentId,
    contentTypeId: 12,
    MobileOS: 'ETC',
    MobileApp: 'Hisspot',
    _type: 'json',
    numOfRows: 1,
    pageNo: 1,
  });

const main = async () => {
  await prisma.spot.update({ where: { id: 140 }, data: { contentId: '128871' } });
  await prisma.spot.update({ where: { id: 183 }, data: { contentId: '2765510' } });

  const spots = await prisma.spot.findMany({
    where: { contentId: { not: null }, address: null },
  });

  console.log(`총 ${spots.length}개 spot 업데이트 시작 (이미 채워진 항목 제외)`);

  for (const spot of spots) {
    try {
      const detail = await fetchSpotDetail(spot.contentId);
      await sleep(500);
      const intro = await fetchSpotIntro(spot.contentId);
      await sleep(500);

      if (!detail && !intro) {
        console.log(`[SKIP] spotId=${spot.id} contentId=${spot.contentId} - 데이터 없음`);
        continue;
      }

      const data = {};
      if (detail) {
        data.address = detail.addr1 || null;
        data.latitude = detail.mapy ? parseFloat(detail.mapy) : null;
        data.longitude = detail.mapx ? parseFloat(detail.mapx) : null;
        data.imageUrl = detail.firstimage || detail.firstimage2 || null;
      }
      if (intro) {
        data.openingHours = intro.usetime || null;
        data.closedDays = intro.restdate || null;
      }

      await prisma.spot.update({ where: { id: spot.id }, data });

      console.log(`[OK] spotId=${spot.id} "${spot.name}"${!detail ? ' (detail 실패, intro만 반영)' : ''}${!intro ? ' (intro 실패, detail만 반영)' : ''}`);
    } catch (err) {
      console.error(`[ERROR] spotId=${spot.id}:`, err.message);
    }
  }

  console.log('완료');
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

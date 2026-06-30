import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const TOUR_API_KEY = process.env.TOUR_API_KEY;
const BASE_URL = 'https://apis.data.go.kr/B551011/KorService2/detailCommon2';
const INTRO_URL = 'https://apis.data.go.kr/B551011/KorService2/detailIntro2';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchSpotDetail = async (contentId) => {
  const { data } = await axios.get(BASE_URL, {
    params: {
      serviceKey: TOUR_API_KEY,
      contentId,
      MobileOS: 'ETC',
      MobileApp: 'Hisspot',
      _type: 'json',
      numOfRows: 1,
      pageNo: 1,
    },
  });
  const raw = data?.response?.body?.items?.item ?? null;
  if (!raw) return null;
  return Array.isArray(raw) ? raw[0] : raw;
};


const fetchSpotIntro = async (contentId) => {
  const { data } = await axios.get(INTRO_URL, {
    params: {
      serviceKey: TOUR_API_KEY,
      contentId,
      contentTypeId: 12,
      MobileOS: 'ETC',
      MobileApp: 'Hisspot',
      _type: 'json',
      numOfRows: 1,
      pageNo: 1,
    },
  });
  const raw = data?.response?.body?.items?.item ?? null;
  if (!raw) return null;
  return Array.isArray(raw) ? raw[0] : raw;
};

const main = async () => {
  await prisma.spot.update({ where: { id: 140 }, data: { contentId: '128871' } });
  await prisma.spot.update({ where: { id: 183 }, data: { contentId: '2765510' } });

  const spots = await prisma.spot.findMany({
    where: { contentId: { not: null } },
  });

  console.log(`총 ${spots.length}개 spot 업데이트 시작`);

  for (const spot of spots) {
    try {
      const [detail, intro] = await Promise.all([
        fetchSpotDetail(spot.contentId),
        fetchSpotIntro(spot.contentId),
      ]);

      if (!detail && !intro) {
        console.log(`[SKIP] spotId=${spot.id} contentId=${spot.contentId} - 데이터 없음`);
        continue;
      }

      await prisma.spot.update({
        where: { id: spot.id },
        data: {
          address: detail?.addr1 || null,
          latitude: detail?.mapy ? parseFloat(detail.mapy) : null,
          longitude: detail?.mapx ? parseFloat(detail.mapx) : null,
          imageUrl: detail?.firstimage || detail?.firstimage2 || null,
          openingHours: intro?.usetime || null,
          closedDays: intro?.restdate || null,
        },
      });

      console.log(`[OK] spotId=${spot.id} "${spot.name}"`);
      await sleep(200);
    } catch (err) {
      console.error(`[ERROR] spotId=${spot.id}:`, err.message);
    }
  }

  console.log('완료');
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

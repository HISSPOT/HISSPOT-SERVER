import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // 1. Kings
  const sejong = await prisma.king.upsert({
    where: { id: 4 },
    update: {},
    create: {
      id: 4,
      name: '세종',
      orderNumber: 4,
      shortDescription: '한글을 창제한 조선의 4대 왕',
      description: '조선의 제4대 국왕으로, 훈민정음을 창제하고 과학기술을 발전시켰다.',
      imageUrl: null,
    },
  });

  const taejo = await prisma.king.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: '태조',
      orderNumber: 1,
      shortDescription: '조선을 건국한 초대 왕',
      description: '고려를 무너뜨리고 조선을 건국한 초대 국왕이다.',
      imageUrl: null,
    },
  });

  // 2. KingTags
  await prisma.kingTag.createMany({
    data: [
      { kingId: 4, tag: '훈민정음' },
      { kingId: 4, tag: '과학발전' },
      { kingId: 1, tag: '조선건국' },
      { kingId: 1, tag: '한양천도' },
    ],
    skipDuplicates: true,
  });

  // 3. Spots (API로 채워질 필드는 null로)
  const spot1 = await prisma.spot.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      contentId: '264337',
      name: '경복궁',
      areaCode: 1,
      sigunguCode: 23,
      description: '조선의 법궁',
    },
  });

  const spot2 = await prisma.spot.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      contentId: '126508',
      name: '세종대왕 기념관',
      areaCode: 1,
      sigunguCode: 20,
      description: '세종대왕의 업적을 기리는 기념관',
    },
  });

  const spot3 = await prisma.spot.upsert({
    where: { id: 3 },
    update: {},
    create: {
      id: 3,
      contentId: '264336',
      name: '흥인지문',
      areaCode: 1,
      sigunguCode: 23,
      description: '조선시대 서울 동쪽 성문',
    },
  });

  // 4. KingSpots (왕 수집 장소)
  await prisma.kingSpot.createMany({
    data: [
      { kingId: 4, spotId: 2 }, // 세종 → 세종대왕 기념관
      { kingId: 1, spotId: 1 }, // 태조 → 경복궁
    ],
    skipDuplicates: true,
  });

  // 5. Routes
  const route1 = await prisma.route.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      kingId: 4,
      name: '세종 루트 1',
      tag: '도보 추천',
      estimatedMinutes: 190,
    },
  });

  // 6. RouteSpots
  await prisma.routeSpot.createMany({
    data: [
      { routeId: 1, spotId: 3, orderNumber: 1 }, // 흥인지문
      { routeId: 1, spotId: 2, orderNumber: 2 }, // 세종대왕 기념관
      { routeId: 1, spotId: 1, orderNumber: 3 }, // 경복궁
    ],
    skipDuplicates: true,
  });

  console.log('✅ 시드 데이터 삽입 완료!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

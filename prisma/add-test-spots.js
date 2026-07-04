import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NEW_SPOTS = [
  {
    kingId: 3,
    name: '왕십리문화공원',
    address: '서울 성동구 왕십리로 310',
    latitude: 37.5617309,
    longitude: 127.0352696,
  },
  {
    kingId: 10,
    name: '포레스타호텔',
    address: '서울 성동구 무학로2길 51',
    latitude: 37.5624075,
    longitude: 127.0352647,
  },
];

const main = async () => {
  for (const { kingId, name, address, latitude, longitude } of NEW_SPOTS) {
    const spot = await prisma.spot.create({ data: { name, address, latitude, longitude } });
    await prisma.kingSpot.create({ data: { kingId, spotId: spot.id } });
    console.log(`[OK] kingId=${kingId} -> spotId=${spot.id} "${name}"`);
  }
  console.log('완료');
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NEW_SPOTS = [
  {
    kingId: 7,
    name: '헤르츠카페',
    address: '285 Wangsimni-ro, Seongdong-gu, Seoul, South Korea',
    latitude: 37.5597846,
    longitude: 127.0363105,
  },
];

const main = async () => {
  for (const { kingId, name, address, latitude, longitude } of NEW_SPOTS) {
    const existing = await prisma.kingSpot.findFirst({ where: { kingId, spot: { name } } });
    if (existing) {
      console.log(`[SKIP] kingId=${kingId} "${name}" 이미 존재함 (spotId=${existing.spotId})`);
      continue;
    }
    const spot = await prisma.spot.create({ data: { name, address, latitude, longitude } });
    await prisma.kingSpot.create({ data: { kingId, spotId: spot.id } });
    console.log(`[OK] kingId=${kingId} -> spotId=${spot.id} "${name}"`);
  }
  console.log('완료');
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

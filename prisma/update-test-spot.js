import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SPOT_ID = 207;
const DATA = {
  address: '285 Wangsimni-ro, Seongdong-gu, Seoul, South Korea',
  latitude: 37.5597846,
  longitude: 127.0363105,
};

const main = async () => {
  const spot = await prisma.spot.update({ where: { id: SPOT_ID }, data: DATA });
  console.log(`[OK] spotId=${spot.id} "${spot.name}" 좌표 수정 완료`, { latitude: spot.latitude, longitude: spot.longitude });
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

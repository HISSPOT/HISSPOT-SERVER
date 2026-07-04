import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const NEW_SPOTS = [
  {
    kingId: 7,
    name: '헤르츠카페',
    address: 'Wangsimni, Seoul',
    latitude: 37.568832,
    longitude: 127.0252724,
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

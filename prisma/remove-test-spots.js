import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const TEST_SPOT_IDS = [205, 206];

const main = async () => {
  const kingSpotResult = await prisma.kingSpot.deleteMany({ where: { spotId: { in: TEST_SPOT_IDS } } });
  const spotResult = await prisma.spot.deleteMany({ where: { id: { in: TEST_SPOT_IDS } } });
  console.log(`[OK] KingSpot ${kingSpotResult.count}건, Spot ${spotResult.count}건 삭제`);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

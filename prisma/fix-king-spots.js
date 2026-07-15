import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KING_SPOT_MAP = {
  1: 1,
  2: 8,
  3: 14,
  4: 21,
  5: 28,
  6: 35,
  7: 42,
  8: 49,
  9: 56,
  10: 63,
  11: 70,
  12: 77,
  13: 84,
  14: 10,
  15: 91,
  16: 92,
  17: 93,
  18: 58,
  19: 94,
  20: 95,
  21: 96,
  22: 97,
  23: 98,
  24: 99,
  25: 100,
  26: 101,
  27: 102,
};

const main = async () => {
  for (const [kingIdStr, spotId] of Object.entries(KING_SPOT_MAP)) {
    const kingId = Number(kingIdStr);
    await prisma.$transaction([
      prisma.kingSpot.deleteMany({ where: { kingId } }),
      prisma.kingSpot.create({ data: { kingId, spotId } }),
    ]);
    console.log(`[OK] kingId=${kingId} -> spotId=${spotId}`);
  }
  console.log('완료');
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

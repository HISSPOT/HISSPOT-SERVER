import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const KING_SPOT_MAP = {
  1: 1,
  2: 8,
  3: 15,
  4: 22,
  5: 29,
  6: 36,
  7: 43,
  8: 50,
  9: 57,
  10: 64,
  11: 71,
  12: 78,
  13: 85,
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

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  await prisma.$executeRawUnsafe(`SELECT setval('spots_id_seq', (SELECT MAX(id) FROM spots))`);
  const result = await prisma.$queryRawUnsafe(`SELECT last_value FROM spots_id_seq`);
  console.log('spots_id_seq now:', result);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

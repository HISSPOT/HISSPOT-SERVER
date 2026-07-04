import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const users = await prisma.user.findMany({
    select: { id: true, nickname: true, kakaoId: true, isOnboarded: true, createdAt: true },
    orderBy: { createdAt: 'asc' },
  });
  console.table(users);
  console.log(`총 ${users.length}명`);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

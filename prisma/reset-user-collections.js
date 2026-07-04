import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const nickname = process.argv[2];

const main = async () => {
  if (!nickname) {
    console.log('사용법: node prisma/reset-user-collections.js <nickname>');
    return;
  }

  const user = await prisma.user.findUnique({ where: { nickname } });
  if (!user) {
    console.log(`[SKIP] nickname="${nickname}" 유저를 찾을 수 없습니다.`);
    return;
  }

  const result = await prisma.userCollection.deleteMany({ where: { userId: user.id } });
  console.log(`[OK] user="${nickname}"(${user.id}) 수집 기록 전체 삭제: ${result.count}건`);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

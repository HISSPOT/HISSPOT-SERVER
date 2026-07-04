import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const nickname = process.argv[2];

const main = async () => {
  if (!nickname) {
    console.log('사용법: node prisma/delete-user.js <nickname>');
    return;
  }

  const user = await prisma.user.findUnique({ where: { nickname } });
  if (!user) {
    console.log(`[SKIP] nickname="${nickname}" 유저를 찾을 수 없습니다.`);
    return;
  }

  const [collections, routes] = await Promise.all([
    prisma.userCollection.deleteMany({ where: { userId: user.id } }),
    prisma.userRoute.deleteMany({ where: { userId: user.id } }),
  ]);
  await prisma.user.delete({ where: { id: user.id } });

  console.log(`[OK] user="${nickname}"(${user.id}) 삭제 완료 (수집기록 ${collections.count}건, 저장루트 ${routes.count}건 함께 삭제)`);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

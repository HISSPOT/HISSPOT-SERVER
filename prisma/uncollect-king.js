import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const nickname = process.argv[2];
const kingId = Number(process.argv[3]);

const main = async () => {
  if (!nickname || !kingId) {
    console.log('사용법: node prisma/uncollect-king.js <nickname> <kingId>');
    return;
  }

  const user = await prisma.user.findUnique({ where: { nickname } });
  if (!user) {
    console.log(`[SKIP] nickname="${nickname}" 유저를 찾을 수 없습니다.`);
    return;
  }

  const result = await prisma.userCollection.deleteMany({ where: { userId: user.id, kingId } });
  console.log(`[OK] user="${nickname}"(${user.id}) kingId=${kingId} 수집 기록 삭제: ${result.count}건`);
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

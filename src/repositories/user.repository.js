import prisma from '../config/prisma.js';

export const findUserById = (id) =>
  prisma.user.findUnique({ where: { id } });

export const findUserByKakaoId = (kakaoId) =>
  prisma.user.findUnique({ where: { kakaoId } });

export const findUserByNickname = (nickname) =>
  prisma.user.findUnique({ where: { nickname } });

export const createUser = (data) =>
  prisma.user.create({ data });

export const updateUser = (id, data) => {
  const filtered = Object.fromEntries(Object.entries(data).filter(([, v]) => v !== undefined));
  return prisma.user.update({ where: { id }, data: filtered });
};

export const deleteUser = (id) =>
  prisma.$transaction([
    prisma.userCollection.deleteMany({ where: { userId: id } }),
    prisma.userRoute.deleteMany({ where: { userId: id } }),
    prisma.user.delete({ where: { id } }),
  ]);

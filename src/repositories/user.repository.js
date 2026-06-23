import prisma from '../config/prisma.js';

export const findUserByEmail = (email) =>
  prisma.user.findUnique({ where: { email } });

export const findUserById = (id) =>
  prisma.user.findUnique({ where: { id } });

export const createUser = (data) =>
  prisma.user.create({ data });

export const updateUser = (id, data) =>
  prisma.user.update({ where: { id }, data });

export const deleteUser = (id) =>
  prisma.user.delete({ where: { id } });

export const updateRefreshToken = (id, refreshToken) =>
  prisma.user.update({ where: { id }, data: { refreshToken } });

export const clearRefreshToken = (id) =>
  prisma.user.update({ where: { id }, data: { refreshToken: null } });

import { User } from '@prisma/client';
import { userInfo } from 'os';
import { IUser } from '../interfaces/IUser';
import prismaContext from '../lib/prisma/prismaContext';

export const createUser = async (userInput: IUser): Promise<User> => {
  return prismaContext.prisma.user.create({
    data: userInput,
  });
};

export const deleteUser = async (id: string): Promise<User | string | null> => {
  const user = await prismaContext.prisma.user.delete({
    where: {
      id: id,
    },
  });
  if (user == null) return 'User not found';
  return user;
};

export const updateUser = async (
  id: string,
  userInput: IUser
): Promise<User | string | null> => {
  const user = await prismaContext.prisma.user.update({
    where: {
      id: id,
    },
    data: userInput,
  });

  if (user == null) return 'User not found';
  return user;
};

export const getUser = async (id: string): Promise<any> => {
  const user = await prismaContext.prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      password: false,
      address: true,
      streetNumber: true,
      city: true,
      country: true,
      phoneNumber: true,
      sponsorshipCode: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      id: id,
    },
  });

  if (user == null) return 'User not found';
  return user;
};

export const getUserByEmail = async (email: string): Promise<any> => {
  const user = await prismaContext.prisma.user.findUnique({
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      password: true,
      address: true,
      streetNumber: true,
      city: true,
      country: true,
      phoneNumber: true,
      sponsorshipCode: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      email: email,
    },
  });

  return user;
};
export const getUsersByRole = async (roleId: string): Promise<any> => {
  const users = await prismaContext.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      password: false,
      address: true,
      streetNumber: true,
      city: true,
      country: true,
      phoneNumber: true,
      sponsorshipCode: true,
      createdAt: true,
      updatedAt: true,
    },
    where: {
      roleId: roleId,
    },
  });
  return users;
};

export const getAllUsers = async (): Promise<any> => {
  const users = await prismaContext.prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      roleId: true,
      password: false,
      address: true,
      streetNumber: true,
      city: true,
      country: true,
      phoneNumber: true,
      sponsorshipCode: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
};

export const getFewUsers = async (
  take: number,
  skip: number
): Promise<User[]> => {
  const users = await prismaContext.prisma.user.findMany({
    take: take,
    skip: skip,
  });
  return users;
};

// export const editUser = async (
//   id: string,
//   userInput: IUser
// ): Promise<User | string | null> => {
//   const user = await prismaContext.prisma.user.update({
//     where: {
//       id: id,
//     },
//     data: userInput,
//   });
//   if (user == null) return 'User not found';
//   return user;
// };

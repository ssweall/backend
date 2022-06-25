import { Role } from '@prisma/client';
import { IRole } from '../interfaces/IRole';
import prismaContext from '../lib/prisma/prismaContext';

export const createRole = async (userInput: IRole): Promise<Role> => {
  return prismaContext.prisma.role.create({
    data: userInput,
  });
};

export const getAllRoles = async (): Promise<Role[]> => {
  const roles = await prismaContext.prisma.role.findMany();
  return roles;
};

export const getFewRoles = async (
  take: number,
  skip: number
): Promise<Role[]> => {
  const roles = await prismaContext.prisma.role.findMany({
    take: take,
    skip: skip,
  });
  return roles;
};

export const getRole = async (id: string): Promise<Role | null> => {
  const role = await prismaContext.prisma.role.findUnique({
    where: {
      id: id,
    },
  });
  // if (role == null) return 'Role not found';
  return role;
};

export const deleteRole = async (id: string): Promise<Role | string | null> => {
  const role = await prismaContext.prisma.role.delete({
    where: {
      id: id,
    },
  });
  if (role == null) return 'Role not found';
  return role;
};

export const updateRole = async (
  id: string,
  userInput: IRole
): Promise<Role | string | null> => {
  const role = await prismaContext.prisma.role.update({
    where: {
      id: id,
    },
    data: userInput,
  });

  if (role == null) return 'Role not found';
  return role;
};

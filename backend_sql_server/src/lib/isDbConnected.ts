import prismaClient from './prismaClient';

export const isDbConnected = async (): Promise<boolean> => {
  try {
    await prismaClient.$connect();
  } catch (error) {
    return false;
  }
  return true;
};

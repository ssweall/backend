import { IPrismaContext } from '../interfaces/IPrismaContext';
import prisma from './prismaClient';

const prismaContext: IPrismaContext = {
  prisma,
};

export default prismaContext;

import { Document } from 'mongoose';

type IBook = {
  title: string;
  author: string;
} & Document;
export default IBook;

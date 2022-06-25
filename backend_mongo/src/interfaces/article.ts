import { Document } from 'mongoose';

type IArticle = {
  name: string;
  type: string;
  price: number;
  detail: string;
  picture: string;
} & Document;
export default IArticle;

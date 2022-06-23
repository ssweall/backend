import { Document } from 'mongoose';
import IArticle from './article';

type IMenu = {
  name: string;
  price: number;
  article: [IArticle['_id']];
} & Document;
export default IMenu;

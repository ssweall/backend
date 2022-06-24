import { Document } from 'mongoose';
import IArticle from './article';

type IRestaurant = {
  name: string;
  idRestaurateur: number;
  articles: [IArticle['_id']];
  address: string;
} & Document;
export default IRestaurant;

import { Document } from 'mongoose';
import IIngredient from './ingedient';

type IArticle = {
  name: string;
  type: string;
  price: number;
  ingredients: [IIngredient['_id']];
  calories: number;
  picture: string;
} & Document;
export default IArticle;

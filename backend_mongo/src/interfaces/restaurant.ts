import { Document } from 'mongoose';
import IMenu from './menu';

type IRestaurant = {
  name: string;
  price: number;
  menus: [IMenu['_id']];
} & Document;
export default IRestaurant;

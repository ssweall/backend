import { Document } from 'mongoose';
import IMenu from './menu';

type IRestaurant = {
  name: string;
  idRestaurateur: string;
  menus: [IMenu['_id']];
  address: string;
} & Document;
export default IRestaurant;

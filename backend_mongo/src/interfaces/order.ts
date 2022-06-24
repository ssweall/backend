import { Document } from 'mongoose';
import IRestaurant from './restaurant';
import IMenu from './menu';
import IArticle from './article';

type IOrder = {
  idClient: string;
  idRestaurant: IRestaurant['_id'];
  idLivreur: string;
  menus: [IMenu['_id']];
  articles: [IArticle['_id']];
  activeCodeSponsorship: boolean;
  state: state;
} & Document;
export default IOrder;

//enum of the states of the order
enum state {
  commande = 'commande',
  preparation = 'preparation',
  prepared = 'prepared',
}

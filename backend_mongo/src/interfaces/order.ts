import { Document } from 'mongoose';
import IRestaurant from './restaurant';
import IArticle from './article';

type IOrder = {
  idClient: string;
  idRestaurant: IRestaurant['_id'];
  idLivreur: string;
  articles: [IArticle['_id']];
  activeCodeSponsorship: boolean;
  state: state;
  clientNotified: boolean;
  restaurantNotified: boolean;
  livreurNotified: boolean;
} & Document;
export default IOrder;

//enum of the states of the order
enum state {
  commande = 'commande',
  preparation = 'preparation',
  prepared = 'prepared',
  livraison = 'livraison',
}

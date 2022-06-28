import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IOrder from '../interfaces/order';

const OrderSchema: Schema = new Schema(
  {
    idClient: { type: String, required: true },
    idRestaurant: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Restaurant',
    },
    idLivreur: { type: String, required: false },
    articles: {
      type: [Schema.Types.ObjectId],
      required: false,
      ref: 'Article',
    },
    activeCodeSponsorship: { type: Boolean, required: true },
    state: {
      type: String,
      enum: ['commande', 'preparation', 'livraison', 'prepared'],
      required: true,
    },
    clientNotified: { type: Boolean, default: false },
    restaurantNotified: { type: Boolean, default: false },
    livreurNotified: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

OrderSchema.post<IOrder>('save', function () {
  logging.info('Mongo', 'Checkout the order we just saved: ', this);
});

export default mongoose.model<IOrder>('Order', OrderSchema);

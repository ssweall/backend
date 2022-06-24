import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IOrder from '../interfaces/order';

const OrderSchema: Schema = new Schema(
  {
    idClient: { type: String, required: true },
    idRestaurant: { type: Schema.Types.ObjectId, required: true },
    idLivreur: { type: String, required: false },
    articles: { type: [Schema.Types.ObjectId], required: false },
    activeCodeSponsorship: { type: Boolean, required: true },
    state: {
      type: String,
      enum: ['commande', 'preparation', 'prepared'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.post<IOrder>('save', function () {
  logging.info('Mongo', 'Checkout the rrder we just saved: ', this);
});

export default mongoose.model<IOrder>('Order', OrderSchema);

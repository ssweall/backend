import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IMenu from '../interfaces/menu';

const MenuSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    article: { type: [Schema.Types.ObjectId], required: true },
  },
  {
    timestamps: true,
  }
);

MenuSchema.post<IMenu>('save', function () {
  logging.info('Mongo', 'Checkout the menu we just saved: ', this);
});

export default mongoose.model<IMenu>('Menu', MenuSchema);

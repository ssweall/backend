import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IIngredient from '../interfaces/ingedient';

const IngredientSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

IngredientSchema.post<IIngredient>('save', function () {
  logging.info('Mongo', 'Checkout the ingredient we just saved: ', this);
});

export default mongoose.model<IIngredient>('Ingredient', IngredientSchema);

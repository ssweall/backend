import { Document } from 'mongoose';

type IIngredient = {
  name: string;
} & Document;
export default IIngredient;

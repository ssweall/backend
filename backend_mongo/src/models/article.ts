import mongoose, { Schema } from 'mongoose';
import logging from '../config/logging';
import IArticle from '../interfaces/article';

const ArticleSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    detail: { type: String, required: true },
    picture: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

ArticleSchema.post<IArticle>('save', function () {
  logging.info('Mongo', 'Checkout the article we just saved: ', this);
});

export default mongoose.model<IArticle>('Article', ArticleSchema);

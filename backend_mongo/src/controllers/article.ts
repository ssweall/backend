import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Article from '../models/article';

const createArticle = (req: Request, res: Response, next: NextFunction) => {
  const { name, type, price, ingredient, calories, picture } = req.body;

  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    name,
    type,
    price,
    ingredient,
    calories,
    picture,
  });

  return article
    .save()
    .then(articles => {
      return res.status(201).json({
        article: articles,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllArticles = (req: Request, res: Response, next: NextFunction) => {
  Article.find()
    .exec()
    .then(articles => {
      return res.status(200).json({
        articles: articles,
        count: articles.length,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { createArticle, getAllArticles };

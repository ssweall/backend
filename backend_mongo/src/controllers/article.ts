import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Article from '../models/article';

// const multer = require('multer');
import fs from 'fs';
import path from 'path';

const createArticle = (req: Request, res: Response) => {
  const { name, type, price, detail } = req.body;

  const article = new Article({
    _id: new mongoose.Types.ObjectId(),
    name,
    type,
    price,
    detail,
    picture: {
      data: fs.readFileSync(
        path.join(__dirname + '/uploads/' + req.file.filename)
      ),
      contentType: 'image/png',
    },
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

const getAllArticles = (req: Request, res: Response) => {
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

//find one article
const getOneArticle = (req: Request, res: Response) => {
  Article.findById(req.params.id)
    .exec()
    .then(article => {
      if (!article) {
        return res.status(404).json({
          message: 'Article not found',
        });
      }
      return res.status(200).json({
        article: article,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//update one article
const updateArticle = (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, type, price, detail, picture } = req.body;

  Article.findByIdAndUpdate(id, {
    name,
    type,
    price,
    detail,
    picture,
  })
    .exec()
    .then(article => {
      if (!article) {
        return res.status(404).json({
          message: 'Article not found',
        });
      }
      return res.status(200).json({
        message: "L'article a été mis à jour",
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//delete one article
const deleteArticle = (req: Request, res: Response) => {
  Article.findByIdAndRemove(req.params.id)
    .exec()
    .then(article => {
      if (!article) {
        return res.status(404).json({
          message: 'Article not found',
        });
      }
      return res.status(200).json({
        message: "L'article a été supprimé",
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default {
  createArticle,
  getAllArticles,
  getOneArticle,
  updateArticle,
  deleteArticle,
};

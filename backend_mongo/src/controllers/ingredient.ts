import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Ingredient from '../models/ingredient';

const createIngredient = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;

  const ingredient = new Ingredient({
    _id: new mongoose.Types.ObjectId(),
    name,
  });

  return ingredient
    .save()
    .then(ingredients => {
      return res.status(201).json({
        book: ingredients,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllIngredients = (req: Request, res: Response, next: NextFunction) => {
  Ingredient.find()
    .exec()
    .then(ingredients => {
      return res.status(200).json({
        ingredients: ingredients,
        count: ingredients.length,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { createIngredient, getAllIngredients };

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
        ingredient: ingredients,
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

//get one ingredient
const getOneIngredient = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Ingredient.findById(id)
    .exec()
    .then(ingredient => {
      if (!ingredient) {
        return res.status(404).json({
          message: 'Ingredient not found',
        });
      }
      return res.status(200).json({
        ingredient: ingredient,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//update ingredient
const updateIngredient = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name } = req.body;

  Ingredient.findByIdAndUpdate(id, { name }, { new: true })
    .exec()
    .then(ingredient => {
      if (!ingredient) {
        return res.status(404).json({
          message: 'Ingredient not found',
        });
      }
      return res.status(200).json({
        message: "L'ingredient a été mis à jour",
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//delete ingredient
const deleteIngredient = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Ingredient.findByIdAndRemove(id)
    .exec()
    .then(ingredient => {
      if (!ingredient) {
        return res.status(404).json({
          message: 'Ingredient not found',
        });
      }
      return res.status(200).json({
        message: "L'ingredient a été supprimé",
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
  createIngredient,
  getAllIngredients,
  getOneIngredient,
  updateIngredient,
  deleteIngredient,
};

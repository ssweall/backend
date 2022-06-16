import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Menu from '../models/menu';

const createMenu = (req: Request, res: Response, next: NextFunction) => {
  const { name, price, article } = req.body;

  const menu = new Menu({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
    article,
  });

  return menu
    .save()
    .then(menus => {
      return res.status(201).json({
        menu: menus,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllMenus = (req: Request, res: Response, next: NextFunction) => {
  Menu.find()
    .exec()
    .then(menus => {
      return res.status(200).json({
        menus: menus,
        count: menus.length,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { createMenu, getAllMenus };

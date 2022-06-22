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

//get one menu
const getOneMenu = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  Menu.findById(id)
    .exec()
    .then(menu => {
      if (!menu) {
        return res.status(404).json({
          message: 'Menu not found',
        });
      }
      return res.status(200).json({
        menu: menu,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//update one menu
const updateMenu = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const { name, price, article } = req.body;

  Menu.findByIdAndUpdate(id, {
    name,
    price,
    article,
  })
    .exec()
    .then(menu => {
      if (!menu) {
        return res.status(404).json({
          message: 'Menu not found',
        });
      }
      return res.status(200).json({
        message: 'Le menu a été mis à jour',
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//delete one menu
const deleteMenu = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Menu.findByIdAndRemove(id)
    .exec()
    .then(menu => {
      if (!menu) {
        return res.status(404).json({
          message: 'Menu not found',
        });
      }
      return res.status(200).json({
        message: 'Le menu a été supprimé',
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

export default { createMenu, getAllMenus, getOneMenu, updateMenu, deleteMenu };

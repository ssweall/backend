import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const {
    idClient,
    idRestaurant,
    idLivreur,
    menus,
    articles,
    activeCodeSponsorship,
    state,
  } = req.body;

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    idClient,
    idRestaurant,
    idLivreur,
    menus,
    articles,
    activeCodeSponsorship,
    state,
  });

  return order
    .save()
    .then(orders => {
      return res.status(201).json({
        order: orders,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const getAllOrders = (req: Request, res: Response, next: NextFunction) => {
  Order.find()
    .exec()
    .then(orders => {
      return res.status(200).json({
        orders: orders,
        count: orders.length,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

const findOneOrder = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  Order.findById(id)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }
      return res.status(200).json({
        order: order,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//update one order
const updateOrder = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const {
    idClient,
    idRestaurant,
    idLivreur,
    menus,
    articles,
    activeCodeSponsorship,
    state,
  } = req.body;

  Order.findByIdAndUpdate(id, {
    idClient,
    idRestaurant,
    idLivreur,
    menus,
    articles,
    activeCodeSponsorship,
    state,
  })
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }
      return res.status(200).json({
        order: order,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: error.message,
        error,
      });
    });
};

//delete one order
const deleteOrder = (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;

  Order.findByIdAndRemove(id)
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Order not found',
        });
      }
      return res.status(200).json({
        message: 'La commande a été supprimée',
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
  createOrder,
  getAllOrders,
  findOneOrder,
  updateOrder,
  deleteOrder,
};

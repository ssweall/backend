import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const {
    idClient,
    idRestaurateur,
    idLivreur,
    menus,
    articles,
    activeCodeSponsorship /*, state*/,
  } = req.body;

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    idClient,
    idRestaurateur,
    idLivreur,
    menus,
    articles,
    activeCodeSponsorship,
    //state,
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

export default { createOrder, getAllOrders };

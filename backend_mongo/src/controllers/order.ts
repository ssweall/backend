import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order';

const createOrder = (req: Request, res: Response) => {
  const {
    idClient,
    idRestaurant,
    idLivreur,
    articles,
    activeCodeSponsorship,
    state,
  } = req.body;

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    idClient,
    idRestaurant,
    idLivreur,
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

const getAllOrders = (req: Request, res: Response) => {
  Order.find()    .populate('idRestaurant')
  .populate('articles')
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

const findAllOrderByClient = (req: Request, res: Response) => {
  const { id } = req.params;

  Order.find({ idClient: id })
    .populate('idRestaurant')
    .populate('articles')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Commandes non trouvées',
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

const findAllOrdersByLivreur = (req: Request, res: Response) => {
  const { id } = req.params;

  Order.find({ idLivreur: id })
    .populate('idRestaurant')
    .populate('articles')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Commandes non trouvées',
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

const findAllOrdersByStatus = (req: Request, res: Response) => {
  const { status } = req.params;

  Order.find({ state: status })
    .populate('idRestaurant')
    .populate('articles')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Commandes non trouvées',
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

const findAllOrdersByRestaurant = (req: Request, res: Response) => {
  const { id } = req.params;
  Order.find({ idRestaurant: id })
    .populate('idRestaurant')
    .populate('articles')
    .exec()
    .then(order => {
      if (!order) {
        return res.status(404).json({
          message: 'Commandes non trouvées',
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

const findOneOrder = (req: Request, res: Response) => {
  const { id } = req.params;

  Order.findById(id)    .populate('idRestaurant')
  .populate('articles')
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
const updateOrder = (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    idClient,
    idRestaurant,
    idLivreur,
    articles,
    activeCodeSponsorship,
    state,
    clientNotified,
    restaurantNotified,
    livreurNotified,
  } = req.body;

  Order.findByIdAndUpdate(id, {
    idClient,
    idRestaurant,
    idLivreur,
    articles,
    activeCodeSponsorship,
    state,
    clientNotified,
    restaurantNotified,
    livreurNotified,
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
const deleteOrder = (req: Request, res: Response) => {
  const id = req.params.id;

  Order.findByIdAndRemove(id)    .populate('idRestaurant')
  .populate('articles')
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
  findAllOrderByClient,
  findAllOrdersByRestaurant,
  findAllOrdersByLivreur,
  findAllOrdersByStatus,
};

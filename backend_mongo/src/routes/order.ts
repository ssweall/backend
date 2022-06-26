import express from 'express';
import controller from '../controllers/order';

const router = express.Router();

router.post('/create', controller.createOrder);
router.get('/', controller.getAllOrders);
router.get('/:id', controller.findOneOrder);
router.get('/client/:id', controller.findAllOrderByClient);
router.get('/livreur/:id', controller.findAllOrdersByLivreur);
router.get('/restaurant/:id', controller.findAllOrdersByRestaurant);
router.get('/status/:status', controller.findAllOrdersByStatus);
router.put('/:id', controller.updateOrder);
router.delete('/:id', controller.deleteOrder);

export = router;

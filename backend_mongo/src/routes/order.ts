import express from 'express';
import controller from '../controllers/order';

const router = express.Router();

router.post('/create', controller.createOrder);
router.get('/', controller.getAllOrders);
router.get('/:id', controller.findOneOrder);
router.put('/:id', controller.updateOrder);
router.delete('/:id', controller.deleteOrder);

export = router;

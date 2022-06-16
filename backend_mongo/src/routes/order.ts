import express from 'express';
import controller from '../controllers/order';

const router = express.Router();

router.post('/create', controller.createOrder);
router.get('/get', controller.getAllOrders);

export = router;

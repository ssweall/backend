import express from 'express';
import controller from '../controllers/order';

const router = express.Router();

router.post('/create', controller.createOrder);
router.get('/getall', controller.getAllOrders);
router.get('/getone/:id', controller.findOneOrder);
router.post('/update/:id', controller.updateOrder);
router.post('/delete/:id', controller.deleteOrder);

export = router;

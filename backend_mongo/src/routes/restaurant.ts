import express from 'express';
import controller from '../controllers/restaurant';

const router = express.Router();

router.post('/create', controller.createRestaurant);
router.get('/', controller.getAllRestaurants);
router.get('/:id', controller.getOneRestaurant);
router.put('/:id', controller.updateRestaurant);
router.delete('/:id', controller.deleteRestaurant);

export = router;

import express from 'express';
import controller from '../controllers/restaurant';

const router = express.Router();

router.post('/create', controller.createRestaurant);
router.get('/get', controller.getAllRestaurants);

export = router;

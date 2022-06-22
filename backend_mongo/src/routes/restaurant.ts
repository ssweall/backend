import express from 'express';
import controller from '../controllers/restaurant';

const router = express.Router();

router.post('/create', controller.createRestaurant);
router.get('/getall', controller.getAllRestaurants);
router.get('/getone/:id', controller.getOneRestaurant);
router.post('/update/:id', controller.updateRestaurant);
router.post('/delete/:id', controller.deleteRestaurant);

export = router;

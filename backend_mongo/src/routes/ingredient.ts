import express from 'express';
import controller from '../controllers/ingredient';

const router = express.Router();

router.post('/create', controller.createIngredient);
router.get('/get', controller.getAllIngredients);

export = router;

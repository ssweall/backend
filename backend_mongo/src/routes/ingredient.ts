import express from 'express';
import controller from '../controllers/ingredient';

const router = express.Router();

router.post('/create', controller.createIngredient);
router.get('/', controller.getAllIngredients);
router.get('/:id', controller.getOneIngredient);
router.put('/:id', controller.updateIngredient);
router.delete('/:id', controller.deleteIngredient);

export = router;

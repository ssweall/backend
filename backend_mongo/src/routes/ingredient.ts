import express from 'express';
import controller from '../controllers/ingredient';

const router = express.Router();

router.post('/create', controller.createIngredient);
router.get('/getall', controller.getAllIngredients);
router.get('/getone/:id', controller.getOneIngredient);
router.post('/update/:id', controller.updateIngredient);
router.post('/delete/:id', controller.deleteIngredient);

export = router;

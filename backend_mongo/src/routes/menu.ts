import express from 'express';
import controller from '../controllers/menu';

const router = express.Router();

router.post('/create', controller.createMenu);
router.get('/', controller.getAllMenus);
router.get('/:id', controller.getOneMenu);
router.put('/:id', controller.updateMenu);
router.delete('/:id', controller.deleteMenu);

export = router;

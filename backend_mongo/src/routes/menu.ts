import express from 'express';
import controller from '../controllers/menu';

const router = express.Router();

router.post('/create', controller.createMenu);
router.get('/getall', controller.getAllMenus);
router.get('/getone/:id', controller.getOneMenu);
router.post('/update/:id', controller.updateMenu);
router.post('/delete/:id', controller.deleteMenu);

export = router;

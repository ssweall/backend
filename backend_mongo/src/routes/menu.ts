import express from 'express';
import controller from '../controllers/menu';

const router = express.Router();

router.post('/create', controller.createMenu);
router.get('/get', controller.getAllMenus);

export = router;

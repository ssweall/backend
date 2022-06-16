import express from 'express';
import controller from '../controllers/article';

const router = express.Router();

router.post('/create', controller.createArticle);
router.get('/get', controller.getAllArticles);

export = router;

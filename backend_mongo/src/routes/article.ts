import express from 'express';
import controller from '../controllers/article';

const router = express.Router();

router.post('/create', controller.createArticle);
router.get('/getall', controller.getAllArticles);
router.get('/getone/:id', controller.getOneArticle);
router.post('/update/:id', controller.updateArticle);
router.post('/delete/:id', controller.deleteArticle);

export = router;

import express from 'express';
import controller from '../controllers/article';

const router = express.Router();
import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });
router.post('/create', upload.single('image'), controller.createArticle);
router.get('/', controller.getAllArticles);
router.get('/:id', controller.getOneArticle);
router.put('/:id', controller.updateArticle);
router.delete('/:id', controller.deleteArticle);

export = router;

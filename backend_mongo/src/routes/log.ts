import express from 'express';
import controller from '../controllers/log';

const router = express.Router();

router.post('/create', controller.createLog);
router.get('/', controller.getAllLogs);
router.get('/:id', controller.getOneLog);
router.delete('/:id', controller.deleteLog);

export = router;

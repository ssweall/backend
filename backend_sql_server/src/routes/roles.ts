import * as express from 'express';
import { createRole, getAllRoles } from '../controllers/RoleController';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const roles = await getAllRoles();
  res.json(roles);
});

router.post('/create', async (req, res, next) => {
  const userInput = req.body;
  const user = await createRole(userInput);
  res.json(user);
});

module.exports = router;

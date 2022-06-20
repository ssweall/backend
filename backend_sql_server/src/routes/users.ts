import * as express from 'express';
import {
  createUser,
  getAllUsers,
  getFewUsers,
  getUser,
} from '../controllers/UserController';
import { IUser } from '../interfaces/IUser';

const router = express.Router();

router.get('/', async (req, res, next) => {
  const user = await getAllUsers();
  res.json(user);
});

router.post('/create', async (req, res, next) => {
  try {
    const userInput: IUser = req.body;
    const user = await createUser(userInput);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//get only 10 users
router.get('/:nbr/:skip', async (req, res, next) => {
  try {
    const user = await getFewUsers(
      parseInt(req.params.nbr),
      parseInt(req.params.skip)
    );
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

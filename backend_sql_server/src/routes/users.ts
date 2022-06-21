import * as express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getFewUsers,
  getUser,
  updateUser,
} from '../controllers/UserController';
import { IUser } from '../interfaces/IUser';
import { authenticateJWT } from '../lib/helper/auth';

const router = express.Router();

router.get('/', authenticateJWT, async (req, res, next) => {
  const user = await getAllUsers();
  res.json(user);
});

router.post('/create', authenticateJWT, async (req, res, next) => {
  try {
    const userInput: IUser = req.body;
    const user = await createUser(userInput);
    res.json(user);
  } catch (err: any) {
    console.log(err.meta);

    if (err.meta.field_name == 'User_roleId_fkey (index)')
      res.json("User's role not found");
    else if (err.meta.target == 'User_email_key')
      res.json('User already exists');
    else res.json('Error when creating the user');
  }
});

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

router.put('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const user = await updateUser(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

//get only 10 users
router.get('/:nbr/:skip', authenticateJWT, async (req, res, next) => {
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

router.delete('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);

    res.json(user);
  } catch (err) {
    res.json('User does not exist');
  }
});

module.exports = router;

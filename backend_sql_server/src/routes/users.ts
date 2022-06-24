import * as express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getFewUsers,
  getUser,
  getUserByEmail,
  updateUser,
} from '../controllers/UserController';
import { IUser } from '../interfaces/IUser';
import { authenticateJWT } from '../lib/helper/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { User } from '@prisma/client';

const router = express.Router();

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';


router.get('/', authenticateJWT, async (req, res, next) => {
  const user = await getAllUsers();
  res.json(user);
});

router.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user != null){

      const passwordValidate = await bcrypt.compare(password, user.password)
      if (!passwordValidate){
        res.status(203).json('Invalid password');
      }
      else{

      // generate an access token
      const accessToken = jwt.sign({ email: user.email, name: user.name }, accessTokenSecret, { expiresIn: '20m' });
      const refreshToken = jwt.sign({ email: user.email, name: user.name }, refreshTokenSecret);

      res.json({
          accessToken,
          refreshToken
      });
    }
    }
    else{
      res.status(203).send('User not found');
    }
  }catch(err: any){
    res.json(err)
  }
});


router.post('/create', async (req, res, next) => {
  try {
    const userInput: IUser = req.body;

    userInput.password = await bcrypt.hash(userInput.password, 10)

    const user = await createUser(userInput);
    res.json(user);
  } catch (err: any) {
    console.log(err.meta);

    if (err?.meta?.field_name == 'User_roleId_fkey (index)')
      res.json("User's role not found");
    else if (err?.meta?.target == 'User_email_key')
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

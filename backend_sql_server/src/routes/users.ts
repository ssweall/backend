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
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { getRole } from '../controllers/RoleController';
import { IRole } from '../interfaces/IRole';
const dockerstats = require('dockerstats');

const router = express.Router();

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';

router.get('/', authenticateJWT, async (req, res, next) => {
  const user = await getAllUsers();
  res.json(user);
});

router.get('/getInfo/:id', (req: any, res: any) => {
  const id = req.params.id;
  dockerstats.dockerContainerStats().then((data: any) => {
    console.log(data);
    res.json({
      '- ID: ': data[0].id,
      '- Mem usage: ': data[0].memUsage,
      '- Mem limit: ': data[0].memLimit,
      '- Mem usage %: ': data[0].memPercent,
      '- CPU usage %: ': data[0].cpuPercent,
    });
    console.log('Docker Container Stats:');
    console.log('- ID: ' + data[0].id);
    console.log('- Mem usage: ' + data[0].memUsage);
    console.log('- Mem limit: ' + data[0].memLimit);
    console.log('- Mem usage %: ' + data[0].memPercent);
    console.log('- CPU usage %: ' + data[0].cpuPercent);
  });
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);
    if (user != null) {
      const passwordValidate = await bcrypt.compare(password, user.password);
      if (!passwordValidate) {
        res.status(203).json('Invalid password');
      } else {
        const role = await getRole(user.roleId);
        // generate an access token
        const accessToken = jwt.sign(
          {
            email: user?.email,
            name: user?.name,
            role: role?.name,
            userId: user?.id,
          },
          accessTokenSecret,
          { expiresIn: '7d' }
        );
        const refreshToken = jwt.sign(
          {
            email: user?.email,
            name: user?.name,
            role: role?.name,
            userId: user?.id,
          },
          refreshTokenSecret
        );

        res.json({
          accessToken,
          refreshToken,
        });
      }
    } else {
      res.status(203).send('User not found');
    }
  } catch (err: any) {
    res.json(err);
  }
});

router.post('/create', async (req, res, next) => {
  try {
    const userInput: IUser = req.body;

    userInput.password = await bcrypt.hash(userInput.password, 10);

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

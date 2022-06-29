import * as express from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getFewUsers,
  getUser,
  getUserByEmail,
  getUsersByRole,
  updateUser,
} from '../controllers/UserController';
import { IUser } from '../interfaces/IUser';
import { authenticateJWT } from '../lib/helper/auth';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '@prisma/client';
import { getAllRoles, getRole } from '../controllers/RoleController';
import { IRole } from '../interfaces/IRole';

const router = express.Router();

const accessTokenSecret = 'youraccesstokensecret';
const refreshTokenSecret = 'yourrefreshtokensecrethere';

router.get('/', authenticateJWT, async (req, res, next) => {
  const user = await getAllUsers();
  res.json(user);
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);

    const { email, password, roleId } = req.body;
    const user = await getUserByEmail(email);

    if (user != null) {
      const passwordValidate = await bcrypt.compare(password, user.password);
      console.log(user.password);
      console.log(passwordValidate);

      if (!passwordValidate) {
        res.status(203).json('Invalid password');
      } else {
        console.log(user);

        const roles = await getAllRoles();
        const roleUser = roles.find(r => r.id === user.roleId);
        if (roleId != undefined) {
          if (roleUser?.name != roleId && roleUser?.id != roleId) {
            res
              .status(203)
              .json("Vous n'avez pas les droits pour vous connecter.");
          } else {
            // generate an access token
            const accessToken = jwt.sign(
              {
                email: user?.email,
                name: user?.name,
                role: roleUser?.name,
                userId: user?.id,
              },
              accessTokenSecret,
              { expiresIn: '1d' }
            );
            const refreshToken = jwt.sign(
              {
                email: user?.email,
                name: user?.name,
                role: roleUser?.name,
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
          const accessToken = jwt.sign(
            {
              email: user?.email,
              name: user?.name,
              role: roleUser?.name,
              userId: user?.id,
            },
            accessTokenSecret,
            { expiresIn: '1d' }
          );
          const refreshToken = jwt.sign(
            {
              email: user?.email,
              name: user?.name,
              role: roleUser?.name,
              userId: user?.id,
            },
            refreshTokenSecret
          );

          res.json({
            accessToken,
            refreshToken,
          });
        }
      }
    } else {
      res.status(203).send('User not found');
    }
  } catch (err: any) {
    console.log(err);

    res.json(err);
  }
});

router.post('/create', async (req, res, next) => {
  console.log(req.body);

  try {
    const userInput: IUser = {
      name: req.body.name,
      email: req.body.email,
      roleId: req.body.roleId,
      password: req.body.password,
      address: req.body?.address,
      streetNumber: req.body?.streetNumber,
      city: req.body?.city,
      country: req.body?.country,
      phoneNumber: req.body?.phoneNumber,
      sponsorshipCode: req.body?.sponsorshipCode,
    };
    console.log(userInput);

    userInput.password = await bcrypt.hash(userInput.password, 10);

    const user = await createUser(userInput);
    res.json(user);
  } catch (err: any) {
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
    var userInput: any = {} as any;
    if (req.body.password != undefined) {
      userInput = {
        name: req.body.name,
        email: req.body.email,
        roleId: req.body.roleId,
        password: await bcrypt.hash(req.body?.password, 10),
        address: req.body?.address,
        streetNumber: req.body?.streetNumber,
        city: req.body?.city,
        country: req.body?.country,
        phoneNumber: req.body?.phoneNumber,
        sponsorshipCode: req.body?.sponsorshipCode,
      };
    } else {
      userInput = {
        name: req.body.name,
        email: req.body.email,
        roleId: req.body.roleId,
        address: req.body?.address,
        streetNumber: req.body?.streetNumber,
        city: req.body?.city,
        country: req.body?.country,
        phoneNumber: req.body?.phoneNumber,
        sponsorshipCode: req.body?.sponsorshipCode,
      };
    }

    const user = await updateUser(req.params.id, userInput);
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

router.get('/get/role/:idRoles', authenticateJWT, async (req, res, next) => {
  try {
    const usersByRole = await getUsersByRole(req.params.idRoles);
    res.json(usersByRole);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

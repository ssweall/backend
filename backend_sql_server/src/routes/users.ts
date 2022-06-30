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

/**
 * @api {get} /users Get all users
 * @apiGroup Users
 * @apiSuccess {Object[]} users Users's list
 * @apiSuccess {String} users.id User id
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.streetNumber User street number
 * @apiSuccess {String} users.address User address
 * @apiSuccess {String} users.city User city
 * @apiSuccess {String} users.phoneNumber User phoneNumber
 * @apiSuccess {String} users.country User country
 * @apiSuccess {String} users.sponsorshipCode User sponsorchipCode
 * @apiSuccess {String} users.roleID User role id
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [    {
        "id": "cl50s2eq3000301pidyd1tw6w",
        "name": "matheo",
        "email": "com@com.com",
        "roleId": "cl4zlhdr2060201r4ht90posu",
        "address": "rue des cheveux",
        "streetNumber": "6",
        "city": "La rochelle",
        "country": "France",
        "phoneNumber": "0666998877",
        "sponsorshipCode": null,
        "createdAt": "2022-06-30T08:41:39.339Z",
        "updatedAt": "2022-06-30T08:41:39.339Z"
    },
  {
        "id": "cl4y8f7qd003201r048lqq7r9",
        "name": "theo",
        "email": "theo@test.com",
        "roleId": "cl4pj9g89000601tfgh82kucg",
        "address": "",
        "streetNumber": "",
        "city": "",
        "country": "",
        "phoneNumber": "",
        "sponsorshipCode": "l@l.l",
        "createdAt": "2022-06-28T13:56:12.133Z",
        "updatedAt": "2022-06-28T13:56:12.133Z"
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/', authenticateJWT, async (req, res, next) => {
  const user = await getAllUsers();
  res.json(user);
});

/**
 * @api {get} /users/login Login a user
 * @apiGroup Users
 * @apiSuccess {String} accessToken Access token for user 
 * @apiSuccess {String} refreshToken Refresh token for user

 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbUBjb20uY29tIiwibmFtZSI6Im1hdGhlbyIsInJvbGUiOiJDb21tZXJjaWFsIiwidXNlcklkIjoiY2w1MHMyZXEzMDAwMzAxcGlkeWQxdHc2dyIsImlhdCI6MTY1NjU3OTA3MywiZXhwIjoxNjU2NjY1NDczfQ.D_XfAvbpVgF5KEwl_hRulTYffeZrYfXgW59rPDXQfpc",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNvbUBjb20uY29tIiwibmFtZSI6Im1hdGhlbyIsInJvbGUiOiJDb21tZXJjaWFsIiwidXNlcklkIjoiY2w1MHMyZXEzMDAwMzAxcGlkeWQxdHc2dyIsImlhdCI6MTY1NjU3OTA3M30.vgZcZ_OUHWwdpVKqGO85VN9NdEXXBcT9obi6NU8croY"
}]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.post('/login', async (req, res) => {
  try {
    const { email, password, roleId } = req.body;
    const user = await getUserByEmail(email);

    if (user != null) {
      const passwordValidate = await bcrypt.compare(password, user.password);

      if (!passwordValidate) {
        res.status(203).json('Invalid password');
      } else {
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
    res.json(err);
  }
});

/**
 * @api {post} /users/create Create a user
 * @apiGroup Users
 * @apiSuccess {Object[]} users Users's list
 * @apiSuccess {String} users.id User id
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.streetNumber User street number
 * @apiSuccess {String} users.address User address
 * @apiSuccess {String} users.city User city
 * @apiSuccess {String} users.phoneNumber User phoneNumber
 * @apiSuccess {String} users.country User country
 * @apiSuccess {String} users.sponsorshipCode User sponsorchipCode
 * @apiSuccess {String} users.roleID User role id
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
    "id": "cl50s2eq3000301pidyd1tw6w",
    "name": "matheo",
    "email": "com@com.com",
    "password": "$2b$10$Gw20MQM.GoGMqjiCkbuBpu.0F6LTmu4qnu2y5Co8HuhFmvDZYwbeS",
    "streetNumber": "6",
    "address": "1 rue des cheveux",
    "city": "La rochelle",
    "phoneNumber": "0666998877",
    "country": "France",
    "sponsorshipCode": null,
    "roleId": "cl4zlhdr2060201r4ht90posu",
    "createdAt": "2022-06-30T08:41:39.339Z",
    "updatedAt": "2022-06-30T08:41:39.339Z"
}]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.post('/create', async (req, res, next) => {
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

    if (req.body?.sponsorshipCode != '') {
      const userRole = await getUserByEmail(userInput.sponsorshipCode);
      if (userRole?.roleId != req.body.roleId) {
        res.send(
          "L'adresse email que vous avez entrée n'appartient pas à un utilisateur de votre role"
        );
      } else {
        userInput.password = await bcrypt.hash(userInput.password, 10);

        const user = await createUser(userInput);
        res.json(user);
      }
    } else {
      userInput.password = await bcrypt.hash(userInput.password, 10);

      const user = await createUser(userInput);
      res.json(user);
    }
  } catch (err: any) {
    if (err?.meta?.field_name == 'User_roleId_fkey (index)')
      res.json("User's role not found");
    else if (err?.meta?.target == 'User_email_key')
      res.json('User already exists');
    else res.json('Error when creating the user');
  }
});
/**
 * @api {get} /users/:id Get one user
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiSuccess {String} users.id User id
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.streetNumber User street number
 * @apiSuccess {String} users.address User address
 * @apiSuccess {String} users.city User city
 * @apiSuccess {String} users.phoneNumber User phoneNumber
 * @apiSuccess {String} users.country User country
 * @apiSuccess {String} users.sponsorshipCode User sponsorchipCode
 * @apiSuccess {String} users.roleID User role id
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
    "id": "cl4y8f7qd003201r048lqq7r9",
    "name": "dsf",
    "email": "jfds.sdf@ds.fds",
    "roleId": "cl4pj9g89000601tfgh82kucg",
    "address": "",
    "streetNumber": "",
    "city": "",
    "country": "",
    "phoneNumber": "",
    "sponsorshipCode": "l@l.l",
    "createdAt": "2022-06-28T13:56:12.133Z",
    "updatedAt": "2022-06-28T13:56:12.133Z"
}]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const user = await getUser(req.params.id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

/**
 * @api {put} /users/:id Update one user
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiParam {String} name User name
 * @apiParam {String} email User email
 * @apiParam {String} streetNumber User street number
 * @apiParam {String} address User address
 * @apiParam {String} city User city
 * @apiParam {String} phoneNumber User phoneNumber
 * @apiParam {String} country User country
 * @apiParam {String} sponsorshipCode User sponsorchipCode
 * @apiParam {String} roleID User role id
 * @apiSuccess {String} users.id User id
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.streetNumber User street number
 * @apiSuccess {String} users.address User address
 * @apiSuccess {String} users.city User city
 * @apiSuccess {String} users.phoneNumber User phoneNumber
 * @apiSuccess {String} users.country User country
 * @apiSuccess {String} users.sponsorshipCode User sponsorchipCode
 * @apiSuccess {String} users.roleID User role id
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
    "id": "cl4y8f7qd003201r048lqq7r9",
    "name": "dsf",
    "email": "jfds.sdf@ds.fds",
    "roleId": "cl4pj9g89000601tfgh82kucg",
    "address": "",
    "streetNumber": "",
    "city": "",
    "country": "",
    "phoneNumber": "",
    "sponsorshipCode": "l@l.l",
    "createdAt": "2022-06-28T13:56:12.133Z",
    "updatedAt": "2022-06-28T13:56:12.133Z"
}]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

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

/**
 * @api {get} /users/:nbr/:skip Get few users
 * @apiGroup Users
 * @apiParam {nbr} nbr The number of user to get
 * @apiParam {skip} the number of user to skip
 * @apiSuccess {String} users.id User id
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.streetNumber User street number
 * @apiSuccess {String} users.address User address
 * @apiSuccess {String} users.city User city
 * @apiSuccess {String} users.phoneNumber User phoneNumber
 * @apiSuccess {String} users.country User country
 * @apiSuccess {String} users.sponsorshipCode User sponsorchipCode
 * @apiSuccess {String} users.roleID User role id
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
    "id": "cl4y8f7qd003201r048lqq7r9",
    "name": "dsf",
    "email": "jfds.sdf@ds.fds",
    "roleId": "cl4pj9g89000601tfgh82kucg",
    "address": "",
    "streetNumber": "",
    "city": "",
    "country": "",
    "phoneNumber": "",
    "sponsorshipCode": "l@l.l",
    "createdAt": "2022-06-28T13:56:12.133Z",
    "updatedAt": "2022-06-28T13:56:12.133Z"
}]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

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

/**
 * @api {delete} /users/:id Delete one user
 * @apiGroup Users
 * @apiParam {id} id User id
 * @apiSuccess {String} users.id User id
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.streetNumber User street number
 * @apiSuccess {String} users.address User address
 * @apiSuccess {String} users.city User city
 * @apiSuccess {String} users.phoneNumber User phoneNumber
 * @apiSuccess {String} users.country User country
 * @apiSuccess {String} users.sponsorshipCode User sponsorchipCode
 * @apiSuccess {String} users.roleID User role id
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
    "id": "cl4y8f7qd003201r048lqq7r9",
    "name": "dsf",
    "email": "jfds.sdf@ds.fds",
    "roleId": "cl4pj9g89000601tfgh82kucg",
    "address": "",
    "streetNumber": "",
    "city": "",
    "country": "",
    "phoneNumber": "",
    "sponsorshipCode": "l@l.l",
    "createdAt": "2022-06-28T13:56:12.133Z",
    "updatedAt": "2022-06-28T13:56:12.133Z"
}]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.delete('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const user = await deleteUser(req.params.id);

    res.json(user);
  } catch (err) {
    res.json('User does not exist');
  }
});

/**
 * @api {get} /users/get/roles/:idRoles Get all users from a role 
 * @apiGroup Users
 * @apiParam {idRoles} idRoles Role id
 * @apiSuccess {String} users.id User id
 * @apiSuccess {String} users.name User name
 * @apiSuccess {String} users.email User email
 * @apiSuccess {String} users.streetNumber User street number
 * @apiSuccess {String} users.address User address
 * @apiSuccess {String} users.city User city
 * @apiSuccess {String} users.phoneNumber User phoneNumber
 * @apiSuccess {String} users.country User country
 * @apiSuccess {String} users.sponsorshipCode User sponsorchipCode
 * @apiSuccess {String} users.roleID User role id
 * @apiSuccess {Date} users.updated_at Update's date
 * @apiSuccess {Date} users.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
    "id": "cl4y8f7qd003201r048lqq7r9",
    "name": "dsf",
    "email": "jfds.sdf@ds.fds",
    "roleId": "cl4pj9g89000601tfgh82kucg",
    "address": "",
    "streetNumber": "",
    "city": "",
    "country": "",
    "phoneNumber": "",
    "sponsorshipCode": "l@l.l",
    "createdAt": "2022-06-28T13:56:12.133Z",
    "updatedAt": "2022-06-28T13:56:12.133Z"
}]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/get/role/:idRoles', authenticateJWT, async (req, res, next) => {
  try {
    const usersByRole = await getUsersByRole(req.params.idRoles);
    res.json(usersByRole);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

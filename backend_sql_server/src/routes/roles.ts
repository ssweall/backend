import * as express from 'express';
import {
  createRole,
  deleteRole,
  getAllRoles,
  getFewRoles,
  getRole,
  updateRole,
} from '../controllers/RoleController';
import { authenticateJWT } from '../lib/helper/auth';

const router = express.Router();

/**
 * @api {get} /roles Get all roles
 * @apiGroup Roles
 * @apiSuccess {Object[]} roles roles's list
 * @apiSuccess {String} roles.id User id
 * @apiSuccess {String} roles.name User name
 * @apiSuccess {Date} roles.updated_at Update's date
 * @apiSuccess {Date} roles.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "id": "cl4pj9g89000601tfgh82kucg",
        "name": "Livreur",
        "createdAt": "2022-06-22T11:49:43.401Z",
        "updatedAt": "2022-06-22T11:49:43.401Z"
    },
    {
        "id": "cl4sfnxan006501pyrhmwnrme",
        "name": "Client",
        "createdAt": "2022-06-24T12:32:18.767Z",
        "updatedAt": "2022-06-24T12:32:18.767Z"
    },]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', authenticateJWT, async (req, res, next) => {
  const roles = await getAllRoles();
  res.json(roles);
});

/**
 * @api {post} /roles/create Create a role
 * @apiGroup Roles
 * @apiParam {String} name Role name
 * @apiSuccess {Object} role Role's data 
 * @apiSuccess {String} roles.id User id
 * @apiSuccess {String} roles.name User name
 * @apiSuccess {Date} roles.updated_at Update's date
 * @apiSuccess {Date} roles.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "id": "cl4pj9g89000601tfgh82kucg",
        "name": "Livreur",
        "createdAt": "2022-06-22T11:49:43.401Z",
        "updatedAt": "2022-06-22T11:49:43.401Z"
    }
    ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/create', authenticateJWT, async (req, res, next) => {
  try {
    const userInput = req.body;
    const user = await createRole(userInput);
    res.json(user);
  } catch (err: any) {
    if (err.meta.target == 'Role_name_key') res.json('Role already exists');
    else res.json('Error when creating a role');
  }
});

/**
 * @api {get} /roles/:id Get one role
 * @apiGroup Roles
 * @apiParam {id} id Role id
 * @apiSuccess {String} roles.id User id
 * @apiSuccess {String} roles.name User name
 * @apiSuccess {Date} roles.updated_at Update's date
 * @apiSuccess {Date} roles.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "id": "cl4pj9g89000601tfgh82kucg",
        "name": "Livreur",
        "createdAt": "2022-06-22T11:49:43.401Z",
        "updatedAt": "2022-06-22T11:49:43.401Z"
    },
    ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const role = await getRole(req.params.id);
    res.json(role);
  } catch (err) {
    res.json('Role not found');
  }
});

/**
 * @api {put} /roles/:id Update one role
 * @apiGroup Roles
 * @apiParam {id} id Role id
 * @apiParam {String} name Role name
 * @apiSuccess {String} roles.id User id
 * @apiSuccess {String} roles.name User name
 * @apiSuccess {Date} roles.updated_at Update's date
 * @apiSuccess {Date} roles.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "id": "cl4pj9g89000601tfgh82kucg",
        "name": "Commercial",
        "createdAt": "2022-06-22T11:49:43.401Z",
        "updatedAt": "2022-06-22T11:49:43.401Z"
    },
    ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.put('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const user = await updateRole(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

/**
 * @api {put} /roles/:nbr/:skip Get few roles
 * @apiGroup Roles
 * @apiParam {nbr} nbr Number of roles to get
 * @apiParam {skip} skip Number of roles to skip
 * @apiSuccess {String} roles.id User id
 * @apiSuccess {String} roles.name User name
 * @apiSuccess {Date} roles.updated_at Update's date
 * @apiSuccess {Date} roles.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "id": "cl4pj9g89000601tfgh82kucg",
        "name": "Commercial",
        "createdAt": "2022-06-22T11:49:43.401Z",
        "updatedAt": "2022-06-22T11:49:43.401Z"
    },
    ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.get('/:nbr/:skip', authenticateJWT, async (req, res, next) => {
  try {
    const roles = await getFewRoles(
      parseInt(req.params.nbr),
      parseInt(req.params.skip)
    );
    res.json(roles);
  } catch (err) {
    res.json(err);
  }
});

/**
 * @api {delete} /roles/:id Delete one role
 * @apiGroup Roles
 * @apiParam {id} id Role id
 * @apiSuccess {String} roles.id User id
 * @apiSuccess {String} roles.name User name
 * @apiSuccess {Date} roles.updated_at Update's date
 * @apiSuccess {Date} roles.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "id": "cl4pj9g89000601tfgh82kucg",
        "name": "Commercial",
        "createdAt": "2022-06-22T11:49:43.401Z",
        "updatedAt": "2022-06-22T11:49:43.401Z"
    },
    ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.delete('/:id', authenticateJWT, async (req, res, next) => {
  try {
    const user = await deleteRole(req.params.id);
    res.json(user);
  } catch (err) {
    res.json('Role does not exist');
  }
});

module.exports = router;

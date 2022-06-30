import express from 'express';
import controller from '../controllers/log';

const router = express.Router();

/**
 * @api {post} /logs/create Create one log
 * @apiGroup Logs
 * @apiParam {String} type Type of the log
 * @apiParam {String} description Description of the log
 * @apiSuccess {String} logs._id Log id
 * @apiSuccess {String} logs.type Log type
 * @apiSuccess {String} logs.description Log description
 * @apiSuccess {Date} logs.updated_at Update's date
 * @apiSuccess {Date} logs.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "type": "Connexion",
        "description": "Simon s'est connecté",
        "_id": "62bd7a480acb435fc81cb9d2",
        "createdAt": "2022-06-30T10:26:16.143Z",
        "updatedAt": "2022-06-30T10:26:16.143Z",
    }
 *     ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/create', controller.createLog);
/**
 * @api {get} /logs/Get all logs
 * @apiGroup Logs
 * @apiSuccess {Object[]} logs logs's list
 * @apiSuccess {String} logs._id Log id
 * @apiSuccess {String} logs.type Log type
 * @apiSuccess {String} logs.description Log description
 * @apiSuccess {Date} logs.updatedAt Update's date
 * @apiSuccess {Date} logs.createdAt Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "type": "Connexion",
        "description": "Simon s'est connecté",
        "_id": "62bd7a480acb435fc81cb9d2",
        "createdAt": "2022-06-30T10:26:16.143Z",
        "updatedAt": "2022-06-30T10:26:16.143Z",
    }
 *     ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', controller.getAllLogs);
/**
 * @api {get} /logs/:id Get one log
 * @apiGroup Logs
 * @apiParam {String} id Id of the log
 * @apiSuccess {String} logs._id Log id
 * @apiSuccess {String} logs.type Log type
 * @apiSuccess {String} logs.description Log description
 * @apiSuccess {Date} logs.updated_at Update's date
 * @apiSuccess {Date} logs.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "type": "Connexion",
        "description": "Simon s'est connecté",
        "_id": "62bd7a480acb435fc81cb9d2",
        "createdAt": "2022-06-30T10:26:16.143Z",
        "updatedAt": "2022-06-30T10:26:16.143Z",
    }
 *     ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', controller.getOneLog);
/**
 * @api {delete} /logs/:id Delete one log
 * @apiGroup Logs
 * @apiParam {String} id Id of the log
 * @apiSuccess {String} logs._id Log id
 * @apiSuccess {String} logs.type Log type
 * @apiSuccess {String} logs.description Log description
 * @apiSuccess {Date} logs.updated_at Update's date
 * @apiSuccess {Date} logs.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "type": "Connexion",
        "description": "Simon s'est connecté",
        "_id": "62bd7a480acb435fc81cb9d2",
        "createdAt": "2022-06-30T10:26:16.143Z",
        "updatedAt": "2022-06-30T10:26:16.143Z",
    }
 *     ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', controller.deleteLog);
/**
 * @api {delete} /logs/ Delete all logs
 * @apiGroup Logs
 * @apiParam {String} id Id of the log
 * @apiSuccess {String} logs._id Log id
 * @apiSuccess {String} logs.type Log type
 * @apiSuccess {String} logs.description Log description
 * @apiSuccess {Date} logs.updated_at Update's date
 * @apiSuccess {Date} logs.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "type": "Connexion",
        "description": "Simon s'est connecté",
        "_id": "62bd7a480acb435fc81cb9d2",
        "createdAt": "2022-06-30T10:26:16.143Z",
        "updatedAt": "2022-06-30T10:26:16.143Z",
    }
 *     ]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/', controller.deleteAllLogs);

export = router;

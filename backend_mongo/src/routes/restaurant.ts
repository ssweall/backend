import express from 'express';
import controller from '../controllers/restaurant';

const router = express.Router();

/**
 * @api {post} /orders/create Create one restaurant
 * @apiGroup Restaurants
 * @apiParam {String} name Name of the restaurant
 * @apiParam {String} idRestaurateur Id of the restaurateur
 * @apiParam {String[]} articles Id of the articles
 * @apiParam {String} address Address of the restaurant
 * @apiParam {String} picture Picture of the restaurant
 * 
 * @apiSuccess {String} restaurants._id Restaurant id
 * @apiSuccess {String} restaurants.name Restaurant name
 * @apiSuccess {String} restaurants.idRestaurateur Restaurant idRestaurateur
 * @apiSuccess {String} restaurants.address Restaurant address
 * @apiSuccess {String} restaurants.picture Restaurant picture
 * @apiSuccess {Date} restaurants.updated_at Update's date
 * @apiSuccess {Date} restaurants.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "name": "restaurant1",
        "idRestaurateur": "cl4zb8kgx0137pv19b8hpe1gh",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "address": "8 rue de la trompette",
        "picture": "",
        "_id": "62bd8505f9080774e801ce28",
        "createdAt": "2022-06-30T11:12:05.280Z",
        "updatedAt": "2022-06-30T11:12:05.280Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/create', controller.createRestaurant);
/**
 * @api {get} /orders/ Get all restaurants
 * @apiGroup Restaurants
 * 
 * @apiSuccess {String} restaurants._id Restaurant id
 * @apiSuccess {String} restaurants.name Restaurant name
 * @apiSuccess {String} restaurants.idRestaurateur Restaurant idRestaurateur
 * @apiSuccess {String} restaurants.address Restaurant address
 * @apiSuccess {String} restaurants.picture Restaurant picture
 * @apiSuccess {Date} restaurants.updated_at Update's date
 * @apiSuccess {Date} restaurants.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "name": "restaurant1",
        "idRestaurateur": "cl4zb8kgx0137pv19b8hpe1gh",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "address": "8 rue de la trompette",
        "picture": "",
        "_id": "62bd8505f9080774e801ce28",
        "createdAt": "2022-06-30T11:12:05.280Z",
        "updatedAt": "2022-06-30T11:12:05.280Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', controller.getAllRestaurants);
/**
 * @api {get} /orders/:id Get one restaurant
 * @apiGroup Restaurants
 * @apiParam {String} id Restaurant id
 * @apiSuccess {String} restaurants._id Restaurant id
 * @apiSuccess {String} restaurants.name Restaurant name
 * @apiSuccess {String} restaurants.idRestaurateur Restaurant idRestaurateur
 * @apiSuccess {String} restaurants.address Restaurant address
 * @apiSuccess {String} restaurants.picture Restaurant picture
 * @apiSuccess {Date} restaurants.updated_at Update's date
 * @apiSuccess {Date} restaurants.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "name": "restaurant1",
        "idRestaurateur": "cl4zb8kgx0137pv19b8hpe1gh",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "address": "8 rue de la trompette",
        "picture": "",
        "_id": "62bd8505f9080774e801ce28",
        "createdAt": "2022-06-30T11:12:05.280Z",
        "updatedAt": "2022-06-30T11:12:05.280Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', controller.getOneRestaurant);
/**
 * @api {get} /orders/restaurateur/:id Get all restaurants by restaurateur
 * @apiGroup Restaurants
 * @apiParam {String} id Restaurateur id
 * @apiSuccess {String} restaurants._id Restaurant id
 * @apiSuccess {String} restaurants.name Restaurant name
 * @apiSuccess {String} restaurants.idRestaurateur Restaurant idRestaurateur
 * @apiSuccess {String} restaurants.address Restaurant address
 * @apiSuccess {String} restaurants.picture Restaurant picture
 * @apiSuccess {Date} restaurants.updated_at Update's date
 * @apiSuccess {Date} restaurants.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "name": "restaurant1",
        "idRestaurateur": "cl4zb8kgx0137pv19b8hpe1gh",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "address": "8 rue de la trompette",
        "picture": "",
        "_id": "62bd8505f9080774e801ce28",
        "createdAt": "2022-06-30T11:12:05.280Z",
        "updatedAt": "2022-06-30T11:12:05.280Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/restaurateur/:id', controller.getAllRestaurantsByRestaurateur);
/**
 * @api {put} /orders/:id Update one restaurant
 * @apiGroup Restaurants
 * @apiParam {String} id Id of the restaurant
 * @apiParam {String} name Name of the restaurant
 * @apiParam {String} idRestaurateur Id of the restaurateur
 * @apiParam {String[]} articles Id of the articles
 * @apiParam {String} address Address of the restaurant
 * @apiParam {String} picture Picture of the restaurant
 * 
 * @apiSuccess {String} restaurants._id Restaurant id
 * @apiSuccess {String} restaurants.name Restaurant name
 * @apiSuccess {String} restaurants.idRestaurateur Restaurant idRestaurateur
 * @apiSuccess {String} restaurants.address Restaurant address
 * @apiSuccess {String} restaurants.picture Restaurant picture
 * @apiSuccess {Date} restaurants.updated_at Update's date
 * @apiSuccess {Date} restaurants.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "name": "restaurant1",
        "idRestaurateur": "cl4zb8kgx0137pv19b8hpe1gh",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "address": "8 rue de la trompette",
        "picture": "",
        "_id": "62bd8505f9080774e801ce28",
        "createdAt": "2022-06-30T11:12:05.280Z",
        "updatedAt": "2022-06-30T11:12:05.280Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', controller.updateRestaurant);
/**
 * @api {delete} /orders/:id Delete one restaurant
 * @apiGroup Restaurants
 * @apiParam {String} id Id of the restaurant
 * 
 * @apiSuccess {String} restaurants._id Restaurant id
 * @apiSuccess {String} restaurants.name Restaurant name
 * @apiSuccess {String} restaurants.idRestaurateur Restaurant idRestaurateur
 * @apiSuccess {String} restaurants.address Restaurant address
 * @apiSuccess {String} restaurants.picture Restaurant picture
 * @apiSuccess {Date} restaurants.updated_at Update's date
 * @apiSuccess {Date} restaurants.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "name": "restaurant1",
        "idRestaurateur": "cl4zb8kgx0137pv19b8hpe1gh",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "address": "8 rue de la trompette",
        "picture": "",
        "_id": "62bd8505f9080774e801ce28",
        "createdAt": "2022-06-30T11:12:05.280Z",
        "updatedAt": "2022-06-30T11:12:05.280Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', controller.deleteRestaurant);

export = router;

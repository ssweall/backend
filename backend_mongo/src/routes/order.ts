import express from 'express';
import controller from '../controllers/order';

const router = express.Router();

/**
 * @api {post} /orders/create Create one order
 * @apiGroup Orders
 * @apiParam {String} id Id of the order
 * @apiParam {String} idClient Id of the client of the order
 * @apiParam {String} idRestaurant Id of the restaurant of the order
 * @apiParam {String} idLivreur Id of the livreur of the order
 * @apiParam {String[]} articles Id of the articles of the order
 * @apiParam {Boolean} activeCodeSponsorship Active code sponsorship of the order
 * @apiParam {String} state State of the order
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */

router.post('/create', controller.createOrder);
/**
 * @api {get} /orders/ Get all orders
 * @apiGroup Orders
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', controller.getAllOrders);
/**
 * @api {get} /orders/:id Get one order
 * @apiGroup Orders
 * @apiParam {String} id Id of the order
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', controller.findOneOrder);
/**
 * @api {get} /orders/client/:id Get all orders by client
 * @apiGroup Orders
 * @apiParam {String} id Id of the client
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/client/:id', controller.findAllOrderByClient);
/**
 * @api {get} /orders/livreur/:id Get all orders by livreur
 * @apiGroup Orders
 * @apiParam {String} id Id of the livreur
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/livreur/:id', controller.findAllOrdersByLivreur);
/**
 * @api {get} /orders/restaurant/:id Get all orders by restaurant
 * @apiGroup Orders
 * @apiParam {String} id Id of the restaurant
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/restaurant/:id', controller.findAllOrdersByRestaurant);
/**
 * @api {get} /orders/status/:status Get all orders by status
 * @apiGroup Orders
 * @apiParam {String} status Status of the order
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/status/:status', controller.findAllOrdersByStatus);

/**
 * @api {put} /orders/:id Update one order
 * @apiGroup Orders
 * @apiParam {String} id Id of the order
 * @apiParam {String} idClient Id of the client of the order
 * @apiParam {String} idRestaurant Id of the restaurant of the order
 * @apiParam {String} idLivreur Id of the livreur of the order
 * @apiParam {String[]} articles Id of the articles of the order
 * @apiParam {Boolean} activeCodeSponsorship Active code sponsorship of the order
 * @apiParam {String} state State of the order
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', controller.updateOrder);

/**
 * @api {delete} /orders/:id Delete one order
 * @apiGroup Orders
 * @apiParam {String} id Id of the order
 * @apiSuccess {String} orders._id Order id
 * @apiSuccess {String} orders.idClient Id of the client of the order
 * @apiSuccess {String} orders.idRestaurant Id of the restaurant of the order
 * @apiSuccess {String} orders.idLivreur Id of the livreur of the order
 * @apiSuccess {String[]} orders.articles Id of the articles of the order
 * @apiSuccess {Boolean} orders.activeCodeSponsorship Active code sponsorship of the order
 * @apiSuccess {String} orders.state State of the order
 * @apiSuccess {Date} orders.updated_at Update's date
 * @apiSuccess {Date} orders.created_at Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [{
        "idClient": "cl4trqdqo0011qw19ikg6ad72",
        "idRestaurant": "62bc13a1d3b8ab68761099e8",
        "idLivreur": "62b88a406ff4634b01cf28as",
        "articles": [
            "62b88a406ff4634b01cf28ff",
            "62b88a356ff4634b01cf28fc"
        ],
        "state": "preparation",
        "clientNotified": false,
        "restaurantNotified": false,
        "livreurNotified": false,
        "_id": "62bd814fd4c60e44f5183d0b",
        "createdAt": "2022-06-30T10:56:15.396Z",
        "updatedAt": "2022-06-30T10:56:15.396Z",
    }]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', controller.deleteOrder);

export = router;

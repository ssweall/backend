import express from 'express';
import controller from '../controllers/article';

const router = express.Router();
import multer from 'multer';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

/**
 * @api {post} /articles/create Create one article
 * @apiGroup Articles
 * @apiParam {String} name Name of the article
 * @apiParam {String} type Type of the article
 * @apiParam {Number} price Price of the article
 * @apiParam {String} detail Detail of the article
 * @apiParam {String} picture Picture of the article
 * @apiSuccess {String} articles._id Article id
 * @apiSuccess {String} articles.name Article name
 * @apiSuccess {String} articles.type Article type
 * @apiSuccess {Number} articles.price Article price
 * @apiSuccess {String} articles.detail Article detail
 * @apiSuccess {String} articles.picture Article picture
 * @apiSuccess {Date} articles.updatedAt Update's date
 * @apiSuccess {Date} articles.createdAt Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *     {
 *      "id": "5e9f8f8f8f8f8f8f8f8f8f8",
 *      "name": "Article 1",
 *       "type": "Article",
 *       "price": 100,
 *       "detail": "Article 1 detail",
 *       "picture": ""
 *       "updatedAt": "2020-01-01T00:00:00.000Z",
 *       "createdAt": "2020-01-01T00:00:00.000Z"
 *    },]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.post('/create', upload.single('image'), controller.createArticle);
/**
 * @api {get} /articles Get all articles
 * @apiGroup Articles
 * @apiSuccess {Object[]} articles articles's list
 * @apiSuccess {String} articles._id Article id
 * @apiSuccess {String} articles.name Article name
 * @apiSuccess {String} articles.type Article type
 * @apiSuccess {Number} articles.price Article price
 * @apiSuccess {String} articles.detail Article detail
 * @apiSuccess {String} articles.picture Article picture
 * @apiSuccess {Date} articles.updatedAt Update's date
 * @apiSuccess {Date} articles.createdAt Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *     {
 *      "id": "5e9f8f8f8f8f8f8f8f8f8f8",
 *      "name": "Article 1",
 *       "type": "Article",
 *       "price": 100,
 *       "detail": "Article 1 detail",
 *       "picture": ""
 *       "updatedAt": "2020-01-01T00:00:00.000Z",
 *       "createdAt": "2020-01-01T00:00:00.000Z"
 *    },]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/', controller.getAllArticles);
/**
 * @api {get} /articles/:id Get one article
 * @apiGroup Articles
 * @apiParam {String} id Id of the article
 * @apiSuccess {Object[]} articles articles's list
 * @apiSuccess {String} articles._id Article id
 * @apiSuccess {String} articles.name Article name
 * @apiSuccess {String} articles.type Article type
 * @apiSuccess {Number} articles.price Article price
 * @apiSuccess {String} articles.detail Article detail
 * @apiSuccess {String} articles.picture Article picture
 * @apiSuccess {Date} articles.updatedAt Update's date
 * @apiSuccess {Date} articles.createdAt Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *     {
 *      "id": "5e9f8f8f8f8f8f8f8f8f8f8",
 *      "name": "Article 1",
 *       "type": "Article",
 *       "price": 100,
 *       "detail": "Article 1 detail",
 *       "picture": ""
 *       "updatedAt": "2020-01-01T00:00:00.000Z",
 *       "createdAt": "2020-01-01T00:00:00.000Z"
 *    },]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.get('/:id', controller.getOneArticle);
/**
 * @api {put} /articles/:id Update one article
 * @apiGroup Articles
 * @apiParam {String} id Id of the article
 * @apiParam {String} name Name of the article
 * @apiParam {String} type Type of the article
 * @apiParam {Number} price Price of the article
 * @apiParam {String} detail Detail of the article
 * @apiParam {String} picture Picture of the article
 * @apiSuccess {Object[]} articles articles's list
 * @apiSuccess {String} articles._id Article id
 * @apiSuccess {String} articles.name Article name
 * @apiSuccess {String} articles.type Article type
 * @apiSuccess {Number} articles.price Article price
 * @apiSuccess {String} articles.detail Article detail
 * @apiSuccess {String} articles.picture Article picture
 * @apiSuccess {Date} articles.updatedAt Update's date
 * @apiSuccess {Date} articles.createdAt Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *     {
 *      "id": "5e9f8f8f8f8f8f8f8f8f8f8",
 *      "name": "Article 1",
 *       "type": "Article",
 *       "price": 100,
 *       "detail": "Article 1 detail",
 *       "picture": ""
 *       "updatedAt": "2020-01-01T00:00:00.000Z",
 *       "createdAt": "2020-01-01T00:00:00.000Z"
 *    },]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.put('/:id', controller.updateArticle);
/**
 * @api {delete} /articles/:id Delete one article
 * @apiGroup Articles
 * @apiParam {String} id Id of the article
 * @apiParam {String} name Name of the article
 * @apiParam {String} type Type of the article
 * @apiParam {Number} price Price of the article
 * @apiParam {String} detail Detail of the article
 * @apiParam {String} picture Picture of the article
 * @apiSuccess {Object[]} articles articles's list
 * @apiSuccess {String} articles._id Article id
 * @apiSuccess {String} articles.name Article name
 * @apiSuccess {String} articles.type Article type
 * @apiSuccess {Number} articles.price Article price
 * @apiSuccess {String} articles.detail Article detail
 * @apiSuccess {String} articles.picture Article picture
 * @apiSuccess {Date} articles.updatedAt Update's date
 * @apiSuccess {Date} articles.createdAt Register's date
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    [
 *     {
 *      "id": "5e9f8f8f8f8f8f8f8f8f8f8",
 *      "name": "Article 1",
 *       "type": "Article",
 *       "price": 100,
 *       "detail": "Article 1 detail",
 *       "picture": ""
 *       "updatedAt": "2020-01-01T00:00:00.000Z",
 *       "createdAt": "2020-01-01T00:00:00.000Z"
 *    },]
 * @apiErrorExample {json} List error
 *    HTTP/1.1 500 Internal Server Error
 */
router.delete('/:id', controller.deleteArticle);

export = router;

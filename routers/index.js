const router = require('express').Router();

const UserAuthController = require('../controllers/user-auth');
const ProductController = require('../controllers/product');
const authorization = require('../middlewares/authorization');

router.post('/auth/login', UserAuthController.Login);

router.get('/product/list', authorization, ProductController.GetList);

module.exports = router;
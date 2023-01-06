const router = require('express').Router();

const UserAuthController = require('../controllers/user-auth');
const authorization = require('../middlewares/authorization');

router.post('/user/login', UserAuthController.Login);
router.post('/user/create', authorization, UserAuthController.Insert);
router.delete('/user/delete/:id', authorization, UserAuthController.Delete);

module.exports = router;
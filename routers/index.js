const router = require('express').Router();

const UserAuthController = require('../controllers/user-auth');
const NoteController = require('../controllers/note');
const authorization = require('../middlewares/authorization');

router.post('/user/login', UserAuthController.Login);
router.post('/user/create', authorization, UserAuthController.Insert);
router.delete('/user/delete/:id', authorization, UserAuthController.Delete);

router.get('/note/list', authorization, NoteController.ListMyNotes);
router.post('/note/create', authorization, NoteController.Insert);

module.exports = router; 
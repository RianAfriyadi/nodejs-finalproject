const router = require('express').Router();

const UserAuthController = require('../controllers/user-auth');
const NoteController = require('../controllers/note');
const TagsController = require('../controllers/tags');
const authorization = require('../middlewares/authorization');

router.post('/user/login', UserAuthController.Login);
router.post('/user/create', authorization, UserAuthController.Insert);
router.delete('/user/delete/:id', authorization, UserAuthController.Delete);

router.get('/note/list', authorization, NoteController.ListMyNotes);
router.post('/note/create', authorization, NoteController.Insert);

router.post('/note/addTag', authorization, TagsController.AddTags);
router.delete('/note/removeTag/:id', authorization, TagsController.RemoveTags);

module.exports = router; 
const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');
const articleCtrl = require('../controllers/articleCtr');
const presentationCtrl = require('../controllers/presentationCtr');
const userCtr = require('../controllers/userCtr');


router.get('/', articleCtrl.getAllArticles);
router.get('/login', auth, articleCtrl.getAdminArticles);
router.get('/login/new', auth, articleCtrl.newArticle);
router.post('/', auth, multer, articleCtrl.createArticle);
router.get('/:slug', articleCtrl.getSlug);
router.get('/login/:slug', auth, articleCtrl.getAdminSlug);
router.get('/login/edit/:id', auth, articleCtrl.getModifyArticle);
router.put('/:id', auth, multer, articleCtrl.modifyArticle);
router.delete('/login/:id', auth, multer, articleCtrl.deleteArticle);
router.get('/login/modif/presentation', auth, presentationCtrl.newPresentation);
router.get('/login/modif/modify-presentation/:id', auth, presentationCtrl.getModifyPresentation);
router.delete('/:id', auth, presentationCtrl.deletePresentation);
router.get('/id/signup', userCtr.getSignUp);
router.get('/id/login', userCtr.getLogIn);
router.get('/send/contact', articleCtrl.getContact);
router.get('/login/get/messages', auth, articleCtrl.getMessages);
router.post('/login/get/messages', articleCtrl.createMessage);
router.delete('/login/msg/:id', auth, articleCtrl.deleteMessage);

module.exports = router;
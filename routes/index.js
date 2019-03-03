var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');
var ctrlQuizz = require('../controllers/quizz');
var ctrlUsers = require('../controllers/users');
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/profile', ctrlAuth.getProfile);

//users
router.get('/users', ctrlUsers.getAllUsers);
router.post('/updateUser', ctrlUsers.updateUser);
router.delete('/deleteUser/:id', ctrlUsers.deleteUser);

//quizz
router.get('/getQuizz/:id', ctrlQuizz.getQuizzfromUser);
router.post('/addQuizz/:id', ctrlQuizz.addQuizz);
router.delete('/deleteQuizz/:id', ctrlQuizz.deleteQuizz);
router.post('/updateQuizz', ctrlQuizz.updateQuizz);
module.exports = router;
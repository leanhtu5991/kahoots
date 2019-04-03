var express = require('express');
var router = express.Router();
var ctrlAuth = require('../controllers/authentication');
var ctrlQuizz = require('../controllers/quizz');
var ctrlUsers = require('../controllers/users');
// authentication
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);
router.get('/profile', ctrlAuth.getProfile);

//joueurs
router.get('/users', ctrlUsers.getAllUsers);
router.post('/updateUser', ctrlUsers.updateUser);
router.post('/updateScore/:id', ctrlUsers.updateScore);
router.delete('/deleteUser/:id', ctrlUsers.deleteUser);
router.delete('/deleteAllUSers', ctrlUsers.deleteAllUsers);
//quizz
router.get('/getQuizz/:id', ctrlQuizz.getQuizzfromUser);
router.post('/addQuizz/:id', ctrlQuizz.addQuizz);
router.delete('/deleteQuizz/:id', ctrlQuizz.deleteQuizz);
router.post('/updateQuizz', ctrlQuizz.updateQuizz);
router.get('/allQuizz', ctrlQuizz.getAllQuizz);
router.delete('/deleteAllQuizz', ctrlQuizz.deleteAllQuizz);
module.exports = router;
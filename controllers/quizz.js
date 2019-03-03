var quizzModel = require('../models/quizz');
var userModel = require('../models/users');

module.exports.getQuizzfromUser = function (req, res) {
    var userId = req.params.id;
    var allQuizz = [];
    quizzModel.find({ user : userId}, function (err, quizzs) {
        console.log(quizzs[0].answer['a1'])
        for (let quizz of quizzs){
            quizz = {
                _id : quizz._id,
                question : quizz.question,
                a1 : quizz.answer['a1'],
                a2 : quizz.answer['a2'],
                a3 : quizz.answer['a3'],
                a4 : quizz.answer['a4'],
                correct : quizz.correct
            }
            allQuizz.push(quizz)
        }
        console.log(allQuizz)
        res.json(allQuizz)
    })
}
module.exports.addQuizz = function (req, res) {
    var userId = req.params.id;
    // user = userModel.findOne({_id : userId});
    var quizz = {
        question: req.body.question,
        answer: {
            a1:req.body.a1,
            a2:req.body.a2,
            a3:req.body.a3,
            a4:req.body.a4,
        },
        correct: req.body.correct,
        user : userId
      }
      quizzModel.create(quizz, function (err, quizz) {
        if (err) {
            console.log(err);
            return res.json(err);
        } else {
            console.log('quizz created')
            return res.json('quizz created');
        }
      });
}
module.exports.deleteQuizz = function (req, res) {
    var quizzId = req.params.id;
    quizzModel.deleteOne({_id:quizzId}, function(err, obj) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log('deleteQuizz')
        res.json("delete success");
      });
    
}
module.exports.updateQuizz = function (req, res) {
    console.log("okkkk server");
    var quizzId = req.body.quizzId;
    var quizz = {
        question: req.body.question,
        answer: {
            a1:req.body.a1,
            a2:req.body.a2,
            a3:req.body.a3,
            a4:req.body.a4,
        },
        correct:req.body.correct
      }
      quizzModel.updateOne({_id:quizzId}, quizz,{ upsert: true }, function(err, quizz){
        console.log(quizz)
        res.json({status:"success", message: "quizz update!!!"})
    });
}

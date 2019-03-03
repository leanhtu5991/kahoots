var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var userModel = require('./users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var quizzSchema = new Schema({
    question:  {
        type: String,
        trim: true,
        required: true
    },
    answer: {
        a1: String,
        a2: String,
        a3: String,
        a4: String
      },
    correct:String,
    user : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports =  mongoose.model('Quizz',quizzSchema);
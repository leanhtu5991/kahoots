var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

var userSchema = new Schema({
    name:  {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    score: Number
    // quizzes : [{ type: Schema.Types.ObjectId, ref: 'Quizz' }]
});

userSchema.pre('save', function() {
    this.password = bcrypt.hashSync(this.password, saltRounds);
});

module.exports =  mongoose.model('User',userSchema);


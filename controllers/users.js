var userModel = require('../models/users');

module.exports.getAllUsers = function (req, res) {
    userModel.find(function(err, usersInfo){
        var users = [];
        for (let user of usersInfo){
            user = {
                _id : user._id,
                name : user.name,
                email : user.email,
                password : user.password,
                isAdmin : user.isAdmin,
            }
            users.push(user)
        }
        res.json(users);
    })
}
module.exports.updateUser = function (req, res) {
    var userId = req.body._id;
    var user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    };
    userModel.update({_id:userId}, user,{ upsert: true }, function(err, userInfo){
        console.log('user update')
        res.json({status:"success", message: "user update!!!"})
    });

}
module.exports.updateScore = function (req, res) {
    var userId = req.params.id;
    var score = req.body.score;
    console.log('here')
    console.log(userId);
    console.log(score);
    userModel.update({_id:userId}, {score: score},{ upsert: true }, function(err, userInfo){
        console.log('user update')
        res.json({status:"success", message: "user update!!!"})
    });

}
module.exports.deleteUser = function (req, res) {
    var userId = req.params.id;
    userModel.deleteOne({_id: userId}, function(err, userInfo){
        console.log('user delete')
        res.json({status:"success", message: "user delete!!!"})
    })
}

module.exports.deleteAllUsers = function (req, res) {
    userModel.remove(function(err, obj) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log('deleteAllUser')
        res.json("delete success");
      });
    
}
var passport = require('passport');
var userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

module.exports.register = function (req, res) {
    var userData = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        score: 0
      }
    userModel.create(userData, function (err, user) {
        if (err) {
            return res.json(err);
        } else {
            return res.json('user created');
        }
      });
};

module.exports.login = function (req, res) {
    userModel.findOne({email:req.body.email}, function(err, userInfo){
        if (err) {
            return res.status(500).json({
                status: 'failed',
                message:err
            });
        } else {
            if (userInfo==null){
                res.json({status:"error", message: "not found this user", data:null});
            } else {
                if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                    const token = jwt.sign({user: userInfo}, req.app.get('secretKey'), { expiresIn: '1h' });
                    res.json({status:"success", message: "user found!!!", user: userInfo, token:token});
                    } else{
                    res.json({status:"error", message: "Invalid email/password!!!", data:null});
                    }

            }
        }
    })
};

module.exports.getProfile = function (req, res) {
    let token = req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      if (token) {
        var user = jwtDecode(token)
        userModel.findOne({_id:user.user._id}, function(err, userInfo){
            res.json (userInfo)
        })
      } else {
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
    // userModel.findOne({email:req.body.email}, function(err, userInfo){

    // })
}

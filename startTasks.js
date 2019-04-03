var passport = require('passport');
var userModel = require('./models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');
var jwtDecode = require('jwt-decode');

module.exports.createFirstUserIfNotExists = function () {
    userModel.find(function(err, user){
            if (user.length == 0) {
                var userData = {
                    name: "Admin",
                    email: "admin@kahoot.com",
                    password: "123456",
                    isAdmin : true,
                  }
                userModel.create(userData, function (err, user) {
                    if (err) {
                        return res.json(err);
                    } else {
                        return res.json('user created');
                    }
                  });
            }
        })
};
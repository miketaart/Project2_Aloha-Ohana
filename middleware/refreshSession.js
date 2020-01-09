const User = require("../models/User");
const createError = require('http-errors');

module.exports = function(req,res,next) {
    if(req.session.user) {
        User.findById(req.session.user._id)
        .then((user)=> {
            req.session.user = user;
            next();
        })
        .catch(err=> {
            next(createError(500, err))
        })
    }
    else next()
}
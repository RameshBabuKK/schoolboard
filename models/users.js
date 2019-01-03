var mongoose = require('mongoose')

var UsersSchema = mongoose.Schema({
    firstName: String,
    passWord: String,
    confirmPassword: String,
    email: String,
    phone: Number
})

module.exports = mongoose.model('users', UsersSchema)

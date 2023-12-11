const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    mail: String,
    password: String,
    phoneNumber: String,
    token: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;





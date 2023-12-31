const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    phone: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
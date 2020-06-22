const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    fullName: String,
    email: String,
    password: String
});

module.exports = model('User', userSchema)


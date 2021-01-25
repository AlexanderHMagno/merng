// Creates the basic Mongo Schema for the user, the required fields will be manage by GQL


const {Schema, model} = require('mongoose')


const UserSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
})

module.exports = model('User', UserSchema);
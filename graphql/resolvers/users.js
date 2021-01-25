const UserModel = require ('../../mongo/models/userName');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {SECRETWORD} = require('../../config');
const {UserInputError} = require('apollo-server')

module.exports = {
    Query: {},
    Mutation: {
        // register(parent, args,context, info)
        async register(_, {registerInput: {username, email, password, confirmPassword}}) {
            // TODO: Validate User Data
            
            const userExists = await UserModel.findOne(
                {"$or": [
                    {"username": username}, 
                    {"email":email}
                ]},
                {"username":1}
                )

            if (userExists) {
                throw new UserInputError('This user already Exits', {
                    errors: {
                        username: `This Username is already taken`
                    }
                })
            }

            // Hash password and create an auth token
            password = await bcryptjs.hash(password, 12);
            
            const newUser = new UserModel ({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            })
            
            const res = await newUser.save();

            const token = jwt.sign(
                {
                    id: res.id,
                    email: res.email,
                    username: res.username
                },  SECRETWORD, 
                {
                    expiresIn: '1h'
                }
            )
        
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}

const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {UserInputError} = require('apollo-server')

const UserModel = require ('../../mongo/models/userName');
const {SECRETWORD} = require('../../config');
const {ValidateUserInput, AuthUserInput} = require('../../util/validators');


const createToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        },  SECRETWORD, 
        {
            expiresIn: '1h'
        }
    )
}



module.exports = {
    Query: {},
    Mutation: {

        async authentication(_, {authInput: {username, password}}) {
            //Validate data
            const {valid, errors} = AuthUserInput(username, password);
            if (!valid) {
                throw new UserInputError('Please Check your data', {errors});
            }

            //Check user exist

            const userModel =  await UserModel.findOne({"$or": [
                {"username": username}, 
                {"email":username}
            ]})

            if (!userModel) {
                errors.general = 'Auth Not Valid';
                throw new UserInputError('Please Check your credentials', {errors});
            }
            
            // Check pasword
            const checkPassword = await bcryptjs.compare(password, userModel.password);

            if (!checkPassword) {
                errors.general = 'Auth Not Valid';
                throw new UserInputError('Please Check your credentials', {errors});
            }
            // Create Token
            const token = createToken(userModel);
            // return 

            return {
                ...userModel._doc,
                id: userModel._id,
                token
            }
        },

        // register(parent, args,context, info)
        async register(_, {registerInput: {username, email, password, confirmPassword}}) {
            
            
            // Validate User Data
            const {errors, valid} = ValidateUserInput(username, email, password, confirmPassword);
            if (!valid){ 
                throw new UserInputError('Please check your data', {
                    errors
                })
            }
            // FInd if we have another user with same email or user 
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

            const token = createToken(res);
        
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
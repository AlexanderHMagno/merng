const {AuthenticationError, ForbiddenError} = require('apollo-server');
const JWT = require('jsonwebtoken');

const {SECRETWORD} = require('../config');


module.exports = {
    UserAuthorization :  (auth) => {
        if (auth) {
            // Bearer 
            const token = auth.split('Bearer ')[1];
            
            if (token) {
                try {
                    const user = JWT.verify(token,SECRETWORD);
                    return user;
                } catch(err) {
                    throw new AuthenticationError("Invalid/Token")
                }
            } else {
                throw new AuthenticationError("Token Bearer [token]")
            }
        }

        throw new ForbiddenError('Authorization Header Not Provided')
    
    }
}

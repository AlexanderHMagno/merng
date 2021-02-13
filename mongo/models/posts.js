// Creates the basic Mongo Schema for posts, the required fields will be manage by GQL

const {Schema, model} = require('mongoose')
const {ObjectId} = Schema.Types;

const PostSchema = new Schema ({
    body: String,
    createdAt: String,
    username: String,
    comments : [
        {
            body: String,
            user: String,
            createdAt: String
        }
    ] ,
    likes : [
        {
            username : String,
            createdAt: String,
        }
    ],
    // This part is optional "relation, we could link our data models" 
    user: {
        type: ObjectId,
        ref: 'users'
    },
    
    
})


module.exports = model('Post', PostSchema);
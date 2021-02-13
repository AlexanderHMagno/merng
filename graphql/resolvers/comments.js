const {UserInputError} = require('apollo-server')

const PostModel = require('../../mongo/models/posts');
const {validatePostBody} = require('../../util/validators');
const {UserAuthorization} = require('../../util/authFile');


module.exports = {
    Mutation: {
        createComment : async (_,{postId, body}, context) => {
            
            //validat body 
            const {valid, errors} = validatePostBody(body);
            const user = UserAuthorization(context.authScope); //id

            if (valid) {
                //find comment

                try {
                    const Post = await PostModel.findById(postId);
                    if (Post) {

                        const payload = {
                            body,
                            createdAt: new Date().toISOString(),
                            user: user.id
                        }

                        // insert comment
                        const updatedPost = await PostModel.findOneAndUpdate({'_id':postId}, {$push: {
                            comments: payload
                        }},{"useFindAndModify":false})
                        
                        return updatedPost;
                    }

                    throw new UserInputError("Not Valid Post")
                } catch (err) {
                    throw new Error (err)
                }
            } 

            throw new UserInputError("Body Error", errors)
        },

        deleteComment: async (_, {postId, commentId}, context) => {
            const user = UserAuthorization(context.authScope); //id
            //find comment

            try {
                const comment = await PostModel.findOne({'$and': [{"_id": postId}, { "comments._id":  commentId} ]})
        
                if (comment) {
                    //delete comment if is the same user 

                    // TODO:
                    const Post = await PostModel.updateOne({ "_id": postId }, { "$pull": { "comments": {"_id":  commentId} }});
                    return Post
                }
            } catch (err) {
                throw new  UserInputError ("Comment not found", err)
            }
           


        }
    }
}
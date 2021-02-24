const {UserInputError, ForbiddenError} = require ("apollo-server");

const PostModel = require ('../../mongo/models/posts');
const {UserAuthorization} = require('../../util/authFile')
const {validatePostBody} = require('../../util/validators')

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                return await PostModel.find().sort({createdAt: -1});
            } catch (err) {
                throw new Error(err)
            }
        },

        getPost: async (_,{postId}) => {
            try { 
                const post = await PostModel.findById(postId);
                return post;
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation : {
        async createPost (_,{body}, context) {
            const user = UserAuthorization(context.authScope); //id
            const {valid, errors} = validatePostBody(body);
            if (valid) {
                try {
                    const newPost =  await new PostModel({
                        body,
                        createdAt: new Date().toISOString(),
                        username: user.username,
                        user: user.id
                    }).save()
    
                    return newPost
                } catch (err) {
                    throw new Error ('Post was not created')
                }
            } else {
                throw new UserInputError('Body not Found',{
                    errors
                })
            }
        },

        deletePost : async (_, {postId}, context) => {
            const user = UserAuthorization(context.authScope); 
            // find the post

            try {                
                const post = await PostModel.findById(postId);

                if (post) {
                    // Check the user is trying to delete has auth
                    if (post.user == user.id) {
                        const deleted = await post.delete();
                        if (deleted) {
                            return 'Post has been removed';
                        }   
                    } else {
                        throw new ForbiddenError ('User doesnt have rights to remove this post')
                    }
                    // delete the post
                } else {
                    throw new Error ("Post Not Found")
                }
            } catch (err) {
                throw new Error (err);
            }
            
        }
    }
}
const {UserInputError} = require ("apollo-server");

const PostModel = require ('../../mongo/models/posts');
const {UserAuthorization} = require('../../util/authFile')
const {validatePostBody} = require('../../util/validators')

module.exports = {
    Query: {
        getPosts: async () => {
            try {
                return await PostModel.find();
            } catch (err) {
                throw new error(err)
            }
        },

        getPost: async (_,{postId}) => {
            try { 
                const post = await PostModel.findById(postId);
                return post;
            } catch (err) {
                throw new error(err);
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
        }
    }
}
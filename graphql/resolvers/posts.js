const PostModel = require ('../../mongo/models/posts');

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
}
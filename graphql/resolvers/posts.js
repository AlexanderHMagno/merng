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
    },
}
const PostModel = require('../../mongo/models/posts');
const {UserAuthorization} = require('../../util/authFile');



module.exports = {
    Mutation: {
        toggleLikes : async (_,{postId}, context) => {
            
            const user = UserAuthorization(context.authScope); //id
            console.log(user);
            try {
                const Post = await PostModel.findById(postId);
                if (Post) {
                    let updatedPost;
                    // two different ways the second one is slower but its not sending a new Request to Mongo... 
                    // Perfomance vs Budget??
                    // const found = await PostModel.findOne({'$and': [{"_id": postId}, { "likes.username":  user.id} ]})
                    const found = Post.likes.find(like => like.username === user.id);
                    
                    if (found) {
                        updatedPost =  await PostModel.findOneAndUpdate(
                            { "_id": postId }, 
                            { "$pull": 
                                { "likes": {"username":  user.id} }
                            },{new : true});;
                    } else {
                        const payload = {
                            createdAt: new Date().toISOString(),
                            username: user.id
                        }
    
                        // insert comment
                        updatedPost = await PostModel.findOneAndUpdate({'_id':postId}, {$push: {
                            likes: payload
                        }},{"useFindAndModify":false, new : true})
                    }
                    return updatedPost;
                }

                throw new UserInputError("Not Valid Post")
            } catch (err) {
                throw new Error (err)
            }
        }
    }
}
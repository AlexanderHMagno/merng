const postsResolvers = require('./posts');
const userResolvers = require('./users');
const commentsResolvers = require('./comments');
const likesResolvers = require('./likes');

// Provide resolver functions for your schema fields
//Resolver are the functions that return the data that we need to fetch

module.exports = {
    //Modifiers! 
    Post : {
        countsComments : (parent) => parent.comments.length,
        countsLikes : (parent) => parent.likes.length,
    },
    Query : {
        ...postsResolvers.Query,
    }, 
    Mutation: {
        ...userResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...likesResolvers.Mutation
    }
  };
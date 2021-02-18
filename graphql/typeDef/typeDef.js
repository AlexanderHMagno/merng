const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
//Type definition, this is the index of resolvers, that routes our request to the proper option,
// on resolvers

// NOTE:: Attention the ! after the type of data, means the resolves must return that value
module.exports = gql`

    type Post { 
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!,
        comments: [Comment]!,
        likes: [Like]!
    }   

    type Comment {
        id:ID!,
        body: String!,
        createdAt: String,
        user: ID
    }

    type Like {
        username:ID!
        createdAt: String!
    }

    type User {
        id: ID!,
        username: String!,
        email: String!,
        token: String!,
        createdAt: String!
    }
    
    # This "type" receives arg usefull to pass data in resolver
    input RegisterInput {
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }


    input AuthInput {
        username: String!,
        password: String!,
    }



    # QUERIES and RESOLVERS
    type Query {
        getPosts : [Post]
        getPost(postId:ID!): Post
    }

    type Mutation {
        # here the register is receiveing some arguments, we could recibe the args directly but, its better
        # To have a type to control the information rather thatn having this information inline
        register(registerInput: RegisterInput): User!
        authentication(authInput: AuthInput): User!
        createPost(body: String!):Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body:String!):Post!
        deleteComment(postId:ID!, commentId: ID!):Post!
        toggleLikes(postId:ID!): Post!
    }
`;


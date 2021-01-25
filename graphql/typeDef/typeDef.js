const { gql } = require('apollo-server-express');

// Construct a schema, using GraphQL schema language
module.exports = gql`

    type Post { 
        id: ID!,
        body: String!,
        createdAt: String!,
        username: String!,
    }   

    type Query {
        getPosts : [Post]
    }
`;


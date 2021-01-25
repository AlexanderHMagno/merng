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

    type Query {
        getPosts : [Post]
    }

    type Mutation {
        # here the register is receiveing some arguments, we could recibe the args directly but, its better
        # To have a type to control the information rather thatn having this information inline
        register(registerInput: RegisterInput): User!
    }
`;


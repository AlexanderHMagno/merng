const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');

const {MONGODB} = require('./config');
const typeDefs = require('./graphql/typeDef');
const resolvers = require('./graphql/resolvers');

const port = process.env.PORT || 4000;
const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({req}) => ({
        authScope: req.headers.authorization
      })
});

const app = express();
server.applyMiddleware({ app });

mongoose
    .connect(MONGODB, {
        useNewUrlParser:true,
        useUnifiedTopology: true
    })
    .then(() => app.listen({ port }, () => 
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`))
    ).catch(erro => {
        console.log(erro)
    });
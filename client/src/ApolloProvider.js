import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache,ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from "apollo-link-context";



const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });

//Adding the header to the authorization app
const setAuthorizationLink = setContext((request, previousContext) => {

  let token = localStorage.getItem("jwtToken");
  const authorization = token? `Bearer ${token}` : '';
  return {
      headers: {authorization}
  }
});


const client = new ApolloClient({
    link : setAuthorizationLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: true
  });


export default (
    <ApolloProvider client={client}>
        <App/>
    </ApolloProvider>
    )


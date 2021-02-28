import React, { useState, createContext, useReducer } from 'react';
import jwt_decode from "jwt-decode";
 


//This ones creates the context of the data that we will display on our application,
// We can create methods as well in order to change information as well
// We need 3 things createContext method, and a resolver and provider 

let ActiveUser = {user: null};

//Check if we have an active user or not
if (localStorage.getItem('jwtToken')) {
    const jwtToken = jwt_decode(localStorage.getItem('jwtToken'));
    ActiveUser = {user : jwtToken};
}

const AuthContext = createContext({
    user : ActiveUser, 
    // logIn : (userData) => { console.log('This is doing something?')},
    // logOut: () => {}
});

//Resolver, what to do with the data 

const AuthReducer = (initialstate, action) => {

    switch (action.type) {
        case "LOGIN":
            initialstate = {...initialstate, user: action.payload};
            break;
        case "LOGOUT":
            initialstate = {...initialstate, user: null};
            break;
    }
    return initialstate;
}

const AuthProvider = (props) => {
    const [state, dispatch] = useReducer(AuthReducer, ActiveUser);
    const logIn =  (userData) => {
        localStorage.setItem("jwtToken", userData.token);
        dispatch({
            type:"LOGIN",
            payload: userData
        })
    }

    const logOut = () => {
        localStorage.removeItem("jwtToken");
        dispatch({type:'LOGOUT'});
    }

    return <AuthContext.Provider 
        value = {{user: state.user, logIn, logOut}}
        {...props}
        />

}

export {AuthContext, AuthProvider};




import React, { useState, useContext } from 'react';
import {Form, Button, Image} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';

import {useForm} from '../util/hooks';
import {AuthProvider, AuthContext} from '../context/AuthContext';

const Login = (props) => {
    const [errors, setErrors] = useState({});
    const {values, handleSubmit, onChange} = useForm(loginUser,{
        username: '',
        password: '',
    }
    );
    const containerContext = useContext(AuthContext);
    const [userLoging, {loading}] = useMutation(LOGIN_MUTATION, {
        update(proxy, {data:{authentication}}) {
            containerContext.logIn(authentication);
            props.history.push('./');
        },
        onError(err) {
            console.log(err.graphQLErrors[0].extensions.errors);
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables : values
    });

    // Methods
    function loginUser () {userLoging();}
    
    return ( 
        <div className="loginForm" >
            <div className="loginTitle">
                <Image size="tiny" src='/images/cv.png' wrapped ui={true} />
                <h3>Login</h3>
            </div>
            <Form size="mini" onSubmit={handleSubmit} className = {loading? 'loading':''}> 
                <Form.Input fluid name="username" label='Username or Email' placeholder='Username' type="text" onChange={onChange}  />
                <Form.Input fluid name="password" label='Password' placeholder='Password' type="password" onChange={onChange} error={ errors.general ? {  content: 'The user name or password is incorrect' , pointing: 'above' } :false} />
                <Button type="submit" color='teal' fluid>
                    Login
                </Button>
            </Form>
        </div>
     );
}

const LOGIN_MUTATION = gql`
mutation authentication(
        $username: String!
        $password: String!
    ) {authentication (
        authInput:{
            username: $username,
            password: $password,
        }){
        id
        username
        email
        token
        createdAt
    }
    }
`;

export default Login;
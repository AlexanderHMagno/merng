import React, { useState } from 'react';
import {Form, Button,Image} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';

import {useForm} from '../util/hooks';

const Register = (props) => {
    const [errors, setErrors] = useState({});
    const {values, handleSubmit, onChange} = useForm(registerUSer,{
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    );

    const [createUser, {loading}] = useMutation(REGISTER_MUTATION, {
        update(proxy, result) {
            //TODO: do something with the result including the token
            props.history.push('./');
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables : values
    });

    // Methods
    function registerUSer () {createUser();}

    return ( 
        <div className="loginForm" >
            <div className="loginTitle">
                <Image size="tiny" src='/images/cv.png' wrapped ui={true} />
                <h3>Register</h3>
            </div>
            <Form size="mini" onSubmit={handleSubmit} className = {loading? 'loading':''}> 
                <Form.Input fluid name="username" label='Username' placeholder='Username' type="text" onChange={onChange} error={ errors.username ? {  content: errors.username , pointing: 'above' } :false} />
                <Form.Input fluid name="email" label='Email' placeholder='Email' type="email" onChange={onChange} error={ errors.email ? {  content: errors.email , pointing: 'above' } :false} />
                <Form.Input fluid name="password" label='Password' placeholder='Password' type="password" onChange={onChange} error={ errors.password ? {  content: errors.password, pointing: 'above' } :false} />
                <Form.Input fluid name="confirmPassword" label='Confirm Password' placeholder='Confirm Password' type="password" onChange={onChange} error={ errors.password ? {  content: errors.password, pointing: 'above' } :false} />
                <Button type="submit" primary fluid>
                    Register
                </Button>
            </Form>
        </div>
     );
}

const REGISTER_MUTATION = gql`
mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {register (
        registerInput:{
            username: $username,
            email: $email
            password: $password,
            confirmPassword: $confirmPassword,	
        }){
        id
        username
        email
        token
        createdAt
    }
    }
`;

export default Register;
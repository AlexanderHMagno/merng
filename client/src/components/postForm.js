import React, { useState } from 'react';
import {Form, Button, TextArea} from 'semantic-ui-react';

import {gql, useMutation} from '@apollo/client';
import {useForm} from '../util/hooks';
import {GET_POSTS} from '../graphql/queries';

const FormPost = () => {
    const {handleSubmit,onChange, values} = useForm(createPostCallback,{body: ""});
    const [error,setErrors] = useState({});
    const [addNewPost, { loading }] = useMutation(ADDPOSTMUTATION, {
        update(proxy, result) {

            // Read what its the cache
            const data = proxy.readQuery({query:GET_POSTS});
            const newData = {getPosts: [result.data.createPost, ...data.getPosts]};

            // Rewrite the cache adding the last post, that way we dont have to read from the server
            // Data must have the same structure;
            proxy.writeQuery({query:GET_POSTS, data:newData});
            values.body = "";
        },
        onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors);
        },
        variables : values
    });

    const removeAlerts= (event) => {
        setErrors({});
        onChange(event);
    } 
    function createPostCallback  () {
        addNewPost();
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h4>Post Something new</h4>
          <Form.Field
            control={TextArea}
            label=''
            placeholder='What are you thinking...'
            size="massive"
            value ={values.body}
            name="body"
            onChange={removeAlerts}
            error={ error && error.message ? {  content: error.message , pointing: 'below' } :false}
          />
          <Button color="teal" type="submit" fluid>
              Add Post
          </Button>
        </Form>
      )
}

const ADDPOSTMUTATION = gql`
mutation createPost ($body:String!){ 
        createPost(body:$body) {
            id
            body
            createdAt
            username
            countsComments
            countsLikes
            comments {
                body
            }
        }
	
  }

`;

export default FormPost;
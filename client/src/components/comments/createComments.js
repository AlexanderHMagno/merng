import React, {useState} from 'react';
import {Form, Button} from 'semantic-ui-react';
import {gql, useMutation} from '@apollo/client';


const CreateComment = ({postId}) => {

    const [body, setBody] = useState("");
    const ready = body.trim().length < 1;

    const [createComment] = useMutation(ADDCOMMENT, {
        update (...names) {
            setBody("")
            console.log(names)
        },
        onError (err) {
            console.error(err);
        },
        variables: {
            postId,
            body
        }
    })

    const handleSubmit = () => {
        console.log(postId, body);
        createComment();
    }

    const onChangeBody = (event) => setBody(event.target.value);
    return (                
        <Form onSubmit={handleSubmit}>
            <Form.TextArea value={body} rows="4" placeholder='Any comment?' onChange={onChangeBody} />
            <Button fluid positive type="submit" disabled={ready} >
                <Button.Content visible >Comment</Button.Content>
            </Button>
        </Form>
    )
}

const ADDCOMMENT = gql`
    mutation  createComment ($postId:ID!, $body:String!){
        createComment(postId:$postId body:$body){
            id
            body
            countsComments
            comments {
                id
                body
                user
                createdAt
            }
        }
    }
`;
export default CreateComment;
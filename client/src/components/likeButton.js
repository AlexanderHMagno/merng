import React, { useState, useEffect } from 'react';
import { Button, Icon, Label} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {gql, useMutation} from '@apollo/client';

const LikeButton = ({post:{id:postId, countsLikes,likes}, userLogged}) => {
    
    const [like, setLike] = useState(false);

    //This will be update if the Mutation has the global post ID
    useEffect(()=>{
        if (userLogged) {
            setLike(likes.some(x=> x.username === userLogged.id));
        } else {
            setLike(false);
        }
       ;
    },[likes,userLogged])

    const [toggleMutationLike] = useMutation(TOGGLELIKE, {
        onError (errr) {
            window.location.reload();
        },
        variables: {postId}
    });

    return (
        <Button as={userLogged?'div': Link} to={'/login'} labelPosition='right' onClick={userLogged? toggleMutationLike : null}>
            <Button color='teal' basic={!like}>
                <Icon name='like' />
            </Button>
            <Label  basic color='teal' pointing='left'>
                {countsLikes}
            </Label>
        </Button>
    )
}

const TOGGLELIKE = gql`
    mutation toggleLikes($postId : ID!){
    toggleLikes(postId:$postId ){
        id
        countsLikes
        likes{
            username
        }
    }
    }
`;

export default LikeButton;
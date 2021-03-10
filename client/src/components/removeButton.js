import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Confirm, Header} from 'semantic-ui-react';

import {GET_POSTS} from '../graphql/queries';

const RemoveButton = ({postId,commentId,callback,placeholder, ...rest},  ) =>{
    const [confirmModal, setConfirmModal] = useState(false);
    const USEDELETEMUTATION = commentId? DELETECOMMENT : DELETEPOST;
    const [deletePost] = useMutation(USEDELETEMUTATION, {
        update (cache){
            setConfirmModal(false);
            if (commentId) {
                
            } else {
                const POSTCOLLECTION = cache.readQuery({query:GET_POSTS});
                const newData = {getPosts : POSTCOLLECTION.getPosts.filter( P => P.id !== postId)};
                cache.writeQuery({query:GET_POSTS, data: newData});
            }
           
            if (callback) callback();
        } ,
        onError (e) {
            window.location.reload();
        },
        variables : {
            postId,
            commentId
        }
    })

    return (
        <>
    {placeholder? 
        (<Header   
            {...rest}  
            size="tiny"
            onClick ={() =>setConfirmModal(true)} 
        />)
        :(<Button 
            {...rest}  
            color="red" 
            onClick ={() =>setConfirmModal(true)} 
        />)
    }
    <Confirm
          open={confirmModal}
          content ={`Do you really want to remove this ${commentId? 'comment': 'post'}?`}
          onCancel={() => setConfirmModal(false)}
          onConfirm={deletePost}
          size ="mini"
          confirmButton = "Delete"
        />
        </>
    );    
}

const DELETEPOST = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId:$postId)
    }
`;

const DELETECOMMENT = gql`
    mutation deleteComment ($postId: ID!, $commentId: ID!) {
        deleteComment(postId:$postId, commentId:$commentId) {
            id
            comments {
                id
            }
    }
}
`;


export default RemoveButton;
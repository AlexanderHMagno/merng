import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import {Button, Confirm} from 'semantic-ui-react';

import {GET_POSTS} from '../graphql/queries';

const RemoveButton = ({postId,callback, ...rest},  ) =>{
    const [confirmModal, setConfirmModal] = useState(false);
    const [deletePost] = useMutation(DELETEPOST, {
        update (cache){
            setConfirmModal(false);
            const POSTCOLLECTION = cache.readQuery({query:GET_POSTS});
            const newData = {getPosts : POSTCOLLECTION.getPosts.filter( P => P.id !== postId)};
            cache.writeQuery({query:GET_POSTS, data: newData});
            if (callback) callback();
        } ,
        onError (e) {
          console.log(e)  
        },
        variables : {
            postId
        }
    })

    return (
        <>
    <Button 
        {...rest}  
        color="red" 
        onClick ={() =>setConfirmModal(true)} 
    />
    <Confirm
          open={confirmModal}
          content ='Do you really want to remove this Post?'
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


export default RemoveButton;
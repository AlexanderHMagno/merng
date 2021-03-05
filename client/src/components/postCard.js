import React, {useContext} from 'react';
import { Button, Card, Image, Icon, Label} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/AuthContext';
import LikeButton from '../components/likeButton';

function PostCard ({post:{id,body,createdAt, username, user, countsComments,countsLikes, comments, likes}}) {
    const {user:userLogged} = useContext(AuthContext);
    const removePost =  () => console.log("Removing Post");

    return (
        <Card fluid style={{marginBottom: 20}}>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
                <Card.Description>
                    {body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton post={{id, countsLikes, likes}} userLogged={userLogged}/>
                <Button as={Link} to ={userLogged? `/post/${id}` : '/login'} labelPosition='right'>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label  basic color='blue' pointing='left'>
                        {countsComments}
                    </Label>
                </Button>

                {userLogged && (user === userLogged.id ) && (<Button icon="delete" circular color="red"  floated="right" size="mini" onClick={removePost}/>)}
            </Card.Content>
        </Card>
    )
}



export default PostCard;
import React from 'react';
import { Button, Card, Image, Icon, Label} from 'semantic-ui-react';
import moment from 'moment';
import {Link} from 'react-router-dom';

function PostCard ({post:{id,body,createdAt, username,countsComments,countsLikes, comments}}) {
    
    const toggleLike = () => console.log("Like");
    const DisplayCommments = () => console.log("comments");
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
                <Button as='div' labelPosition='right' onClick={toggleLike}>
                    <Button color='teal' basic>
                        <Icon name='like' />
                    </Button>
                    <Label  basic color='teal' pointing='left'>
                        {countsLikes}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right' onClick={DisplayCommments}>
                    <Button color='blue' basic>
                        <Icon name='comments' />
                    </Button>
                    <Label  basic color='blue' pointing='left'>
                        {countsComments}
                    </Label>
                </Button>

            </Card.Content>
        </Card>
    )
}



export default PostCard;
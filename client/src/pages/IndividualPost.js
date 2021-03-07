import React, { PureComponent, useContext} from 'react';
import {gql, useQuery} from '@apollo/client';
import {Grid, Image, Card, Icon, Header,Button, Label, Divider, Form} from 'semantic-ui-react';
import Moment from 'moment';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/AuthContext';
import Loader from '../util/loader';
import LikeButton from '../components/likeButton';
import RemoveButton from '../components/removeButton';

const IndividualPost = (props) => {

    const {user} = useContext(AuthContext);
    const postId = props.match.params.postId;
    const {loading, error, data} = useQuery(GETPOST, {
        variables : {
            postId
        }
    })

    if (loading) return <Loader/>
    if (!data) props.history.push('/'); //If post dont exits redirect to home
    const {body, countsComments, countsLikes,likes, username, createdAt, id , user:owner} = data.getPost;

    const deletePostCallback = () => props.history.push('/');
return  (
    <Grid className="mt-20">
        <Grid.Column width={4}>
            <Card>
                <Image src='https://react.semantic-ui.com/images/avatar/large/molly.png' wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{username}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Posted: {Moment(createdAt).fromNow(true)}</span>
                    </Card.Meta>
                    <Divider horizontal></Divider>
                    <Card.Content>
                    {user && (owner === user.id ) && (<RemoveButton postId={postId} fluid size="mini" callback={deletePostCallback}>Delete Post</RemoveButton>)}
                    <Button className="mt-20" as={Link} to="/" color="teal"  fluid size="mini" >More Posts</Button>
                    </Card.Content>
                </Card.Content>
            </Card>    
        </Grid.Column>
        <Grid.Column width={9}>
            <Card fluid>
                <Card.Content extra>
                    <Header as='h2' textAlign='center'>
                        <Header.Content>
                            <Icon name="quote left"/>
                                {body}
                            <Icon name="quote right"/>
                        </Header.Content>
                        
                    </Header>
                </Card.Content>

                <Card.Content extra textAlign="right" >
                    <LikeButton post={{id, countsLikes, likes}} userLogged={user}/>
                    <Button as={'div'} labelPosition='right'>
                        <Button color='blue' basic>
                            <Icon name='comments' />
                        </Button>
                        <Label  basic color='blue' pointing='left'>
                            {countsComments}
                        </Label>
                    </Button>
                </Card.Content>
                <Divider horizontal/>

                <Card.Content extra>
                <Form>
                    <Form.TextArea rows="6" placeholder='Any comment?' />
                    <Form.Button>Add Comment</Form.Button>
                </Form>
                </Card.Content>
            </Card>    
        </Grid.Column>
        <Grid.Column width={3}>
        
        </Grid.Column>
    </Grid>
    )
}


const GETPOST = gql`
    query getPost($postId:ID!) {
        getPost(postId:$postId) {
            username
            body
            user
            id
            countsComments
            countsLikes
            likes{
                username
            }
            createdAt
        }
    }
`;


export default IndividualPost;
import React, {useContext} from 'react';
import {gql, useQuery} from '@apollo/client';
import {Grid, Image, Card, Icon, Header,Button, Label, Divider, Segment,Feed, Dropdown} from 'semantic-ui-react';
import Moment from 'moment';
import {Link} from 'react-router-dom';

import {AuthContext} from '../context/AuthContext';
import Loader from '../util/loader';
import LikeButton from '../components/likeButton';
import RemoveButton from '../components/removeButton';
import CreateComment from '../components/comments/createComments';

const IndividualPost = (props) => {

    const {user} = useContext(AuthContext);
    const postId = props.match.params.postId;
    const {loading, data} = useQuery(GETPOST, {
        variables : {
            postId
        }
    })

    const RemoveComment  = (props) => {
        console.log({props});
    }

    if (loading) return <Loader/>
    if (!data) props.history.push('/'); //If post dont exits redirect to home
    const {body, countsComments,comments, countsLikes,likes, username, createdAt, id , user:owner} = data.getPost;
    const newComments = [...comments].reverse();
    
    const deletePostCallback = () => props.history.push('/');
return  (
    <Grid className="mt-20">
        {/* OWNER */}
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

        {/* FEEDER */}
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
                    <CreateComment postId={id}/>
                </Card.Content>
            </Card>

            <Segment>
                {comments.length? 
                    newComments.map(comment => 

                        <Feed key={comment.id}>
                            <Feed.Event>
                            <Feed.Label image='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />    
                            <Feed.Content>
                                <Feed.Date content={Moment(comment.createdAt).fromNow()} />
                                <Feed.Summary>
                                    {comment.body}
                                </Feed.Summary>
                            </Feed.Content>
                            { (comment.user === user.id ) && 
                                <Dropdown
                                    icon='bars'
                                    onChange = {(...props)=> RemoveComment(props)}
                                >
                                    <Dropdown.Menu>
                                    <Dropdown.Item>
                                        <RemoveButton postId={postId} commentId={comment.id} placeholder={true}>  
                                        <Icon name='attention'/> Delete Post
                                        </RemoveButton>
                                    </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            }
                            </Feed.Event>
                            <Divider section />
                        </Feed>
                    ) 
                    : "No comments on this post"
                }
            </Segment>
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
            comments {
                body
                createdAt
                user
                id
            }
            likes{
                username
            }
            createdAt
        }
    }
`;


export default IndividualPost;
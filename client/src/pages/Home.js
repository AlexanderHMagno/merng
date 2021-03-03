import React, {useContext} from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import Loader from '../util/loader';

import PostCard from '../components/postCard';
import PostForm from '../components/postForm';
import {AuthContext} from '../context/AuthContext';
import {GET_POSTS} from '../graphql/queries';

const HOME = () => {
    const {loading, error, data } = useQuery(GET_POSTS);
    const {user} = useContext(AuthContext);
    if (loading) return <Loader/>;
    const Posts = data.getPosts;

    return ( 
     
            <Grid columns={3}>
                <Grid.Row className="PostGroupTitle">
                    <h1 >Recent Posts</h1>
                    
                </Grid.Row>
                <Grid.Row>
                    {/* Add Post */}
                    {user && (
                        <Grid.Column>
                            <PostForm/>
                        </Grid.Column>
                    )}
                    <Transition.Group>
                    {Posts && Posts.map( post => 
                        <Grid.Column key={post.id}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    )
                    }                 
                    </Transition.Group> 
                </Grid.Row>

            </Grid>
     );
}

export default HOME;
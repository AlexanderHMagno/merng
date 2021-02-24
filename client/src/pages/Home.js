import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react'

import PostCard from '../components/postCard';

const HOME = () => {
    const {loading, error, data } = useQuery(GET_POSTS);
    
    if (loading) return 'Loading...';
    const Posts = data.getPosts;

    return ( 
     
            <Grid columns={3}>
                <Grid.Row className="PostGroupTitle">
                    <h1 >Recent Posts</h1>
                </Grid.Row>
                <Grid.Row>

                    {Posts && Posts.map( post => 
                        <Grid.Column key={post.id}>
                            <PostCard post={post}/>
                        </Grid.Column>
                    )
                    }                  
                </Grid.Row>

            </Grid>
     );
}

const GET_POSTS = gql`
    query {
    getPosts {
    id
    body
    createdAt
    username
    countsComments
    countsLikes
    comments{
        id
        body
        createdAt
        user
    }
    likes {
        username
    }
    }
    }
`;

export default HOME;
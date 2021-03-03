import {gql} from '@apollo/client';



export const GET_POSTS = gql`
        query {
            getPosts {
                id body createdAt username user countsComments countsLikes
                comments { id body createdAt user}
                likes {username}
            }
        }
    `;



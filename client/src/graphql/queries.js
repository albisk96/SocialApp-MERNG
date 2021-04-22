import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getPostsQuery($after: String) {
    getPosts(pageSize: 5, after: $after) {
      cursor
      hasMore
      posts {
        id
        body
        createdAt
        cursor
        username
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          createdAt
          body
        }
      }
    }
  }
`;

export const GET_PROFILE_POSTS = gql`
  query getProfilePosts($username: String, $after: String) {
    getProfile(username: $username, pageSize: 5, after: $after) {
      cursor
      hasMore
      posts {
        id
        body
        createdAt
        cursor
        username
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          createdAt
          body
        }
      }
    }
  }
`;

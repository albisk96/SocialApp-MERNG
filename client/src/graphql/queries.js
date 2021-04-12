import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getPostsQuery($after: String) {
    getPosts(pageSize: 1, after: $after) {
      cursor
      hasMore
      posts {
        id
        body
        createdAt
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

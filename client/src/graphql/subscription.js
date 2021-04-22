import gql from "graphql-tag";

export const POST_SUBSCRIPTION = gql`
  subscription OnPostAdded {
    newPost {
      id
      body
      createdAt
      username
      cursor
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
`;

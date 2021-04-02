import { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "react-bootstrap";

import { GET_POSTS } from "../graphql/queries";
import {
  DELETE_COMMENT_MUTATION,
  DELETE_POST_MUTATION,
} from "../graphql/mutations";

const DeleteButton = ({ postId, commentId, callback }) => {
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      if (!commentId) {
        const data = proxy.readQuery({
          query: GET_POSTS,
        });
        data.getPosts = data.getPosts.filter((p) => p.id !== postId);
        proxy.writeQuery({ query: GET_POSTS, data });
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId,
    },
  });
  return (
    <Button
      variant="danger"
      onClick={deletePostOrMutation}
      className="mt-2 mb-2"
    >
      Delete
    </Button>
  );
};

export default DeleteButton;

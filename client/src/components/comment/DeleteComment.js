import { useMutation } from "@apollo/react-hooks";
import { Button } from "react-bootstrap";

import { DELETE_COMMENT_MUTATION } from "../../graphql/mutations";

const DeleteButton = ({ postId, commentId, callbackComment }) => {
  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
    update(proxy, result) {
      callbackComment(result);
    },
    variables: {
      postId,
      commentId,
    },
  });

  return (
    <Button variant="danger" onClick={deleteComment} className="mt-2 mb-2">
      Delete
    </Button>
  );
};

export default DeleteButton;

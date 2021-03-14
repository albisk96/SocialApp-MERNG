import { Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";
// import { AuthContext } from "../context/auth";
import { Input } from "../form/FormInput";

const CreateComment = ({ postId }) => {
  // const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update() {
      setComment("");
    },
    variables: {
      postId,
      body: comment,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div className="ui action input fluid">
        <Input
          type="text"
          placeholder="Comment.."
          name="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <Button
          type="submit"
          variant="outline-primary"
          disabled={comment.trim() === ""}
          onClick={submitComment}
        >
          Add comment
        </Button>
      </div>
    </Form>
  );
};

export default CreateComment;

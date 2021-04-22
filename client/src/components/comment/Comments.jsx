import { Fragment, useCallback } from "react";
import { useContext, useState } from "react";
import moment from "moment";
import { Form, Button } from "react-bootstrap";
import DeleteButton from "./DeleteComment";
import { AuthContext } from "../../context/auth";
import { Input } from "../form/FormInput";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_COMMENT_MUTATION } from "../../graphql/mutations";

const CommentList = ({ post }) => {
  const { comments } = post;
  const { user } = useContext(AuthContext);
  const [number, setNumber] = useState(2);
  const [comment, setComment] = useState("");

  const showMore = comments.length > 2 && number < comments.length && (
    <a href="#!" onClick={() => setNumber(number + 2)}>
      Show more...
    </a>
  );

  const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
    variables: {
      postId: post.id,
      body: comment,
    },
    update(_, result) {
      setComment("");
      post.comments = result.data.createComment.comments;
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function callbackComment(result) {
    post.comments = result.data.deleteComment.comments;
  }

  const showComments = useCallback(() => {
    return post.comments.slice(0, number).map((comment, idx) => (
      <Fragment key={idx}>
        <div
          style={{
            borderRadius: "10px",
            padding: "10px",
            border: "1px solid #6c757d",
            marginBottom: "5px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="brief">
              <a href="#!" className="name mr-2">
                {comment.username}
              </a>
              <p className="date">{moment(comment.createdAt).fromNow()}</p>
            </div>
            <div className="added-text">{comment.body}</div>
          </div>
          <div>
            {user && user.username === comment.username && (
              <DeleteButton
                postId={post.id}
                commentId={comment.id}
                callbackComment={callbackComment}
              />
            )}
          </div>
        </div>
      </Fragment>
    ));
  }, [post.comments]);

  return (
    <>
      <div>
        {showComments()}
        {showMore}
      </div>
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
    </>
  );
};

export default CommentList;

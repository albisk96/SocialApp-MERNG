import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { ButtonGroup, Button } from "react-bootstrap";
import { BsHeartFill } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { LIKE_POST_MUTATION } from "../../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";

const PostActions = ({ post: { id, likeCount, likes, commentCount } }) => {
  const { user } = useContext(AuthContext);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id },
  });

  const likeButton = liked ? (
    <BsHeartFill className="icon-like mr-2 mb-1" />
  ) : (
    <BsHeart className="icon-like mr-2 mb-1" />
  );

  return (
    <ButtonGroup size="lg" className="mb-2 btn-block">
      <Button onClick={likePost} variant="secondary mr-2">
        {likeCount} &nbsp;
        {likeButton}
        Like
      </Button>
      <Button variant="outline-secondary" disabled>
        {commentCount} &nbsp;
        <FaRegComment className="icon-comments mr-2 mb-1" />
        Comments
      </Button>
    </ButtonGroup>
  );
};

export default PostActions;

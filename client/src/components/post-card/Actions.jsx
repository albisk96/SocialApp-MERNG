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
  const [variant, setVariant] = useState("");

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
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Button
        style={{
          color: "white",
          marginBottom: "5px",
        }}
        onMouseEnter={() => setVariant("primary")}
        onMouseLeave={() => setVariant("")}
        onClick={likePost}
        variant={variant}
      >
        {likeCount} &nbsp;
        {likeButton}
        Like
      </Button>
      <div className="mb-3 mt-1">
        {commentCount} &nbsp;
        <FaRegComment className="icon-comments mr-2" />
        Comments
      </div>
    </div>
  );
};

export default PostActions;

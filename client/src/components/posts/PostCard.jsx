import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import moment from "moment";
import PostActions from "./LikesAndComments";
import Comments from "../comment/Comments";
import { AuthContext } from "../../context/auth";

import { GET_POSTS } from "../../graphql/queries";
import { DELETE_POST_MUTATION } from "../../graphql/mutations";

import "./posts.css";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);
  const { body, createdAt, username, id } = post;

  const [deleteMutation] = useMutation(DELETE_POST_MUTATION);

  const removePost = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteMutation({
      variables: { postId: id },
      optimisticResponse: true,
      update: (client) => {
        const existingPosts = client.readQuery({
          query: GET_POSTS,
          variables: { after: null },
        });

        const newResult = existingPosts.getPosts.posts.filter(
          (t) => t.id !== id
        );

        const data = {
          getPosts: {
            cursor: existingPosts.getPosts.cursor,
            hasMore: existingPosts.getPosts.hasMore,
            posts: newResult,
            __typename: existingPosts.getPosts.__typename,
          },
        };

        client.writeQuery({
          query: GET_POSTS,
          variables: { after: null },
          data,
        });
      },
    });
  };

  return (
    <div className="news mt-4 mb-4">
      <div className="label">
        <img
          src="https://mdbootstrap.com/img/Photos/Avatars/img%20(18)-mini.jpg"
          alt=""
          className="rounded-circle z-depth-1-half"
        />
      </div>
      <div className="excerpt">
        <div className="brief">
          <Link to={`/profile/${username}`} className="name mr-2">
            {username}
          </Link>
          <p className="date">{moment(createdAt).fromNow()}</p>
          {user && user.username === username && (
            <div style={{ marginLeft: "auto" }}>
              <Button
                variant="danger"
                onClick={removePost}
                className="mt-2 mb-2"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
        <div className="added-text">{body}</div>

        <div className="feed-footer mt-4">
          <PostActions post={post} user={user} />
          <hr />
          <Comments post={post} />
        </div>
      </div>
    </div>
  );
};
export default PostCard;

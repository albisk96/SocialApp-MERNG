import { useContext } from "react";

import { Button } from "react-bootstrap";
import moment from "moment";
import { GET_PROFILE_POSTS } from "../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import PostActions from "../posts/LikesAndComments";
import Comments from "../comment/Comments";
import { AuthContext } from "../../context/auth";
import { DELETE_POST_MUTATION } from "../../graphql/mutations";

import "./profile.css";

const ProfileCards = ({ post }) => {
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
          query: GET_PROFILE_POSTS,
          variables: { username: user.username, after: null },
        });

        const newResult = existingPosts.getProfile.posts.filter(
          (t) => t.id !== id
        );

        const data = {
          getProfile: {
            cursor: existingPosts.getProfile.cursor,
            hasMore: existingPosts.getProfile.hasMore,
            posts: newResult,
            __typename: existingPosts.getProfile.__typename,
          },
        };

        client.writeQuery({
          query: GET_PROFILE_POSTS,
          variables: { username: user.username, after: null },
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
          <p className="name mr-2">{username}</p>
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
export default ProfileCards;

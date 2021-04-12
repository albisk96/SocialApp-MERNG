import { useContext } from "react";
import { useHistory } from "react-router-dom";
import "./post_card.css";
import moment from "moment";
import PostActions from "./Actions";
import CreateComment from "../comment/CreateComment";
import CommentList from "../comment/CommentList";
import DeleteButton from "../DeleteButton";
import { AuthContext } from "../../context/auth";

const PostCard = ({ post }) => {
  const { user } = useContext(AuthContext);
  let history = useHistory();
  const { body, createdAt, username, id } = post;

  function deletePostCallback() {
    history.push("/feed");
  }

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
          <a href="#!" className="name mr-2">
            {username}
          </a>
          <p className="date">{moment(createdAt).fromNow()}</p>
          {user && user.username === username && (
            <div style={{ marginLeft: "auto" }}>
              <DeleteButton postId={post.id} callback={deletePostCallback} />
            </div>
          )}
        </div>
        <div className="added-text">{body}</div>

        <div className="feed-footer mt-4">
          <PostActions post={post} user={user} />
          <hr />
          <CommentList post={post} />
          <CreateComment postId={id} />
        </div>
      </div>
    </div>
  );
};
export default PostCard;

import "./post_card.css";
import moment from "moment";
import PostActions from "./Actions";
import CreateComment from "../comment/CreateComment";
import CommentList from "../comment/CommentList";

const PostCard = ({ post }) => {
  const {
    body,
    commentCount,
    comments,
    createdAt,
    likeCount,
    username,
    id,
  } = post;

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
        </div>
        <div className="added-text">{body}</div>
        <div className="feed-footer mt-4">
          <hr />
          <PostActions post={post} />
          <CommentList comments={comments} />
          <CreateComment postId={id} />
        </div>
      </div>
    </div>
  );
};
export default PostCard;

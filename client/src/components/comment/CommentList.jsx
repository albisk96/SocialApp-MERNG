import { Fragment } from "react";
import { useContext, useState } from "react";
import moment from "moment";
import DeleteButton from "../DeleteButton";
import { AuthContext } from "../../context/auth";

const CommentList = ({ post }) => {
  const { comments } = post;
  const { user } = useContext(AuthContext);
  const [number, setNumber] = useState(2);

  const showMore = comments.length > 2 && number < comments.length && (
    <a href="#!" onClick={() => setNumber(number + 2)}>
      Show more...
    </a>
  );

  return (
    <div>
      {comments.slice(0, number).map((comment, idx) => (
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
                <DeleteButton postId={post.id} commentId={comment.id} />
              )}
            </div>
          </div>
        </Fragment>
      ))}
      {showMore}
    </div>
  );
};

export default CommentList;

const CommentList = ({ comments }) => {
  return <div>{comments.map((comment) => comment.body)}</div>;
};

export default CommentList;

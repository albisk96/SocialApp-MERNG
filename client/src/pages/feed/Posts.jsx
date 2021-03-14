import Header from "../../components/Header";
import PostCard from "../../components/post-card/PostCard";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS } from "../../graphql/queries";
import "./feed.css";

const Pages = () => {
  const { loading, data } = useQuery(GET_POSTS);
  return (
    <div className="feed">
      <Header />
      <div className="posts-list">
        {data?.getPosts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
};

export default Pages;

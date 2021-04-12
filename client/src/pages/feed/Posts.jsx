import Header from "../../components/navbar/Header";
import PostCard from "../../components/post-card/PostCard";
import { useQuery } from "@apollo/react-hooks";
import { GET_POSTS } from "../../graphql/queries";
// import InfiniteScroll from "react-infinite-scroll-component";

import { Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";

import { useForm } from "../../utils/custom_hooks";
import { Input } from "../../components/form/FormInput";
import { CREATE_POST_MUTATION } from "../../graphql/mutations";

import "./feed.css";

const Pages = () => {
  const { loading, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { after: null },
  });
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_POSTS,
      });
      data.getPosts = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({ query: GET_POSTS, data });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  const loadMore = () => {
    const { cursor } = data?.getPosts;

    fetchMore({
      variables: { after: cursor },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        console.log(fetchMoreResult);
        fetchMoreResult.getPosts.posts = [
          ...prevResult.getPosts.posts,
          ...fetchMoreResult.getPosts.posts,
        ];
        return fetchMoreResult;
      },
    });
  };

  return (
    <>
      <Header />
      <div className="feed">
        <div className="textarea">
          <Form onSubmit={onSubmit}>
            <Input
              type="text"
              placeholder="Hi world!"
              value={values.body}
              name="body"
              onChange={onChange}
              error={error}
              as="textarea"
              rows="3"
            />
            <Button type="submit">Submit</Button>
          </Form>
        </div>
        <div className="posts-list">
          {data?.getPosts.posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
        <button onClick={loadMore}>Load more</button>
      </div>
    </>
  );
};

export default Pages;

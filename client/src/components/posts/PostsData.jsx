import PostCard from "./PostCard";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { GET_POSTS } from "../../graphql/queries";

import { Button, Form } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { useElementOnScreen } from "../../utils/custom_hooks.js";
import LoadingOverlay from "../../utils/Loading";

import { useForm } from "../../utils/custom_hooks";
import { Input } from "../form/FormInput";
import { CREATE_POST_MUTATION } from "../../graphql/mutations";
// import { POST_SUBSCRIPTION } from "../../graphql/subscription";

import "./posts.css";

const Pages = () => {
  const { data, loading: queryLoading, fetchMore, subscribeToMore } = useQuery(
    GET_POSTS,
    {
      variables: { after: null },
      fetchPolicy: "cache-and-network",
    }
  );

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [containerRef, isVisible] = useElementOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    },
    () => loadMore()
  );

  const [createPost, { error, loading: mutationLoading }] = useMutation(
    CREATE_POST_MUTATION,
    {
      variables: values,
      update(proxy, result) {
        const data = proxy.readQuery({
          query: GET_POSTS,
          variables: {
            after: null,
          },
        });

        data.getPosts.posts = [result.data.createPost, ...data.getPosts.posts];
        data.getPosts.posts = data?.getPosts.posts.filter(
          (post, index, self) =>
            index ===
            self.findIndex((t) => t.place === post.place && t.id === post.id)
        );
        proxy.writeQuery({ query: GET_POSTS, data });
        values.body = "";
      },
    }
  );

  function createPostCallback() {
    createPost();
  }

  // useEffect(() => {
  //   const unsubscribe = subscribeToMore({
  //     document: POST_SUBSCRIPTION,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const newFeedItem = subscriptionData.data.newPost;
  //       const exists = prev.getPosts.posts.find(
  //         (post) => post.id === newFeedItem.id
  //       );

  //       if (exists) return prev;
  //       const posts = [...prev.getPosts.posts, newFeedItem];
  //       const data = {
  //         getPosts: {
  //           cursor: prev.getPosts.cursor,
  //           hasMore: prev.getPosts.hasMore,
  //           posts: posts,
  //         },
  //       };

  //       return data;
  //     },
  //   });

  //   return () => unsubscribe();
  // }, []);

  function loadMore() {
    if (!queryLoading && isVisible) {
      fetchMore({
        variables: { after: data?.getPosts?.cursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.getPosts.posts = [
            ...prevResult.getPosts.posts,
            ...fetchMoreResult.getPosts.posts,
          ];
          return fetchMoreResult;
        },
      });
    }
  }

  console.log(data?.getPosts.posts);

  return (
    <LoadingOverlay loading={queryLoading || mutationLoading}>
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
        <div id="list" className="posts-list">
          {data?.getPosts.posts.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}

          <div className="isVisible">
            {data?.getPosts.hasMore && (
              <div
                style={{
                  fontSize: "1rem",
                  display: "flex",
                  justifyContent: "center",
                }}
                ref={containerRef}
              ></div>
            )}
          </div>
        </div>
      </div>
    </LoadingOverlay>
  );
};

export default Pages;

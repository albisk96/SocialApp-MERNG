import { useQuery } from "@apollo/react-hooks";
import { GET_PROFILE_POSTS } from "../../graphql/queries";
import { useMutation } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../utils/Loading";
import { useElementOnScreen } from "../../utils/custom_hooks.js";

import ProfileCards from "./ProfileCards";
import "./profile.css";

const ProfileData = () => {
  const name = useParams().name;
  const { data, loading, fetchMore } = useQuery(GET_PROFILE_POSTS, {
    variables: { username: name, after: null },
  });

  const [containerRef, isVisible] = useElementOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    },
    () => loadMore()
  );
  console.log(data);
  // const [deleteMutation] = useMutation(DELETE_POST_MUTATION, {
  //   update(proxy, result) {
  //     console.log(postId);
  //     const data = proxy.readQuery({
  //       query: GET_PROFILE_POSTS,
  //       variables: { username: name, after: null },
  //     });

  //     data.getProfile.posts = data.getProfile.posts.filter(
  //       (p) => p.id !== postId
  //     );
  //     proxy.writeQuery({ query: GET_PROFILE_POSTS, data });
  //   },
  //   variables: {
  //     postId,
  //   },
  // });

  function loadMore() {
    if (!loading && isVisible) {
      fetchMore({
        variables: { after: data?.getProfile?.cursor },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          fetchMoreResult.getProfile.posts = [
            ...prevResult.getProfile.posts,
            ...fetchMoreResult.getProfile.posts,
          ];
          return fetchMoreResult;
        },
      });
    }
  }

  return (
    <LoadingOverlay loading={loading}>
      <div className="feed">
        <div id="list" className="posts-list">
          {data?.getProfile.posts.map((post) => {
            return <ProfileCards post={post} key={post.id} />;
          })}
          <div className="isVisible">
            {data?.getProfile.hasMore && (
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

export default ProfileData;

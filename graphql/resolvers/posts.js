import { AuthenticationError, UserInputError } from "apollo-server";
import { base64encode } from "nodejs-base64";

import { paginateResults } from "../../utils/paginate.js";

import { Post } from "../../models/Post.js";
import { checkAuth } from "../../utils/check_auth.js";
// import { NEW_POST } from "../typeDefs";

export const postsResolvers = {
  Query: {
    getPosts: async (_, { pageSize = 15, after }) => {
      try {
        const allPosts = await Post.find().sort({ createdAt: -1 });
        const posts = paginateResults({
          after,
          pageSize,
          results: allPosts,
        });
        return {
          posts,
          cursor: posts.length ? posts[posts.length - 1].cursor : null,
          hasMore: posts.length
            ? posts[posts.length - 1].cursor !==
              allPosts[allPosts.length - 1].cursor
            : false,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    getProfile: async (_, args, { pageSize = 15, after }) => {
      try {
        const { username } = args;
        const allPosts = await Post.find().sort({ createdAt: -1 });
        const profilePosts = allPosts.filter(
          (post) => post.username === username
        );
        const posts = paginateResults({
          after,
          pageSize,
          results: profilePosts,
        });
        return {
          posts,
          cursor: posts.length ? posts[posts.length - 1].cursor : null,
          hasMore: posts.length
            ? posts[posts.length - 1].cursor !==
              allPosts[allPosts.length - 1].cursor
            : false,
        };
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    createPost: async (_, { body }, context) => {
      const user = checkAuth(context);

      if (body.trim() === "") {
        throw new Error("Empty post");
      }

      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
        cursor: base64encode(
          `${user.username} ${user.id} ${new Date().toISOString()}`
        ),
      });

      const post = await newPost.save();

      context.pubsub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    deletePost: async (_, { postId }, context) => {
      const user = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    likePost: async (_, { postId }, context) => {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);

      if (post) {
        const liked = post.likes.find((like) => like.username === username);
        if (liked) {
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString(),
          });
        }

        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
  Subscription: {
    newPost: {
      subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
    },
  },
};

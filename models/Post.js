import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  body: String,
  username: String,
  createdAt: String,
  cursor: String,
  comments: [
    {
      body: String,
      username: String,
      createdAt: String,
    },
  ],
  likes: [
    {
      username: String,
      createdAt: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

export const Post = mongoose.model("post", postSchema);

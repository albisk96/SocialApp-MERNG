import mongoose from "mongoose";
import { mongoURI } from "./keys.js";

export const connect = (url = mongoURI, opts = {}) => {
  return mongoose.connect(url, {
    ...opts,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

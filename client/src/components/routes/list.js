import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";

const Main = lazy(() => import("../../pages/feed/Posts"));
const Post = lazy(() => import("../../pages/post/Post"));

export const routes = [
  { path: "/feed", component: Main, exact: true, key: uuidv4() },
  { path: "/post/:id", component: Post, exact: true, key: uuidv4() },
];

import { lazy } from "react";
import { v4 as uuidv4 } from "uuid";

const Main = lazy(() => import("../posts/PostsData"));
const Profile = lazy(() => import("../profile/Profile"));

export const routes = [
  { path: "/feed", component: Main, exact: true, key: uuidv4() },
  { path: "/profile/:name", component: Profile, exact: true, key: uuidv4() },
];

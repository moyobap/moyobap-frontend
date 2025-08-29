import type { RouteObject } from "react-router-dom";
import HomePage from "../pages/home/page";
import MatchPage from "../pages/match/page";
import GroupDetailPage from "../pages/groups/[id]/page";
import NotFoundPage from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";

const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/match", element: <MatchPage /> },
  { path: "/groups/:id", element: <GroupDetailPage /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
];

export default routes;

import type { RouteObject } from "react-router-dom";
import HomePage from "../pages/home/page";
import MatchPage from "../pages/match/page";
import GroupDetailPage from "../pages/groups/[id]/page";
import NotFoundPage from "../pages/NotFound";

const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/match", element: <MatchPage /> },
  { path: "/groups/:id", element: <GroupDetailPage /> },
  { path: "*", element: <NotFoundPage /> },
];

export default routes;

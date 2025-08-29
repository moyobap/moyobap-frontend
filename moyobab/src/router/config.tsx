import type { RouteObject } from "react-router-dom";
import HomePage from "../pages/home/page";
import MatchPage from "../pages/match/page";
import GroupDetailPage from "../pages/groups/[id]/page";

const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/match", element: <MatchPage /> },
  { path: "/groups/:id", element: <GroupDetailPage /> },
];

export default routes;

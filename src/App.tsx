import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import { useEffect } from "react";
import { useUserStore } from "./utils/useUserStore";

export default function App() {
  const loadUserFromStorage = useUserStore(
    (state) => state.loadUserFromStorage
  );

  useEffect(() => {
    loadUserFromStorage();
  }, []);
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

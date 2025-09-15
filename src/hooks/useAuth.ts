import { useState, useEffect } from "react";
import { getAccessToken, clearTokens } from "../utils/tokenStorage";
import { login, logout as apiLogout } from "../services/auth";
import { LoginType } from "../types/auth";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const doLogin = async (
    email: string,
    password: string,
    loginType = LoginType.BASIC
  ) => {
    const { accessToken, refreshToken, nickname } = await login(
      email,
      password,
      loginType
    );
    setIsAuthenticated(true);
    return { accessToken, refreshToken, nickname };
  };

  const doLogout = async () => {
    try {
      await apiLogout();
    } finally {
      clearTokens();
      setIsAuthenticated(false);
    }
  };

  return { isAuthenticated, loading, doLogin, doLogout };
}

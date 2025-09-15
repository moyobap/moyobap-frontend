const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

function safeStorage(): Storage | null {
  try {
    if (typeof window !== "undefined" && window.localStorage)
      return window.localStorage;
  } catch {}
  return null;
}

export function saveTokens(accessToken: string, refreshToken: string) {
  const ls = safeStorage();
  if (!ls) return;
  ls.setItem(ACCESS_TOKEN_KEY, accessToken);
  ls.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getAccessToken(): string | null {
  const ls = safeStorage();
  return ls ? ls.getItem(ACCESS_TOKEN_KEY) : null;
}

export function getRefreshToken(): string | null {
  const ls = safeStorage();
  return ls ? ls.getItem(REFRESH_TOKEN_KEY) : null;
}

export function clearTokens() {
  const ls = safeStorage();
  if (!ls) return;
  ls.removeItem(ACCESS_TOKEN_KEY);
  ls.removeItem(REFRESH_TOKEN_KEY);
}

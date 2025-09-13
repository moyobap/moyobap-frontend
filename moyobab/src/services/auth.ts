import axios from "axios";
import { saveTokens, clearTokens, getAccessToken } from "../utils/tokenStorage";
import { LoginType } from "../types/auth";

interface LoginRequest {
  email: string;
  password: string;
  loginType: string;
}

interface SignupRequest {
  email: string;
  name: string;
  nickname: string;
  birth: string;
  phone: string;
  password: string;
}

interface CheckEmailResponse {
  available: boolean;
  message: string;
}

interface CheckNicknameResponse {
  available: boolean;
  message: string;
}

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

// access token이 있으면 헤더 추가
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export async function login(
  email: string,
  password: string,
  loginType: LoginType = LoginType.BASIC
) {
  const response = await apiClient.post("/auth/login", {
    email,
    password,
    loginType,
  });
  const data = response.data;
  const tokens = data.data;
  saveTokens(tokens.accessToken, tokens.refreshToken);
  return tokens;
}

export async function signup(req: SignupRequest) {
  const response = await apiClient.post("/users/signup", req);
  return response.data;
}

export async function checkEmail(email: string): Promise<CheckEmailResponse> {
  const response = await apiClient.get("/users/check-email", {
    params: { email },
  });
  return response.data.data;
}

export async function checkNickname(
  nickname: string
): Promise<CheckNicknameResponse> {
  const response = await apiClient.get("/users/check-nickname", {
    params: { nickname },
  });
  return response.data.data;
}

export async function logout() {
  await apiClient.post("/auth/logout");
  clearTokens();
}

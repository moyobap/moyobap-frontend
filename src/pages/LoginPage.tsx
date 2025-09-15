import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { FormField } from "../components/form/FormField";
import Button from "../components/base/Button";
import { LoginType } from "../types/auth";
import { useAuth } from "../hooks/useAuth";
import { useUserStore } from "../utils/useUserStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { doLogin } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError(null);
    setLoading(true);
    try {
      const { nickname } = await doLogin(email, password, LoginType.BASIC);
      useUserStore.getState().setUser(nickname);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "로그인 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="로그인">
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="이메일" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>
        <FormField label="비밀번호" htmlFor="password">
          <input
            id="password"
            name="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>
        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={loading}
        >
          {loading ? "로그인 중..." : "로그인"}
        </Button>
        {error && (
          <p className="mt-2 text-sm text-danger text-center">{error}</p>
        )}
      </form>
      <p className="text-sm text-center text-gray-600">
        회원이 아니신가요?{" "}
        <Link to="/signup" className="text-primary hover:underline">
          회원가입
        </Link>
      </p>
    </AuthLayout>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { FormField } from "../components/form/FormField";
import Button from "../components/base/Button";
import { login } from "../services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError(null);
      const tokens = await login(email, password, login.LoginType.BASIC);
      navigate("/");
    } catch (err: any) {
      if (err.response) {
        setError(err.response.data.message || "로그인 실패");
      } else {
        setError("로그인 중 오류 발생");
      }
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
        <Button type="submit" variant="primary" size="md" className="w-full">
          로그인
        </Button>
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

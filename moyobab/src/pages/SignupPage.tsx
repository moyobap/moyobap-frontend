import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { FormField } from "../components/form/FormField";
import Button from "../components/base/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // TODO: 회원가입 API 호출
    navigate("/");
  };

  return (
    <AuthLayout title="회원가입">
      <form onSubmit={onSubmit} className="space-y-4">
        <FormField label="이메일" htmlFor="email">
          <input
            id="email"
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
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>
        <FormField label="비밀번호 확인" htmlFor="confirm">
          <input
            id="confirm"
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>
        <Button type="submit" variant="primary" size="md" className="w-full">
          회원가입
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-primary hover:underline">
          로그인
        </Link>
      </p>
    </AuthLayout>
  );
}

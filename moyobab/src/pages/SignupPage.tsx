import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { FormField } from "../components/form/FormField";
import Button from "../components/base/Button";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [birth, setBirth] = useState("");
  const [phone, setPhone] = useState("");
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
    console.log({
      email,
      name,
      nickname,
      birth,
      phone,
      password,
    });

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

        <FormField label="이름" htmlFor="name">
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>

        <FormField label="닉네임" htmlFor="nickname">
          <input
            id="nickname"
            type="text"
            required
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>

        <FormField label="생년월일" htmlFor="birth">
          <input
            id="birth"
            type="date"
            required
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </FormField>

        <FormField label="전화번호" htmlFor="phone">
          <input
            id="phone"
            type="tel"
            placeholder="010-1234-5678"
            pattern="^010-\d{4}-\d{4}$"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

      <p className="text-sm text-center text-gray-600 mt-4">
        이미 계정이 있으신가요?{" "}
        <Link to="/login" className="text-primary hover:underline">
          로그인
        </Link>
      </p>
    </AuthLayout>
  );
}

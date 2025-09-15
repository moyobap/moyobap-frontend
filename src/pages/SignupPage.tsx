import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/layout/AuthLayout";
import { FormField } from "../components/form/FormField";
import Button from "../components/base/Button";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  checkEmailAvailable,
  checkNicknameAvailable,
  signup,
} from "../services/auth";
import debounce from "lodash.debounce";
import { LoginType } from "../types/auth";

interface SignupFormValues {
  email: string;
  name: string;
  nickname: string;
  birth: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  email: yup
    .string()
    .required("이메일은 필수입니다.")
    .email("올바른 이메일 형식이 아닙니다."),
  name: yup.string().required("이름은 필수입니다."),
  nickname: yup.string().required("닉네임은 필수입니다."),
  birth: yup
    .string()
    .required("생년월일은 필수입니다.")
    .test("is-valid-date", "올바른 날짜 형식이어야 합니다.", (value) => {
      return Boolean(value && !isNaN(Date.parse(value)));
    })
    .test("is-not-future", "미래 날짜는 선택할 수 없습니다.", (value) => {
      return value ? new Date(value) <= new Date() : false;
    }),
  phone: yup
    .string()
    .required("전화번호는 필수입니다.")
    .matches(/^010-\d{4}-\d{4}$/, "전화번호 형식은 010-1234-5678입니다."),
  password: yup
    .string()
    .required("비밀번호는 필수입니다.")
    .min(8, "비밀번호는 최소 8자 이상이어야 합니다."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다.")
    .required("비밀번호 확인이 필요합니다."),
});

export default function SignupPage() {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, touchedFields },
    setError,
    clearErrors,
    watch,
  } = useForm<SignupFormValues>({
    mode: "onBlur", // blur 시 유효성 + async 검증
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      name: "",
      nickname: "",
      birth: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 디바운스를 통한 이메일/닉네임 중복체크
  const debouncedCheckEmail = React.useRef(
    debounce(async (value: string) => {
      try {
        const res = await checkEmailAvailable(value);
        if (!res.available) {
          setError("email", {
            type: "manual",
            message: "이미 사용 중인 이메일입니다.",
          });
        } else {
          clearErrors("email");
        }
      } catch (error) {
        setError("email", {
          type: "manual",
          message: "이메일 중복 확인 중 오류가 발생했습니다.",
        });
      }
    }, 500)
  ).current;

  const debouncedCheckNickname = React.useRef(
    debounce(async (value: string) => {
      try {
        const res = await checkNicknameAvailable(value);

        if (!res.available) {
          setError("nickname", {
            type: "manual",
            message: "이미 사용 중인 닉네임입니다.",
          });
        } else {
          clearErrors("nickname");
        }
      } catch (error) {
        setError("nickname", {
          type: "manual",
          message: "닉네임 중복 확인 중 오류가 발생했습니다.",
        });
      }
    }, 500)
  ).current;

  const emailValue = watch("email");
  const nicknameValue = watch("nickname");

  useEffect(() => {
    if (emailValue && !errors.email) {
      debouncedCheckEmail(emailValue);
    }

    return () => {
      debouncedCheckEmail.cancel();
    };
  }, [emailValue]);

  useEffect(() => {
    if (nicknameValue) {
      debouncedCheckNickname(nicknameValue);
    }
    return () => {
      debouncedCheckNickname.cancel();
    };
  }, [nicknameValue]);

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await signup({
        email: data.email,
        username: data.name,
        nickname: data.nickname,
        birthDate: new Date(data.birth).toISOString().slice(0, 10),
        phoneNumber: data.phone,
        password: data.password,
        loginType: LoginType.BASIC,
      });

      navigate("/login");
    } catch (err: any) {
      // 서버 응답 오류 메시지 처리
      if (err.response) {
        const msg =
          err.response.data.message || "회원가입 중 오류가 발생했습니다.";

        if (err.response.status === 409) {
          const field = err.response.data.field;
          if (field === "email") {
            setError("email", { type: "manual", message: msg });
          } else if (field === "nickname") {
            setError("nickname", { type: "manual", message: msg });
          } else {
            alert(msg);
          }
        } else {
          alert(msg);
        }
      } else {
        alert("서버 연결 실패");
      }
    }
  };

  return (
    <AuthLayout title="회원가입">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField label="이메일" htmlFor="email">
          <input
            id="email"
            {...register("email")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.email ? "border-danger" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <span className="text-sm text-danger">{errors.email.message}</span>
          )}
        </FormField>

        <FormField label="이름" htmlFor="name">
          <input
            id="name"
            {...register("name")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.name ? "border-danger" : "border-gray-300"
            }`}
          />
          {errors.name && (
            <span className="text-sm text-danger">{errors.name.message}</span>
          )}
        </FormField>

        <FormField label="닉네임" htmlFor="nickname">
          <input
            id="nickname"
            {...register("nickname")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.nickname ? "border-danger" : "border-gray-300"
            }`}
          />
          {errors.nickname && (
            <span className="text-sm text-danger">
              {errors.nickname.message}
            </span>
          )}
        </FormField>

        <FormField label="생년월일" htmlFor="birth">
          <input
            id="birth"
            type="date"
            {...register("birth")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.birth ? "border-danger" : "border-gray-300"
            }`}
          />
          {errors.birth && (
            <span className="text-sm text-danger">{errors.birth.message}</span>
          )}
        </FormField>

        <FormField label="전화번호" htmlFor="phone">
          <input
            id="phone"
            placeholder="010-1234-5678"
            {...register("phone")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.phone ? "border-danger" : "border-gray-300"
            }`}
          />
          {errors.phone && (
            <span className="text-sm text-danger">{errors.phone.message}</span>
          )}
        </FormField>

        <FormField label="비밀번호" htmlFor="password">
          <input
            id="password"
            type="password"
            {...register("password")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.password ? "border-danger" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <span className="text-sm text-danger">
              {errors.password.message}
            </span>
          )}
        </FormField>

        <FormField label="비밀번호 확인" htmlFor="confirmPassword">
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.confirmPassword ? "border-danger" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-danger">
              {errors.confirmPassword.message}
            </span>
          )}
        </FormField>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className={`w-full transition-colors ${
            !isValid || isSubmitting
              ? "bg-blue-200 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
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

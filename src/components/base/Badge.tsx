import React from "react";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md";
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "default",
  size = "md",
  children,
  className = "",
}: BadgeProps) {
  const baseClasses =
    "inline-flex items-center font-medium rounded-full whitespace-nowrap";

  const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-700",
    danger: "bg-red-100 text-red-600",
  };

  const sizeClasses: Record<NonNullable<BadgeProps["size"]>, string> = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-2.5 py-0.5",
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}

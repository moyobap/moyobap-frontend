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

  const variantClasses = {
    default: "bg-gray-100 text-gray-800",
    success: "bg-[#1DB954]/10 text-[#1DB954]",
    warning: "bg-[#F59E0B]/10 text-[#F59E0B]",
    danger: "bg-[#EF4444]/10 text-[#EF4444]",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-0.5 text-sm",
  };

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </span>
  );
}

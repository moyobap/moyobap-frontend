export interface User {
  id: string;
  nickname: string;
  avatarUrl?: string;
  preferredRadiusKm: number;
  preferredCategories: string[];
}

export interface Brand {
  id: string;
  name: string;
  category: string;
  image?: string;
  minOrderAmount: number;
  deliveryFee: number;
}

export interface GroupMember {
  userId: string;
  nickname: string;
  joinedAt: Date;
  cartTotal: number;
}

export interface Group {
  id: string;
  brand: Brand;
  hostUserId: string;
  distanceKm: number;
  minAmount: number;
  deliveryFee: number;
  deadline: Date;
  members: GroupMember[];
  status: "OPEN" | "FULL" | "EXPIRED" | "CHECKOUT";
  total: number;
  progressPct: number;
}

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";
export type AlertType = "info" | "success" | "warning" | "error";

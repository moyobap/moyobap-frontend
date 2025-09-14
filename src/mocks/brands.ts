import type { Brand } from "../types";

export const brands: Brand[] = [
  {
    id: "brand-1",
    name: "맥도날드",
    category: "패스트푸드",
    minOrderAmount: 15000,
    deliveryFee: 3000,
  },
  {
    id: "brand-2",
    name: "교촌치킨",
    category: "치킨",
    minOrderAmount: 20000,
    deliveryFee: 2500,
  },
  {
    id: "brand-3",
    name: "피자헛",
    category: "피자",
    minOrderAmount: 22000,
    deliveryFee: 3000,
  },
];

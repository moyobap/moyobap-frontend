import type { Group } from "../types";

export const mockGroups: Group[] = [
  {
    id: "group-1",
    brand: {
      id: "brand-1",
      name: "맥도날드",
      category: "패스트푸드",
      minOrderAmount: 15000,
      deliveryFee: 3000,
    },
    hostUserId: "user-1",
    distanceKm: 0.8,
    minAmount: 15000,
    deliveryFee: 3000,
    deadline: new Date(Date.now() + 20 * 60 * 1000),
    members: [
      {
        userId: "user-1",
        nickname: "테스트유저1",
        joinedAt: new Date(),
        cartTotal: 8500,
      },
      {
        userId: "user-2",
        nickname: "테스트유저2",
        joinedAt: new Date(),
        cartTotal: 8500,
      },
    ],
    status: "OPEN",
    total: 17000,
    progressPct: Math.round((17000 / 15000) * 100),
  },
];

export interface Group {
  id: number;
  menuCategory: string;
  brandName: string;
  expectedAmount: number;
  maxDistance: number;
  durationMinutes: number;
  deadlineTime: string;
  currentOrderAmount: number;
  closed: boolean;
  creatorId: number;
}

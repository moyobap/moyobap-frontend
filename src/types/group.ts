export interface Group {
  id: number;
  menuCategory: string;
  brandName: string;
  expectedAmount: number;
  maxDistance: number;
  deadlineTime: string;
  currentOrderAmount: number;
  closed: boolean;
  creatorNickname: string;
}

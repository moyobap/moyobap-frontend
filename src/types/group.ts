export interface BrandInfo {
  name: string;
  category: string;
}

export interface Group {
  id: number;
  menuCategory: string;
  brandName: string;
  expectedAmount: number;
  maxDistance: number;
  deadlineTime: string;
  closed: boolean;
  currentOrderAmount: number;
  creatorNickname: string;
}

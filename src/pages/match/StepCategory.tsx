import React from "react";
import Button from "../../components/base/Button";

type Category = {
  key: string;
  displayName: string;
};

const categories: Category[] = [
  { key: "CHICKEN", displayName: "치킨" },
  { key: "PIZZA", displayName: "피자" },
  { key: "KOREAN", displayName: "한식" },
  { key: "CHINESE", displayName: "중식" },
  { key: "CAFE", displayName: "카페/디저트" },
  { key: "FASTFOOD", displayName: "패스트푸드" },
  { key: "SNACK", displayName: "분식" },
  { key: "SUSHI", displayName: "돈까스/회" },
  { key: "STEW", displayName: "찜/탕" },
  { key: "NIGHT", displayName: "야식" },
  { key: "MEAT", displayName: "고기" },
  { key: "LUNCHBOX", displayName: "도시락" },
  { key: "WESTERN", displayName: "양식" },
  { key: "ASIAN", displayName: "아시안" },
];

interface Props {
  selectedCategory: Category | null;
  onSelectCategory: (cat: Category) => void;
  onNext: () => void;
}

export default function StepCategory({
  selectedCategory,
  onSelectCategory,
  onNext,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">카테고리 선택</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {categories.map((cat) => (
          <div
            key={cat.key}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedCategory?.key === cat.key
                ? "border-primary bg-primary/10"
                : "border-gray-200 hover:border-primary"
            }`}
            onClick={() => onSelectCategory(cat)}
          >
            <span className="text-lg font-medium">{cat.displayName}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button variant="primary" onClick={onNext} disabled={!selectedCategory}>
          다음
        </Button>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import type { Group } from "../../types/group";

interface Props {
  group: Group;
}

export default function GroupCard({ group }: Props) {
  const hasReachedMinimum = group.currentOrderAmount >= group.expectedAmount;

  return (
    <Link to={`/groups/${group.id}`}>
      <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition">
        <h3 className="text-lg font-semibold mb-1">{group.brandName}</h3>
        <p className="text-sm text-gray-500 mb-2">{group.menuCategory}</p>
        <p className="text-sm text-gray-700 mb-2">
          최소 주문금액: {group.expectedAmount.toLocaleString()}원
        </p>
        <p
          className={`text-sm mb-2 ${hasReachedMinimum ? "text-green-600" : "text-gray-700"}`}
        >
          {hasReachedMinimum ? "✅ 최소 주문금액 달성됨" : "⏳ 모집 중"}
        </p>
        <p className="text-xs text-gray-500 mb-1">
          생성자: {group.creatorNickname}
        </p>
        <p className="text-xs text-gray-500">
          마감 시간: {new Date(group.deadlineTime).toLocaleString()}
        </p>
      </div>
    </Link>
  );
}

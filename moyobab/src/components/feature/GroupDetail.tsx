import Countdown from "../base/Countdown";
import Progress from "../base/Progress";
import Button from "../base/Button";
import type { Group } from "../../types";

interface Props {
  group: Group;
}

export default function GroupDetail({ group }: Props) {
  const progress = group.progressPct;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {group.brand.name} 공동주문
        </h2>
        <div className="flex items-center text-sm text-gray-600 mb-4 gap-4">
          <span>
            <i className="ri-map-pin-line mr-1" /> {group.distanceKm}km 거리
          </span>
          <span>
            <i className="ri-group-line mr-1" /> {group.members.length}명 참여
          </span>
          <span className="ml-auto">
            <Countdown targetDate={group.deadline} />
          </span>
        </div>

        <div className="mb-6">
          <span className="text-sm text-gray-700 block mb-1">
            최소 주문금액 달성도
          </span>
          <Progress value={progress} showLabel />
          <div className="text-sm text-right text-gray-600 mt-1">
            {group.total.toLocaleString()}원 /{" "}
            {group.minAmount.toLocaleString()}원
          </div>
        </div>

        <Button variant="primary" className="w-full mb-6">
          그룹 참여하기
        </Button>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">참여자 목록</h3>
          <ul className="divide-y divide-gray-200 bg-white rounded-lg border">
            {group.members.map((m) => (
              <li
                key={m.userId}
                className="flex items-center justify-between px-4 py-3 text-sm"
              >
                <span>{m.nickname}</span>
                <span>{m.cartTotal.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">주문 요약</h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>음식 총액</span>
              <span>0원</span>
            </div>
            <div className="flex justify-between">
              <span>배달비</span>
              <span>{group.deliveryFee.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>인당 배달비</span>
              <span>
                {Math.round(
                  group.deliveryFee / Math.max(1, group.members.length)
                ).toLocaleString()}
                원
              </span>
            </div>
            <div className="flex justify-between font-semibold mt-2">
              <span>전체 금액</span>
              <span>{group.deliveryFee.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        <div className="bg-white border rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-2">실시간 활동</h3>
          <div className="text-sm text-gray-600">
            누군가 메뉴를 추가했습니다. <br /> 오전 2:00:23
          </div>
        </div>
      </div>
    </div>
  );
}

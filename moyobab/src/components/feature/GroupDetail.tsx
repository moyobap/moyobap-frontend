import React from "react";
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
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            {group.brand.name} 공동주문
          </h2>
          <div className="flex items-center text-sm text-gray-600 gap-6">
            <span className="flex items-center gap-1">
              <i className="ri-map-pin-line" aria-hidden="true" />{" "}
              {group.distanceKm} km
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-group-line" aria-hidden="true" />{" "}
              {group.members.length}명 참여
            </span>
            <div className="flex items-center gap-1 ml-auto">
              <i className="ri-time-line" aria-hidden="true" />{" "}
              <Countdown targetDate={group.deadline} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <span className="text-sm text-gray-700 block mb-1">
            최소 주문금액 달성도
          </span>
          <Progress value={progress} showLabel />
          <div className="text-sm text-right text-gray-600 mt-1">
            {group.total.toLocaleString()}원 /{" "}
            {group.minAmount.toLocaleString()}원
          </div>
        </div>

        <Button variant="primary" className="w-full mt-4">
          그룹 참여하기
        </Button>

        <div className="bg-white rounded-lg shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3">참여자 목록</h3>
          <ul className="divide-y divide-gray-200">
            {group.members.map((member) => (
              <li
                key={member.userId}
                className="flex justify-between py-3 text-sm text-gray-700"
              >
                <span>{member.nickname}</span>
                <span>{member.cartTotal.toLocaleString()}원</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3">주문 요약</h3>
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

        <div className="bg-white rounded-lg shadow-sm p-5 text-sm text-gray-600">
          <h3 className="font-semibold text-gray-800 mb-2">실시간 활동</h3>

          <p>
            유승인님이 메뉴를 추가했습니다. <br />
            <time>2분 전</time>
          </p>
        </div>
      </aside>
    </div>
  );
}

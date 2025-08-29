import Button from "../../components/base/Button";
import type { Brand } from "../../types";

interface Props {
  brand: Brand;
  minAmount: number;
  distanceKm: number;
  durationMinutes: number;
  onBack: () => void;
}

export default function StepConfirm({
  brand,
  minAmount,
  distanceKm,
  durationMinutes,
  onBack,
}: Props) {
  const handleSubmit = () => {
    // TODO: 추후 POST API 연동 필요
    console.log("[그룹 생성]", {
      brandId: brand.id,
      minAmount,
      distanceKm,
      durationMinutes,
    });
    alert("그룹이 생성되었습니다!");
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">최종 확인</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-gray-800 font-medium mb-4">그룹 정보 확인</h3>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>브랜드</span>
            <span>{brand.name}</span>
          </div>
          <div className="flex justify-between">
            <span>예상 주문 금액</span>
            <span>{minAmount.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between">
            <span>최대 거리</span>
            <span>{distanceKm}km</span>
          </div>
          <div className="flex justify-between">
            <span>모집 시간</span>
            <span>{durationMinutes}분</span>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-gray-700 mb-8">
        <div className="flex items-start gap-2">
          <i className="ri-information-line text-blue-500 text-lg mt-0.5" />
          <ul className="list-disc list-inside space-y-1">
            <li>최소 주문금액 달성 시 자동으로 주문이 진행됩니다</li>
            <li>시간 내 최소금액이 모이지 않으면 그룹이 해산됩니다</li>
            <li>배달비는 참여 인원으로 균등 분할됩니다</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          이전
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          그룹 생성하기
        </Button>
      </div>
    </div>
  );
}

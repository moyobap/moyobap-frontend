import Button from "../../components/base/Button";
import type { KakaoPlaceDto } from "../../types/place";

interface Props {
  category: {
    key: string;
    displayName: string;
  };
  minAmount: number;
  distanceKm: number;
  durationMinutes: number;
  place: KakaoPlaceDto;
  onBack: () => void;
}

export default function StepConfirm({
  category,
  minAmount,
  distanceKm,
  durationMinutes,
  place,
  onBack,
}: Props) {
  const handleSubmit = async () => {
    // 예시 POST API 호출
    const body = {
      categoryKey: category.key,
      placeName: place.placeName,
      address: place.addressName,
      phone: place.phone,
      minOrderAmount: minAmount,
      radiusMeters: distanceKm * 1000,
      durationMinutes: durationMinutes,
    };
    try {
      console.log("[그룹 생성 요청]", body);
      alert("그룹이 생성되었습니다!");
    } catch (err) {
      console.error(err);
      alert("그룹 생성에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">최종 확인</h2>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h3 className="text-gray-800 font-medium mb-4">그룹 정보 확인</h3>

        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>선택한 음식점</span>
            <span className="font-semibold text-primary">
              {place.placeName}
            </span>
          </div>
          <div className="flex justify-between">
            <span>주소</span>
            <span>{place.addressName}</span>
          </div>
          {place.phone && (
            <div className="flex justify-between">
              <span>전화번호</span>
              <span>{place.phone}</span>
            </div>
          )}
          <hr className="my-3" />

          <div className="flex justify-between">
            <span>카테고리</span>
            <span>{category.displayName}</span>
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

import Button from "../../components/base/Button";

interface Props {
  minAmount: number;
  setMinAmount: (v: number) => void;
  distanceKm: number;
  setDistanceKm: (v: number) => void;
  durationMinutes: number;
  setDurationMinutes: (v: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function StepCondition({
  minAmount,
  setMinAmount,
  distanceKm,
  setDistanceKm,
  durationMinutes,
  setDurationMinutes,
  onNext,
  onBack,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">조건 설정</h2>

      <div className="space-y-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            예상 주문 금액
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8DEF] focus:outline-none"
              value={minAmount}
              onChange={(e) => setMinAmount(Number(e.target.value))}
              min={0}
            />
            <span className="text-sm text-gray-600">원</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            최대 거리:{" "}
            <span className="text-[#5B8DEF]">{distanceKm.toFixed(1)}km</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={distanceKm}
            onChange={(e) => setDistanceKm(parseFloat(e.target.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0.5km</span>
            <span>3km</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            모집 시간
          </label>
          <select
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(Number(e.target.value))}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8DEF] focus:outline-none"
          >
            {[10, 20, 30, 40, 60].map((min) => (
              <option key={min} value={min}>
                {min}분
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          이전
        </Button>
        <Button variant="primary" onClick={onNext}>
          다음
        </Button>
      </div>
    </div>
  );
}

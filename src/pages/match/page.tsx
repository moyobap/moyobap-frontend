import { useState, useEffect } from "react";
import Header from "../../components/layout/Header";
import StepCategory from "./StepCategory";
import StepCondition from "./StepCondition";
import StepResults from "./StepResults";
import StepConfirm from "./StepConfirm";

type Step = 1 | 2 | 3 | 4;

export default function MatchPage() {
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<{
    key: string;
    displayName: string;
  } | null>(null);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [distanceKm, setDistanceKm] = useState<number>(1);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);

  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  const goNext = () => setStep((p) => (p < 4 ? ((p + 1) as Step) : p));
  const goBack = () => setStep((p) => (p > 1 ? ((p - 1) as Step) : p));

  // 위치 정보 가져오는 로직 추가
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("이 브라우저에서는 위치 정보가 지원되지 않습니다.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => {
        setLocationError(
          "위치 정보를 가져올 수 없습니다. 위치 접근을 허용해주세요."
        );
        console.error(error);
      }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex justify-between mb-8">
          {["카테고리", "조건 설정", "검색 결과", "최종 확인"].map(
            (label, i) => (
              <div
                key={i}
                className={`flex-1 text-center py-2 border-b-2 ${
                  step === i + 1
                    ? "border-primary text-primary font-semibold"
                    : "border-gray-200 text-gray-400"
                }`}
              >
                {i + 1}. {label}
              </div>
            )
          )}
        </div>

        {step === 1 && (
          <StepCategory
            selectedCategory={category}
            onSelectCategory={(cat) => setCategory(cat)}
            onNext={goNext}
          />
        )}
        {step === 2 && category && (
          <StepCondition
            minAmount={minAmount}
            setMinAmount={setMinAmount}
            distanceKm={distanceKm}
            setDistanceKm={setDistanceKm}
            durationMinutes={durationMinutes}
            setDurationMinutes={setDurationMinutes}
            onNext={goNext}
            onBack={goBack}
          />
        )}
        {step === 3 && category && latitude && longitude && (
          <StepResults
            categoryKey={category.key}
            lat={latitude}
            lng={longitude}
            radius={distanceKm * 1000}
            onBack={goBack}
            onNext={goNext}
          />
        )}
        {step === 4 && category && (
          <StepConfirm
            category={category}
            minAmount={minAmount}
            distanceKm={distanceKm}
            durationMinutes={durationMinutes}
            onBack={goBack}
          />
        )}
      </div>
    </div>
  );
}

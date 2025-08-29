import { useState } from "react";
import Header from "../../components/layout/Header";
import StepBrand from "./StepBrand";
import StepCondition from "./StepCondition";
import StepConfirm from "./StepConfirm";
import type { Brand } from "../../types";

type Step = 1 | 2 | 3;

export default function MatchPage() {
  const [step, setStep] = useState<Step>(1);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [minAmount, setMinAmount] = useState<number>(15000);
  const [distanceKm, setDistanceKm] = useState<number>(1);
  const [durationMinutes, setDurationMinutes] = useState<number>(30);

  const goNext = () => setStep((prev) => Math.min(prev + 1, 3) as Step);
  const goBack = () => setStep((prev) => Math.max(prev - 1, 1) as Step);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-3xl mx-auto py-10 px-4">
        <div className="flex justify-between mb-8">
          {["브랜드 선택", "조건 설정", "최종 확인"].map((label, i) => (
            <div
              key={i}
              className={`flex-1 text-center py-2 border-b-2 ${
                step === i + 1
                  ? "border-[#5B8DEF] text-[#5B8DEF] font-semibold"
                  : "border-gray-200 text-gray-400"
              }`}
            >
              <span className="text-sm">
                {" "}
                {i + 1}. {label}{" "}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <StepBrand
            selectedBrand={selectedBrand}
            onSelectBrand={(brand) => setSelectedBrand(brand)}
            onNext={goNext}
          />
        )}

        {step === 2 && selectedBrand && (
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

        {step === 3 && selectedBrand && (
          <StepConfirm
            brand={selectedBrand}
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

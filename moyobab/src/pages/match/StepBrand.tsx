import { brands } from "../../mocks/brands";
import type { Brand } from "../../types";
import Button from "../../components/base/Button";
import Card, { CardBody } from "../../components/base/Card";

interface Props {
  selectedBrand: Brand | null;
  onSelectBrand: (brand: Brand) => void;
  onNext: () => void;
}

export default function StepBrand({
  selectedBrand,
  onSelectBrand,
  onNext,
}: Props) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2">브랜드 선택</h2>
      <p className="text-sm text-gray-600 mb-4">
        주문하고 싶은 브랜드를 선택해주세요
      </p>

      <div className="space-y-3 mb-6">
        {brands.map((brand) => (
          <Card
            key={brand.id}
            hover
            onClick={() => onSelectBrand(brand)}
            className={`border ${
              selectedBrand?.id === brand.id
                ? "border-[#5B8DEF]"
                : "border-gray-200"
            }`}
          >
            <CardBody className="p-4 flex justify-between items-center">
              <div>
                <h3 className="text-gray-900 font-medium">{brand.name}</h3>
                <p className="text-sm text-gray-600">{brand.category}</p>
              </div>
              <div className="text-right text-sm text-gray-700 leading-snug">
                <p>최소주문 {brand.minOrderAmount.toLocaleString()}원</p>
                <p>배달비 {brand.deliveryFee.toLocaleString()}원</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="flex justify-end">
        <Button onClick={onNext} disabled={!selectedBrand} variant="primary">
          다음
        </Button>
      </div>
    </div>
  );
}

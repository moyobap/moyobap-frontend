import { useEffect, useState } from "react";
import type { KakaoPlaceDto } from "../../types/place";
import { apiPlacesSearch } from "../../services/placeApi";
import Button from "../../components/base/Button";

interface Props {
  categoryKey: string;
  lat: number;
  lng: number;
  radius: number;
  onBack: () => void;
  onNext: () => void;
  onSelectPlace: (place: KakaoPlaceDto) => void;
}

export default function StepResults({
  categoryKey,
  lat,
  lng,
  radius,
  onBack,
  onNext,
  onSelectPlace,
}: Props) {
  const [places, setPlaces] = useState<KakaoPlaceDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await apiPlacesSearch(categoryKey, lat, lng, radius);
        setPlaces(resp);
      } catch (err: any) {
        setError(err.message || "장소 검색 오류");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [categoryKey, lat, lng, radius]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">검색 결과</h2>
      {loading && <p>로딩 중...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!loading && !error && places.length === 0 && (
        <p>조건에 맞는 장소가 없습니다.</p>
      )}
      <ul className="space-y-4">
        {places.map((place, idx) => (
          <li
            key={idx}
            className="border p-4 rounded-lg cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectPlace(place)} // 클릭 시 전달
          >
            <h3 className="text-lg font-medium">{place.placeName}</h3>
            <p>{place.addressName}</p>
            <p>{place.phone}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-between mt-6">
        <Button variant="secondary" onClick={onBack}>
          이전
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          disabled={places.length === 0}
        >
          다음
        </Button>
      </div>
    </div>
  );
}

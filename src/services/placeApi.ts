import axios from "axios";
import type { KakaoPlaceDto } from "../types/place";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/v1",
  timeout: 10000,
});

export async function apiPlacesSearch(
  categoryKey: string,
  latitude: number,
  longitude: number,
  radiusMeters: number
): Promise<KakaoPlaceDto[]> {
  const resp = await apiClient.get<{ data: KakaoPlaceDto[] }>(
    "/places/search",
    {
      params: {
        category: categoryKey,
        lat: latitude,
        lng: longitude,
        radius: radiusMeters,
      },
    }
  );
  return resp.data.data;
}

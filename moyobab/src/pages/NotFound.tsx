import { Link } from "react-router-dom";
import Button from "../components/base/Button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#5B8DEF] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-gray-600 mb-6">
          존재하지 않는 경로이거나, 주소가 잘못되었을 수 있어요.
        </p>
        <Link to="/">
          <Button variant="primary" size="md">
            홈으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}

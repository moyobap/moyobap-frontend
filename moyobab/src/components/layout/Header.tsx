import { Link, useLocation } from "react-router-dom";

const navItems = [
  { label: "홈", path: "/" },
  { label: "그룹 생성", path: "/match" },
  { label: "주문 내역", path: "/orders" },
  { label: "프로필", path: "/profile" },
];

export default function Header() {
  const location = useLocation();

  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  if (isAuthPage) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold flex items-center space-x-1"
          style={{ fontFamily: '"Pacifico", serif' }}
        >
          <span className="text-[#5B8DEF]">Moyo</span>
          <span className="text-gray-800">Bob</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-[#5B8DEF]"
                  : "text-gray-600 hover:text-[#5B8DEF]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2 text-sm">
          {/* TODO: 로그인 상태 확인 후 분기처리 필요 */}
          <Link
            to="/login"
            className="text-gray-600 hover:text-[#5B8DEF] transition-colors hidden sm:inline-block"
          >
            로그인
          </Link>
          <Link
            to="/signup"
            className="text-gray-600 hover:text-[#5B8DEF] transition-colors hidden sm:inline-block"
          >
            회원가입
          </Link>
        </div>
      </div>
    </header>
  );
}

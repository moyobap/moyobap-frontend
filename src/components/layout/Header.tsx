import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserStore } from "../../utils/useUserStore";

const navItems = [
  { label: "홈", path: "/" },
  { label: "그룹 생성", path: "/match" },
  { label: "주문 내역", path: "/orders" },
  { label: "프로필", path: "/profile" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { nickname, isLoggedIn, logout } = useUserStore();

  const isAuthPage = ["/login", "/signup"].includes(location.pathname);
  if (isAuthPage) return null;

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-1 text-2xl font-bold">
          <span className="text-primary">Moyo</span>
          <span className="text-gray-900">Bob</span>
        </Link>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:flex space-x-4">
          {isLoggedIn ? (
            <>
              <span className="text-gray-700 font-medium">{nickname}님</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

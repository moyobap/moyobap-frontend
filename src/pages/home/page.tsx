import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import type { Group } from "../../types";
import { api } from "../../services/api";
import Header from "../../components/layout/Header";
import GroupCard from "../../components/feature/GroupCard";
import Button from "../../components/base/Button";

export default function HomePage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [sortBy, setSortBy] = useState("distance");

  const categories = ["전체", "치킨", "피자", "패스트푸드", "한식", "중식"];

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await api.getActiveGroups();
        setGroups(data);
      } catch (error) {
        console.error("그룹 로딩 실패:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filteredGroups = useMemo(() => {
    return groups
      .filter((group) => {
        const matchesSearch = group.brand.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "전체" ||
          group.brand.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "distance":
            return a.distanceKm - b.distanceKm;
          case "deadline":
            return a.deadline.getTime() - b.deadline.getTime();
          case "progress":
            return b.progressPct - a.progressPct;
          default:
            return 0;
        }
      });
  }, [groups, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section className="bg-gradient-to-r from-[#5B8DEF] to-[#4A7BD9] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">
            혼자 먹기엔 배달비가 아까울 때
          </h1>
          <p className="text-xl mb-8 opacity-90">
            근처 이웃과 함께 주문하고 배달비를 나눠보세요
          </p>
          <Link to="/match">
            <Button variant="secondary" size="lg">
              새 그룹 만들기
            </Button>
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="브랜드나 음식 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8DEF] focus:border-transparent text-sm"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8DEF] focus:border-transparent text-sm"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5B8DEF] focus:border-transparent text-sm"
            >
              <option value="distance">거리 가까운 순</option>
              <option value="deadline">마감 임박 순</option>
              <option value="progress">진행률 높은 순</option>
            </select>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <i className="ri-loader-4-line animate-spin text-4xl text-[#5B8DEF] mr-2" />
            <span className="text-gray-600">주변 공동주문을 찾는 중...</span>
          </div>
        ) : filteredGroups.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                주변 공동주문
              </h2>
              <p className="text-gray-600">
                {filteredGroups.length}개의 그룹이 참여를 기다리고 있어요
              </p>
            </div>
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </section>
          </>
        ) : (
          <div className="text-center py-16">
            <i className="ri-search-line text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600 mb-6">
              다른 검색어를 시도하거나 새로운 그룹을 만들어보세요
            </p>
            <Link to="/match">
              <Button variant="primary">새 그룹 만들기</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

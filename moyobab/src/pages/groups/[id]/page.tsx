import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Group } from "../../../types";
import { api } from "../../../services/api";
import Header from "../../../components/layout/Header";
import GroupDetail from "../../../components/feature/GroupDetail";

export default function GroupDetailPage() {
  const { id } = useParams();
  const [group, setGroup] = useState<Group | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await api.getGroupById(id!);
      setGroup(data ?? null);
    };
    load();
  }, [id]);

  if (!group) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20 text-gray-500">
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <GroupDetail group={group} />
      </div>
    </div>
  );
}

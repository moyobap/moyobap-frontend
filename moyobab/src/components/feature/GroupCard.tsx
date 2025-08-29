import { useNavigate } from "react-router-dom";
import type { Group } from "../../types";
import Card, { CardBody } from "../base/Card";
import Badge from "../base/Badge";
import Progress from "../base/Progress";
import Countdown from "../base/Countdown";
import Button from "../base/Button";

interface GroupCardProps {
  group: Group;
}

export default function GroupCard({ group }: GroupCardProps) {
  const navigate = useNavigate();

  const handleJoinGroup = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/groups/${group.id}`);
  };

  const handleCardClick = () => {
    navigate(`/groups/${group.id}`);
  };

  const getProgressColor = (): "success" | "warning" | "default" => {
    if (group.progressPct >= 100) return "success";
    if (group.progressPct >= 70) return "warning";
    return "default";
  };

  return (
    <Card hover onClick={handleCardClick} className="h-full">
      <CardBody className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">
              {group.brand.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2">{group.brand.category}</p>
          </div>
          <Badge variant={getProgressColor()} size="sm">
            {group.distanceKm.toFixed(1)}km
          </Badge>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-600">최소 주문금액 달성도</span>
              <span className="font-medium">
                {group.total.toLocaleString()}원 /{" "}
                {group.minAmount.toLocaleString()}원
              </span>
            </div>
            <Progress value={group.progressPct} showLabel />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-600">
              <i className="ri-group-line w-4 h-4 flex items-center justify-center mr-1" />
              {group.members.length}명 참여
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <i className="ri-time-line w-4 h-4 flex items-center justify-center mr-1" />
              <Countdown targetDate={group.deadline} />
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={handleJoinGroup}
              disabled={group.progressPct >= 100}
            >
              {group.progressPct >= 100 ? "주문 마감" : "참여하기"}
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}

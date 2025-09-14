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

  const handleClick = () => navigate(`/groups/${group.id}`);

  const progressColor =
    group.progressPct >= 100
      ? "success"
      : group.progressPct >= 70
        ? "warning"
        : "default";

  return (
    <Card hover onClick={handleClick} className="h-full flex flex-col">
      <CardBody className="flex-1 flex flex-col justify-between p-5">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {group.brand.name}
              </h3>
              <p className="text-sm text-gray-600">{group.brand.category}</p>
            </div>
            <Badge variant={progressColor} size="sm">
              {group.distanceKm.toFixed(1)}km
            </Badge>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>최소 주문금액 달성도</span>
              <span className="font-medium">
                {group.total.toLocaleString()} /{" "}
                {group.minAmount.toLocaleString()}원
              </span>
            </div>
            <Progress value={group.progressPct} showLabel />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <i className="ri-group-line" aria-hidden="true" />{" "}
              {group.members.length}명
            </span>
            <span className="flex items-center gap-1">
              <i className="ri-time-line" aria-hidden="true" />{" "}
              <Countdown targetDate={group.deadline} />
            </span>
          </div>

          <Button
            onClick={handleJoinGroup}
            variant="primary"
            size="sm"
            className="w-full"
            disabled={group.progressPct >= 100}
          >
            {group.progressPct >= 100 ? "주문 마감" : "참여하기"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

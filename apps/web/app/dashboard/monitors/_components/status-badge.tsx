import { Badge } from "@upzy/ui/components/badge";
import {
  IconCircleCheckFilled,
  IconCircleXFilled,
  IconAlertTriangleFilled,
  IconTools,
} from "@tabler/icons-react";

type StatusType = "up" | "down" | "degraded" | "maintenance";

interface StatusBadgeProps {
  status: StatusType;
}

const statusMap: Record<
  StatusType,
  { label: string; icon: React.ReactNode; color: string }
> = {
  up: {
    label: "Up",
    icon: (
      <IconCircleCheckFilled className="h-4 w-4 fill-green-500 dark:fill-green-400" />
    ),
    color: "text-green-500",
  },
  down: {
    label: "Down",
    icon: (
      <IconCircleXFilled className="h-4 w-4 fill-red-500 dark:fill-red-400" />
    ),
    color: "text-red-500",
  },
  degraded: {
    label: "Degraded",
    icon: (
      <IconAlertTriangleFilled className="h-4 w-4 fill-yellow-500 dark:fill-yellow-400" />
    ),
    color: "text-yellow-500",
  },
  maintenance: {
    label: "Maintenance",
    icon: <IconTools className="h-4 w-4 text-blue-500 dark:text-blue-400" />,
    color: "text-blue-500",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusData = statusMap[status];

  return (
    <Badge
      variant="outline"
      className={`font-outfit flex items-center gap-1 px-1.5 text-[11px] font-normal ${statusData.color}`}
    >
      {statusData.icon}
      {statusData.label}
    </Badge>
  );
}

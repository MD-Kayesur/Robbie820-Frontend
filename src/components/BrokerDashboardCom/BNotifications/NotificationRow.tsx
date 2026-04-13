import {
  Bell,
  CalendarDays,
  CircleAlert,
  DollarSign,
  RefreshCw,
  UserPlus2,
  Users,
} from "lucide-react";

import { cn } from "@/hooks/useCn";
import {
  NotificationIconKey,
  NotificationItem,
} from "@/pages/BrokerDashboard/BrokerNotifications/types";

type Props = {
  item: NotificationItem;
};

const NotificationRow = ({ item }: Props) => {
  const Icon = getNotificationIcon(item.icon);

  return (
    <div className="flex gap-3 border-b border-[#E5E7EB] px-4 py-5 last:border-b-0 md:gap-4 md:px-5">
      <div
        className={cn(
          "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          getNotificationIconWrapperClass(item.icon),
        )}
      >
        <Icon className={cn("h-5 w-5", getNotificationIconClass(item.icon))} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h3 className="text-[15px] font-medium text-[#111827]">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#6B7280]">
              {item.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex h-6 items-center rounded-full bg-[#F3F4F6] px-2.5 text-[10px] font-medium tracking-[0.01em] text-[#374151]">
                {item.source}
              </span>
              {!item.isRead ? (
                <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
              ) : null}
            </div>
          </div>

          <p className="shrink-0 text-xs text-[#9CA3AF]">{item.timeAgo}</p>
        </div>
      </div>
    </div>
  );
};

function getNotificationIcon(icon: NotificationIconKey) {
  switch (icon) {
    case "user-plus":
      return UserPlus2;
    case "refresh":
      return RefreshCw;
    case "dollar":
      return DollarSign;
    case "calendar":
      return CalendarDays;
    case "users":
      return Users;
    case "alert":
      return CircleAlert;
    default:
      return Bell;
  }
}

function getNotificationIconWrapperClass(icon: NotificationIconKey) {
  switch (icon) {
    case "user-plus":
      return "bg-[#EEF4FF]";
    case "refresh":
      return "bg-[#F5EFFF]";
    case "dollar":
      return "bg-[#EAF8EF]";
    case "calendar":
      return "bg-[#EAF8EF]";
    case "users":
      return "bg-[#EEF2FF]";
    case "alert":
      return "bg-[#FFF7E8]";
    default:
      return "bg-[#F3F4F6]";
  }
}

function getNotificationIconClass(icon: NotificationIconKey) {
  switch (icon) {
    case "user-plus":
      return "text-[#2563EB]";
    case "refresh":
      return "text-[#9333EA]";
    case "dollar":
      return "text-[#16A34A]";
    case "calendar":
      return "text-[#16A34A]";
    case "users":
      return "text-[#4F46E5]";
    case "alert":
      return "text-[#F59E0B]";
    default:
      return "text-[#6B7280]";
  }
}

export default NotificationRow;

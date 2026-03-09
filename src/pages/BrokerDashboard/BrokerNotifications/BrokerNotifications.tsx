import { useEffect, useMemo, useState } from "react";
import {
  Bell,
  BellRing,
  CheckCircle2,
  CircleAlert,
  DollarSign,
  Mail,
  RefreshCw,
  Settings,
  UserPlus2,
  Users,
  CalendarDays,
  X,
} from "lucide-react";

import { cn } from "@/hooks/useCn";
import {
  notificationItemsMock,
  notificationPreferenceGroups,
  notificationPreferencesMock,
} from "./mock";
import type {
  NotificationIconKey,
  NotificationItem,
  NotificationPreferenceItem,
  NotificationTab,
  NotificationType,
} from "./types";

const BrokerNotifications = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(
    notificationItemsMock,
  );
  const [tab, setTab] = useState<NotificationTab>("ALL");
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [showDeliveryMethods, setShowDeliveryMethods] = useState(true);
  const [preferencesDraft, setPreferencesDraft] = useState<
    NotificationPreferenceItem[]
  >(notificationPreferencesMock);

  useEffect(() => {
    document.body.style.overflow = preferencesOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [preferencesOpen]);

  const unreadCount = useMemo(
    () => notifications.filter((item) => !item.isRead).length,
    [notifications],
  );

  const filteredNotifications = useMemo(() => {
    if (tab === "UNREAD") {
      return notifications.filter((item) => !item.isRead);
    }

    return notifications;
  }, [notifications, tab]);

  const groupedPreferences = useMemo(() => {
    return notificationPreferenceGroups.map((group) => ({
      ...group,
      items: group.items
        .map((type) => preferencesDraft.find((item) => item.type === type))
        .filter(Boolean) as NotificationPreferenceItem[],
    }));
  }, [preferencesDraft]);

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        isRead: true,
      })),
    );
  };

  const updatePreferenceEnabled = (type: NotificationType, value: boolean) => {
    setPreferencesDraft((prev) =>
      prev.map((item) =>
        item.type === type
          ? {
              ...item,
              enabled: value,
            }
          : item,
      ),
    );
  };

  const updatePreferenceDelivery = (
    type: NotificationType,
    key: "email" | "inApp",
    value: boolean,
  ) => {
    setPreferencesDraft((prev) =>
      prev.map((item) =>
        item.type === type
          ? {
              ...item,
              [key]: value,
            }
          : item,
      ),
    );
  };

  return (
    <>
      <div className="space-y-6 bg-[#F8FAFC] p-3 sm:p-4 lg:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2563EB]">
                <Bell className="h-5 w-5" />
              </div>
              <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111827]">
                Notifications
              </h1>
            </div>
            <p className="mt-2 text-sm text-[#6B7280]">
              Stay updated with referral activity, commission events, and
              account alerts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D1D5DB] bg-white px-5 text-sm font-medium text-[#4B5563] transition hover:bg-slate-50"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_260px]">
          <section className="overflow-hidden rounded-2xl border border-[#DADDE3] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col gap-3 border-b border-[#E5E7EB] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <h2 className="text-[18px] font-semibold tracking-[-0.02em] text-[#111827]">
                Recent Notifications
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <button
                  type="button"
                  onClick={() => setTab("ALL")}
                  className={cn(
                    "rounded-lg px-4 py-2 font-medium transition",
                    tab === "ALL"
                      ? "bg-[#DBEAFE] text-[#2563EB]"
                      : "text-[#6B7280] hover:text-[#111827]",
                  )}
                >
                  All
                </button>

                <button
                  type="button"
                  onClick={() => setTab("UNREAD")}
                  className={cn(
                    "font-medium transition",
                    tab === "UNREAD"
                      ? "text-[#111827]"
                      : "text-[#6B7280] hover:text-[#111827]",
                  )}
                >
                  Unread ({unreadCount})
                </button>

                {!!notifications.length && unreadCount > 0 ? (
                  <button
                    type="button"
                    onClick={handleMarkAllAsRead}
                    className="font-medium text-[#2563EB] transition hover:text-blue-700"
                  >
                    Mark all as read
                  </button>
                ) : null}
              </div>
            </div>

            {filteredNotifications.length ? (
              <div>
                {filteredNotifications.map((item) => (
                  <NotificationRow key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <EmptyState />
            )}
          </section>

          <aside className="rounded-2xl border border-[#DADDE3] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="border-b border-[#E5E7EB] px-5 py-5">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-[#374151]" />
                <h3 className="text-[18px] font-semibold tracking-[-0.02em] text-[#111827]">
                  Notification Preferences
                </h3>
              </div>
              <p className="mt-2 text-sm text-[#6B7280]">
                Choose which alerts you want to receive.
              </p>
            </div>

            <div className="space-y-6 px-5 py-5">
              {groupedPreferences.map((group) => (
                <div key={group.id}>
                  <h4 className="text-[15px] font-medium text-[#111827]">
                    {group.title}
                  </h4>

                  <div className="mt-3 space-y-3">
                    {group.items.map((item) => (
                      <div key={item.type} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#16A34A]" />
                        <span className="text-sm text-[#374151]">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setPreferencesOpen(true)}
                className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#0EA5E9] px-4 text-sm font-medium text-white transition hover:bg-sky-600"
              >
                Configure Preferences
              </button>
            </div>
          </aside>
        </div>
      </div>

      {preferencesOpen ? (
        <NotificationPreferencesModal
          preferences={preferencesDraft}
          groupedPreferences={groupedPreferences}
          showDeliveryMethods={showDeliveryMethods}
          onToggleShowDeliveryMethods={() =>
            setShowDeliveryMethods((prev) => !prev)
          }
          onToggleEnabled={updatePreferenceEnabled}
          onToggleDelivery={updatePreferenceDelivery}
          onClose={() => setPreferencesOpen(false)}
          onSave={() => setPreferencesOpen(false)}
        />
      ) : null}
    </>
  );
};

function NotificationRow({ item }: { item: NotificationItem }) {
  const Icon = getNotificationIcon(item.icon);

  return (
    <div className="flex gap-4 border-b border-[#E5E7EB] px-4 py-5 last:border-b-0 sm:px-5">
      <div
        className={cn(
          "mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
          getNotificationIconWrapperClass(item.icon),
        )}
      >
        <Icon className={cn("h-5 w-5", getNotificationIconClass(item.icon))} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h3 className="text-[15px] font-medium text-[#111827]">
              {item.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[#6B7280]">
              {item.description}
            </p>

            <div className="mt-2 flex items-center gap-2">
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
}

function EmptyState() {
  return (
    <div className="flex min-h-[168px] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3F4F6] text-[#9CA3AF]">
        <CircleAlert className="h-6 w-6" />
      </div>
      <p className="mt-4 text-[18px] font-medium text-[#374151]">
        No notifications
      </p>
      <p className="mt-1 text-sm text-[#6B7280]">You're all caught up!</p>
    </div>
  );
}

function NotificationPreferencesModal({
  preferences,
  groupedPreferences,
  showDeliveryMethods,
  onToggleShowDeliveryMethods,
  onToggleEnabled,
  onToggleDelivery,
  onClose,
  onSave,
}: {
  preferences: NotificationPreferenceItem[];
  groupedPreferences: Array<{
    id: string;
    title: string;
    items: NotificationPreferenceItem[];
  }>;
  showDeliveryMethods: boolean;
  onToggleShowDeliveryMethods: () => void;
  onToggleEnabled: (type: NotificationType, value: boolean) => void;
  onToggleDelivery: (
    type: NotificationType,
    key: "email" | "inApp",
    value: boolean,
  ) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 p-3 sm:p-6">
      <div className="mx-auto w-full max-w-[760px] rounded-[28px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] px-6 py-6 sm:px-8 sm:py-8">
          <div>
            <h2 className="text-[26px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[30px]">
              Notification Preferences
            </h2>
            <p className="mt-2 text-sm text-[#6B7280] sm:text-[16px]">
              Choose which alerts you want to receive and how you'd like to be
              notified.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#9CA3AF] transition hover:bg-slate-100"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="space-y-8 px-6 py-8 sm:px-8">
          {groupedPreferences.map((group, groupIndex) => (
            <div
              key={group.id}
              className={cn(
                groupIndex !== 0 && "border-t border-[#E5E7EB] pt-8",
              )}
            >
              <h3 className="text-[20px] font-medium text-[#111827]">
                {group.title}
              </h3>

              <div className="mt-6 space-y-6">
                {group.items.map((item) => (
                  <div
                    key={item.type}
                    className="flex items-center justify-between gap-4"
                  >
                    <span className="text-[18px] text-[#6B7280]">
                      {item.label}
                    </span>

                    <Toggle
                      checked={item.enabled}
                      onChange={(value) => onToggleEnabled(item.type, value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={onToggleShowDeliveryMethods}
            className="text-left text-[14px] font-medium text-[#2563EB] transition hover:text-blue-700"
          >
            {showDeliveryMethods
              ? "- Hide Delivery Method Options"
              : "+ Show Delivery Method Options"}
          </button>

          {showDeliveryMethods ? (
            <div className="overflow-hidden rounded-2xl border border-[#D1D5DB]">
              <div className="border-b border-[#E5E7EB] px-5 py-4">
                <div className="inline-flex min-w-[220px] rounded-sm bg-[#F8FAFC] px-4 py-2 text-[16px] font-medium text-[#111827]">
                  Delivery Method
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-[640px] w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left">
                      <th className="border-b border-[#E5E7EB] px-5 py-4 text-[14px] font-medium text-[#9CA3AF]">
                        Notification
                      </th>
                      <th className="border-b border-[#E5E7EB] px-5 py-4 text-[14px] font-medium text-[#6B7280]">
                        <span className="inline-flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Email
                        </span>
                      </th>
                      <th className="border-b border-[#E5E7EB] px-5 py-4 text-[14px] font-medium text-[#6B7280]">
                        <span className="inline-flex items-center gap-2">
                          <BellRing className="h-4 w-4" />
                          In-app
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {preferences.map((item) => (
                      <tr key={item.type}>
                        <td className="border-b border-[#E5E7EB] px-5 py-4 text-[16px] text-[#6B7280] last:border-b-0">
                          {item.label}
                        </td>
                        <td className="border-b border-[#E5E7EB] px-5 py-4 last:border-b-0">
                          <Toggle
                            checked={item.email}
                            onChange={(value) =>
                              onToggleDelivery(item.type, "email", value)
                            }
                          />
                        </td>
                        <td className="border-b border-[#E5E7EB] px-5 py-4 last:border-b-0">
                          <Toggle
                            checked={item.inApp}
                            onChange={(value) =>
                              onToggleDelivery(item.type, "inApp", value)
                            }
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-[#E5E7EB] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-14 items-center justify-center rounded-2xl border border-[#D1D5DB] bg-[#F3F4F6] px-7 text-[16px] font-medium text-[#4B5563] transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#2563EB] px-7 text-[16px] font-medium text-white transition hover:bg-blue-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-8 w-[58px] shrink-0 items-center rounded-full transition",
        checked ? "bg-[#2563EB]" : "bg-[#CBD5E1]",
      )}
    >
      <span
        className={cn(
          "inline-block h-7 w-7 rounded-full bg-white shadow-sm transition",
          checked ? "translate-x-[27px]" : "translate-x-[2px]",
        )}
      />
    </button>
  );
}

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

export default BrokerNotifications;

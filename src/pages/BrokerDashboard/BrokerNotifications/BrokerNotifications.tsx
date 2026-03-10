import { useEffect, useMemo, useState } from "react";
import { Bell, Check, CheckCircle2, Settings } from "lucide-react";

import { cn } from "@/hooks/useCn";
import {
  notificationItemsMock,
  notificationPreferenceGroups,
  notificationPreferencesMock,
} from "./mock";
import type {
  NotificationItem,
  NotificationPreferenceItem,
  NotificationTab,
  NotificationType,
} from "./types";
import NotificationRow from "@/components/BrokerDashboardCom/BNotifications/NotificationRow";
import EmptyState from "@/components/BrokerDashboardCom/BNotifications/EmptyState";
import NotificationPreferencesModal from "@/components/BrokerDashboardCom/BNotifications/NotificationPreferencesModal";

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
      <div className="space-y-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EAF2FF] text-[#2563EB]">
                <Bell className="h-5 w-5" />
              </div>
              <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[28px]">
                Notifications
              </h1>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Stay updated with referral activity, commission events, and
              account alerts.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClearAll}
            className="inline-flex w-full items-center justify-center rounded-xl border border-[#D1D5DB] bg-white px-3 py-1.5 text-sm font-medium text-[#4B5563] transition hover:bg-slate-50 sm:w-auto"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_330px]">
          <section className="overflow-hidden rounded-2xl border border-[#DADDE3] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
            <div className="flex flex-col gap-3 border-b border-[#E5E7EB] px-4 py-4 sm:px-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111827] sm:text-[18px]">
                  Recent Notifications
                </h2>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center rounded-lg bg-slate-100 p-0.5">
                    <button
                      type="button"
                      onClick={() => setTab("ALL")}
                      className={cn(
                        "rounded-md px-4 py-1 text-sm font-medium transition",
                        tab === "ALL"
                          ? "bg-white text-[#2563EB] shadow-sm"
                          : "text-slate-600 hover:text-slate-900",
                      )}
                    >
                      All
                    </button>

                    <button
                      type="button"
                      onClick={() => setTab("UNREAD")}
                      className={cn(
                        "rounded-md px-4 py-1.5 text-sm font-medium transition",
                        tab === "UNREAD"
                          ? "bg-white text-[#2563EB] shadow-sm"
                          : "text-slate-600 hover:text-slate-900",
                      )}
                    >
                      Unread
                      {unreadCount > 0 && (
                        <span className="ml-1.5 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  </div>

                  {!!notifications.length && unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={handleMarkAllAsRead}
                      className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#2563EB]"
                    >
                      <Check className="h-4 w-4" />
                      Mark all as read
                    </button>
                  )}
                </div>
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
            <div className="border-b border-[#E5E7EB] px-4 py-5 sm:px-5">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-[#374151]" />
                <h3 className="text-base font-semibold tracking-[-0.02em] text-[#111827] sm:text-[18px]">
                  Notification Preferences
                </h3>
              </div>
              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                Choose which alerts you want to receive.
              </p>
            </div>

            <div className="space-y-6 px-4 py-5 sm:px-5">
              {groupedPreferences.map((group) => (
                <div key={group.id}>
                  <h4 className="text-[15px] font-medium text-[#111827]">
                    {group.title}
                  </h4>

                  <div className="mt-3 space-y-3">
                    {group.items.map((item) => (
                      <div key={item.type} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#16A34A]" />
                        <span className="text-sm leading-6 text-[#374151]">
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

export default BrokerNotifications;

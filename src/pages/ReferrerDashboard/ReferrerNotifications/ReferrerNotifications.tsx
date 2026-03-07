// src/pages/ReferrerDashboard/ReferrerNotifications/ReferrerNotifications.tsx

import { useMemo, useState } from "react";
import { Bell, ChevronRight } from "lucide-react";

import type { NotificationItem } from "./types";
import { notificationMeta, notificationsMock } from "./mock";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

const cardBase =
  "w-full rounded-2xl border border-slate-200 bg-white transition";

const rowBase =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 sm:px-5 sm:py-5";

const iconWrapBase = "grid h-10 w-10 place-items-center rounded-xl";

const chevronBtnBase =
  "grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 active:scale-[0.99] transition";

const ReferrerNotifications = () => {
  const [items, setItems] = useState<NotificationItem[]>(notificationsMock);

  const unreadCount = useMemo(
    () => items.reduce((acc, it) => acc + (it.read ? 0 : 1), 0),
    [items],
  );

  const allRead = unreadCount === 0;

  function markAllAsRead(next: boolean) {
    // if checked => mark all read; if unchecked => keep current (don’t force unread back)
    if (!next) return;
    setItems((prev) => prev.map((p) => ({ ...p, read: true })));
  }

  function openNotification(it: NotificationItem) {
    // keep functionality (you can swap with route/modal later)
    // eslint-disable-next-line no-alert
    alert(`${it.title}\n\n${it.message}`);
    if (!it.read) {
      setItems((prev) =>
        prev.map((p) => (p.id === it.id ? { ...p, read: true } : p)),
      );
    }
  }

  return (
    <div className="mx-auto max-w-400 bg-white p-6">
      {/* top info card */}
      <div
        className={cn(
          "rounded-2xl bg-sky-500 px-5 py-5 text-white",
          "sm:px-7 sm:py-6",
          "shadow-sm",
        )}
      >
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
            <Bell className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold sm:text-base">Stay Updated</p>
            <p className="mt-2 max-w-3xl text-xs leading-5 text-white/90 sm:text-sm sm:leading-6">
              Notifications keep you informed about critical updates in your
              portfolio. We alert you whenever a client’s loan status changes,
              when commissions are calculated, or when a payment is successfully
              settled into your account.
            </p>
          </div>
        </div>
      </div>

      {/* header row */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <p className="text-sm font-semibold text-slate-900 sm:text-base">
            Recent Notifications
          </p>

          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
              "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
            )}
          >
            {unreadCount} Unread
          </span>
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={allRead}
            onChange={(e) => markAllAsRead(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-sky-600 focus:ring-sky-200"
          />
          Mark all as read
        </label>
      </div>

      {/* list */}
      <div className="mt-4 space-y-3">
        {items.map((it) => {
          const meta = notificationMeta[it.type];
          const Icon = meta.icon;

          return (
            <div
              key={it.id}
              className={cn(
                rowBase,
                "relative flex items-center justify-between gap-4",
                it.read ? "" : "bg-sky-50/50",
              )}
            >
              {/* unread left bar */}
              {!it.read ? (
                <span className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-sky-500" />
              ) : null}

              <button
                type="button"
                onClick={() => openNotification(it)}
                className="flex min-w-0 flex-1 items-center gap-4 text-left"
              >
                <div className={cn(iconWrapBase, meta.iconBg)}>
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">
                    {it.title}
                  </p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500 sm:text-sm">
                    {it.message}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => openNotification(it)}
                className={chevronBtnBase}
                aria-label="Open notification"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}

        {items.length === 0 ? (
          <div className={cn(cardBase, "px-6 py-12 text-center")}>
            <p className="text-sm text-slate-500">No notifications.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReferrerNotifications;

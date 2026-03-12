// src/pages/ReferrerDashboard/ReferrerNotifications/ReferrerNotifications.tsx

import { useMemo, useState } from "react";
import { BadgeInfo, ChevronRight } from "lucide-react";

import type { NotificationItem } from "./types";
import { notificationMeta, notificationsMock } from "./mock";
import { cn } from "@/hooks/useCn";

const cardBase =
  "w-full rounded-2xl border border-slate-200 bg-white transition";

const rowBase = "w-full rounded-2xl border border-slate-200 p-6";

const iconWrapBase =
  "grid h-10 w-10 place-items-center rounded-xl bg-[#00B4FE33]";

const chevronBtnBase =
  "grid h-9 w-9 place-items-center rounded-lg border border-slate-200 bg-[#0000000D] text-slate-600 hover:bg-slate-50 active:scale-[0.99] transition";

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
    <div className="mx-auto max-w-4xl bg-white p-6">
      {/* top info card */}
      <div
        className={cn(
          "rounded-2xl bg-[#00B4FE] px-5 py-5 text-white",
          "md:px-7 md:py-6",
          "shadow-sm",
        )}
      >
        <div>
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 ring-1 ring-white/20">
              <BadgeInfo className="h-5 w-5" />
            </div>
            <h1 className="text-sm font-semibold md:text-base">Stay Updated</h1>
          </div>
        </div>
        <p className="mt-2 max-w-3xl text-sm leading-6">
          Notifications keep you informed about critical updates in your
          portfolio. We alert you whenever a client’s loan status changes, when
          commissions are calculated, or when a payment is successfully settled
          into your account.
        </p>
      </div>

      {/* header row */}
      <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-6">
          <p className="font-medium text-slate-900 md:text-base">
            Recent Notifications
          </p>

          <span
            className={cn(
              "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
              "bg-sky-100 text-[#00B4FE] ring-1 ring-[#00B4FE]",
            )}
          >
            {unreadCount} Unread
          </span>
        </div>

        <label className="flex items-center gap-2.5 leading-4 text-sm font-medium text-[#00B4FE]">
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
      <div className="mt-4 space-y-4.5">
        {items.map((it) => {
          const meta = notificationMeta[it.type];
          const Icon = meta.icon;

          return (
            <div
              key={it.id}
              className={cn(
                rowBase,
                "relative flex items-center justify-between gap-4",
                it.read ? "" : "bg-[#00B4FE0D]",
              )}
            >
              {/* unread left bar */}
              {!it.read ? (
                <span className="absolute left-0 top-0 h-full w-2 rounded-l-2xl bg-[#00B4FE]" />
              ) : null}

              <button
                type="button"
                onClick={() => openNotification(it)}
                className="flex min-w-0 flex-1 items-center gap-5 text-left"
              >
                <div className={cn(iconWrapBase, meta.iconBg)}>
                  <Icon className="h-5 w-5 text-[#00B4FE]" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900">
                    {it.title}
                  </p>
                  <p className="mt-1 line-clamp-2 leading-5 text-slate-500 md:text-sm">
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
                <ChevronRight size={20} />
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

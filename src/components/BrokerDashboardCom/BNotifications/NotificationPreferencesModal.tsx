import { BellRing, Mail, X } from "lucide-react";

import { cn } from "@/hooks/useCn";
import {
  NotificationPreferenceItem,
  NotificationType,
} from "@/pages/BrokerDashboard/BrokerNotifications/types";

type GroupedPreference = {
  id: string;
  title: string;
  items: NotificationPreferenceItem[];
};

type NotificationPreferencesModalProps = {
  preferences: NotificationPreferenceItem[];
  groupedPreferences: GroupedPreference[];
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
};

const NotificationPreferencesModal = ({
  preferences,
  groupedPreferences,
  showDeliveryMethods,
  onToggleShowDeliveryMethods,
  onToggleEnabled,
  onToggleDelivery,
  onClose,
  onSave,
}: NotificationPreferencesModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 sm:p-6">
      <div className="flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-lg bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)] sm:rounded-[28px]">
        <div className="flex items-start justify-between gap-4 border-b border-[#E5E7EB] px-4 py-5 sm:px-8 sm:py-8">
          <div className="min-w-0">
            <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[30px]">
              Notification Preferences
            </h2>
            <p className="mt-2 text-[14px] leading-6 text-[#6B7280] sm:text-[16px]">
              Choose which alerts you want to receive and how you'd like to be
              notified.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#9CA3AF] transition hover:bg-slate-100"
          >
            <X className="h-6 w-6 sm:h-7 sm:w-7" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-8 sm:py-8">
          <div className="space-y-6 sm:space-y-8">
            {groupedPreferences.map((group, groupIndex) => (
              <div
                key={group.id}
                className={cn(
                  groupIndex !== 0 && "border-t border-[#E5E7EB] pt-6 sm:pt-8",
                )}
              >
                <h3 className="text-[17px] font-medium text-[#111827] sm:text-[20px]">
                  {group.title}
                </h3>

                <div className="mt-5 space-y-5 sm:mt-6 sm:space-y-6">
                  {group.items.map((item) => (
                    <div
                      key={item.type}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="pr-2 text-[14px] leading-6 text-[#6B7280] sm:text-[18px]">
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
              className="text-left text-sm font-medium text-[#2563EB] transition hover:text-blue-700"
            >
              {showDeliveryMethods
                ? "- Hide Delivery Method Options"
                : "+ Show Delivery Method Options"}
            </button>

            {showDeliveryMethods ? (
              <>
                <div className="hidden overflow-hidden rounded-2xl border border-[#D1D5DB] md:block">
                  <div className="border-b border-[#E5E7EB] px-5 py-4">
                    <div className="rounded-sm bg-[#F8FAFC] px-4 py-2 text-[16px] font-medium text-[#111827]">
                      Delivery Method
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-separate border-spacing-0">
                      <thead>
                        <tr className="bg-[#F8FAFC] text-left">
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

                <div className="space-y-3 md:hidden">
                  {preferences.map((item) => (
                    <div
                      key={item.type}
                      className="rounded-2xl border border-[#D1D5DB] p-4"
                    >
                      <p className="text-sm font-medium text-[#111827]">
                        {item.label}
                      </p>

                      <div className="mt-4 space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-2 text-sm text-[#6B7280]">
                            <Mail className="h-4 w-4" />
                            Email
                          </span>
                          <Toggle
                            checked={item.email}
                            onChange={(value) =>
                              onToggleDelivery(item.type, "email", value)
                            }
                          />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="inline-flex items-center gap-2 text-sm text-[#6B7280]">
                            <BellRing className="h-4 w-4" />
                            In-app
                          </span>
                          <Toggle
                            checked={item.inApp}
                            onChange={(value) =>
                              onToggleDelivery(item.type, "inApp", value)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>

        <div className="flex gap-3 border-t border-[#E5E7EB] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-6">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-[#D1D5DB] bg-[#F3F4F6] px-7 text-[15px] font-medium text-[#4B5563] transition hover:bg-slate-100 sm:h-14 sm:w-auto sm:text-[16px]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[#2563EB] px-7 text-[15px] font-medium whitespace-nowrap text-white transition hover:bg-blue-700 sm:h-14 sm:w-auto sm:text-[16px]"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

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
        "relative inline-flex h-8 w-14.5 shrink-0 items-center rounded-full transition",
        checked ? "bg-[#2563EB]" : "bg-[#CBD5E1]",
      )}
    >
      <span
        className={cn(
          "inline-block h-7 w-7 rounded-full bg-white shadow-sm transition",
          checked ? "translate-x-6.75" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export default NotificationPreferencesModal;

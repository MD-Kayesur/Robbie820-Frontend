import { Bell, ChevronDown, Clock3, Globe2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/hooks/useCn";
import type {
  AppPreferencesState,
  CurrencyOption,
  StagnationOption,
  TimezoneOption,
} from "../types";

type AppPreferencesTabProps = {
  value: AppPreferencesState;
  timezoneOptions: TimezoneOption[];
  currencyOptions: CurrencyOption[];
  stagnationOptions: StagnationOption[];
  onChange: (value: AppPreferencesState) => void;
};

const AppPreferencesTab = ({
  value,
  timezoneOptions,
  currencyOptions,
  stagnationOptions,
  onChange,
}: AppPreferencesTabProps) => {
  const [openMenu, setOpenMenu] = useState<
    null | "timezone" | "currency" | "stagnation"
  >(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedTimezone =
    timezoneOptions.find((item) => item.value === value.timezone)?.label ?? "";

  const selectedCurrency =
    currencyOptions.find((item) => item.value === value.currency)?.label ?? "";

  const selectedStagnation =
    stagnationOptions.find((item) => item.value === value.stagnationPeriod)
      ?.label ?? "";

  const updateField = <K extends keyof AppPreferencesState>(
    key: K,
    fieldValue: AppPreferencesState[K],
  ) => {
    onChange({
      ...value,
      [key]: fieldValue,
    });
  };

  return (
    <div ref={wrapperRef}>
      <section className="rounded-[20px] border border-[#DADDE3] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex items-center gap-3">
          <Globe2 className="h-8 w-8 text-[#111827]" />
          <h2 className="text-[22px] font-semibold uppercase tracking-[-0.03em] text-[#111827]">
            Localization & Workspace
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="relative">
            <SelectButton
              label="TIMEZONE"
              value={selectedTimezone}
              icon={<Clock3 className="h-4 w-4" />}
              open={openMenu === "timezone"}
              onClick={() =>
                setOpenMenu((prev) => (prev === "timezone" ? null : "timezone"))
              }
            />

            {openMenu === "timezone" ? (
              <Dropdown className="w-full">
                {timezoneOptions.map((option) => (
                  <DropdownRow
                    key={option.value}
                    label={option.label}
                    onClick={() => {
                      updateField("timezone", option.value);
                      setOpenMenu(null);
                    }}
                  />
                ))}
              </Dropdown>
            ) : null}
          </div>

          <div className="relative">
            <SelectButton
              label="CURRENCY FORMAT"
              value={selectedCurrency}
              open={openMenu === "currency"}
              onClick={() =>
                setOpenMenu((prev) => (prev === "currency" ? null : "currency"))
              }
            />

            {openMenu === "currency" ? (
              <Dropdown className="w-full">
                {currencyOptions.map((option) => (
                  <DropdownRow
                    key={option.value}
                    label={option.label}
                    onClick={() => {
                      updateField("currency", option.value);
                      setOpenMenu(null);
                    }}
                  />
                ))}
              </Dropdown>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex items-center gap-3">
          <Bell className="h-7 w-7 text-[#6B7280]" />
          <h2 className="text-[22px] font-semibold uppercase tracking-[-0.03em] text-[#111827]">
            Notification Routing
          </h2>
        </div>

        <div className="mt-8 space-y-8">
          <PreferenceRow
            title="Referrer Payment Reminder"
            description="Notify when a referrer payment is due after a loan settlement."
            checked={value.referrerPaymentReminder}
            onChange={(checked) =>
              updateField("referrerPaymentReminder", checked)
            }
          />

          <div>
            <PreferenceRow
              title="Lead Stagnation Alert"
              description="Notify when a lead has not been updated for a selected number of days."
              checked={value.leadStagnationAlert}
              onChange={(checked) =>
                updateField("leadStagnationAlert", checked)
              }
            />

            <div className="relative mt-4 w-[220px]">
              <label className="mb-2 block text-[13px] font-medium uppercase text-[#111827]">
                STAGNATION PERIOD
              </label>

              <button
                type="button"
                onClick={() =>
                  setOpenMenu((prev) =>
                    prev === "stagnation" ? null : "stagnation",
                  )
                }
                className="flex h-11 w-full items-center justify-between rounded-[10px] border border-[#A7D8F5] bg-[#DDF4FF] px-4 text-[15px] text-[#374151]"
              >
                <span>{selectedStagnation}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition",
                    openMenu === "stagnation" && "rotate-180",
                  )}
                />
              </button>

              {openMenu === "stagnation" ? (
                <Dropdown className="top-[calc(100%+8px)] w-full rounded-none border-[#D1D5DB]">
                  {stagnationOptions.map((option) => (
                    <DropdownRow
                      key={option.value}
                      label={option.label}
                      large
                      onClick={() => {
                        updateField("stagnationPeriod", option.value);
                        setOpenMenu(null);
                      }}
                    />
                  ))}
                </Dropdown>
              ) : null}
            </div>
          </div>

          <PreferenceRow
            title="Weekly Summary Digest"
            description="A curated email of your firm's performance every Monday."
            checked={value.weeklySummaryDigest}
            onChange={(checked) => updateField("weeklySummaryDigest", checked)}
          />
        </div>
      </section>
    </div>
  );
};

function PreferenceRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-[18px] font-semibold text-[#111827]">{title}</h3>
        <p className="mt-1 text-[16px] text-[#6B7280]">{description}</p>
      </div>

      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
}

function SelectButton({
  label,
  value,
  open,
  onClick,
  icon,
}: {
  label: string;
  value: string;
  open: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-medium uppercase text-[#8B8F97]">
        {label}
      </label>

      <button
        type="button"
        onClick={onClick}
        className="flex h-12 w-full items-center justify-between rounded-[12px] border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-left text-[15px] text-[#6B7280]"
      >
        <span className="flex items-center gap-2">
          {icon ? <span className="text-[#94A3B8]">{icon}</span> : null}
          <span>{value}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-[#111827] transition",
            open && "rotate-180",
          )}
        />
      </button>
    </div>
  );
}

function Dropdown({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[12px] border border-[#DADDE3] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function DropdownRow({
  label,
  onClick,
  large = false,
}: {
  label: string;
  onClick: () => void;
  large?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full border-b border-[#E5E7EB] px-4 text-left text-[#111827] transition last:border-b-0 hover:bg-[#F8FAFC]",
        large ? "h-[60px] text-center text-[26px]" : "h-12 text-[15px]",
      )}
    >
      {label}
    </button>
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
        "relative inline-flex h-[28px] w-[46px] shrink-0 items-center rounded-full transition",
        checked ? "bg-[#0EA5E9]" : "bg-[#E5E7EB]",
      )}
    >
      <span
        className={cn(
          "inline-block h-[24px] w-[24px] rounded-full bg-white shadow-sm transition",
          checked ? "translate-x-[21px]" : "translate-x-[2px]",
        )}
      />
    </button>
  );
}

export default AppPreferencesTab;

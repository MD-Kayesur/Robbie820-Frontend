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
      <section className="rounded-[20px] border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] md:p-6">
        <div className="flex items-center gap-3">
          <Globe2 className="h-6 w-6 text-[#111827] md:h-8 md:w-8" />
          <h2 className="text-[18px] font-semibold uppercase tracking-[-0.03em] text-[#111827] md:text-[22px]">
            Localization & Workspace
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-2">
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

        <div className="mt-10 flex items-center gap-3 md:mt-12">
          <Clock3 className="h-6 w-6 text-[#111827] md:h-8 md:w-8" />
          <h2 className="text-[18px] font-semibold uppercase tracking-[-0.03em] text-[#111827] md:text-[22px]">
            System Defaults
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:mt-8 md:grid-cols-2">
          <div className="relative">
            <label className="mb-2 block text-[12px] font-medium uppercase text-[#8B8F97] md:text-[13px]">
              GLOBAL AGGREGATOR FEE (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={value.aggregatorFeePercent}
                onChange={(e) =>
                  updateField("aggregatorFeePercent", Number(e.target.value))
                }
                className="flex h-11 w-full items-center justify-between rounded-xl border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-left text-[14px] text-[#111827] outline-none transition focus:border-[#0EA5E9] md:h-12 md:text-[15px]"
              />
              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">
                %
              </span>
            </div>
            <p className="mt-2 text-[12px] text-[#6B7280]">
              This fee is applied globally across all partners and formulas.
            </p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3 md:mt-12">
          <Bell className="h-6 w-6 text-[#6B7280] md:h-7 md:w-7" />
          <h2 className="text-[18px] font-semibold uppercase tracking-[-0.03em] text-[#111827] md:text-[22px]">
            Notification Routing
          </h2>
        </div>

        <div className="mt-6 space-y-6 md:mt-8 md:space-y-8">
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

            <div className="relative mt-4 w-full md:w-55">
              <label className="mb-2 block text-[12px] font-medium uppercase text-[#111827] md:text-[13px]">
                STAGNATION PERIOD
              </label>

              <button
                type="button"
                onClick={() =>
                  setOpenMenu((prev) =>
                    prev === "stagnation" ? null : "stagnation",
                  )
                }
                className="flex h-11 w-full items-center justify-between rounded-[10px] border border-[#A7D8F5] bg-[#DDF4FF] px-4 text-[14px] text-[#374151] md:text-[15px]"
              >
                <span className="truncate">{selectedStagnation}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 transition",
                    openMenu === "stagnation" && "rotate-180",
                  )}
                />
              </button>

              {openMenu === "stagnation" ? (
                <Dropdown className="top-[calc(100%+8px)] w-full border-[#D1D5DB]">
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
    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <h3 className="text-[16px] font-semibold text-[#111827] md:text-[18px]">
          {title}
        </h3>
        <p className="mt-1 text-[14px] leading-6 text-[#6B7280] md:text-[16px]">
          {description}
        </p>
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
      <label className="mb-2 block text-[12px] font-medium uppercase text-[#8B8F97] md:text-[13px]">
        {label}
      </label>

      <button
        type="button"
        onClick={onClick}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-left text-[14px] text-[#6B7280] md:h-12 md:text-[15px]"
      >
        <span className="flex min-w-0 items-center gap-2">
          {icon ? (
            <span className="shrink-0 text-[#94A3B8]">{icon}</span>
          ) : null}
          <span className="truncate">{value}</span>
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#111827] transition",
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
        "absolute left-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-xl border border-[#DADDE3] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.12)]",
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
        large
          ? "min-h-13 py-3 text-sm md:min-h-15 md:text-center md:text-[18px]"
          : "h-11 text-[14px] md:h-12 md:text-[15px]",
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
        "relative inline-flex h-7 w-11.5 shrink-0 items-center rounded-full transition",
        checked ? "bg-[#0EA5E9]" : "bg-[#E5E7EB]",
      )}
    >
      <span
        className={cn(
          "inline-block h-6 w-6 rounded-full bg-white shadow-sm transition",
          checked ? "translate-x-5.25" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

export default AppPreferencesTab;

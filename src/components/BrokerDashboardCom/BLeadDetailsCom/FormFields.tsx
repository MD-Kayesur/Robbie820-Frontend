import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/hooks/useCn";

type InputFieldProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  prefix?: string;
  suffix?: string;
};

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  prefix,
  suffix,
}: InputFieldProps) {
  return (
    <div>
      <p className="mb-2 text-[12px] text-[#9CA3AF]">{label}</p>

      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9CA3AF]">
            {prefix}
          </span>
        ) : null}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-11 w-full rounded-xl border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2563EB]",
            prefix && "pl-8",
            suffix && "pr-8",
          )}
        />

        {suffix ? (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9CA3AF]">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

type SelectFieldProps<T extends string> = {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
};

export function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: SelectFieldProps<T>) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <p className="mb-2 text-[12px] text-[#9CA3AF]">{label}</p>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-[#E5E7EB] bg-white px-4 text-left text-[14px] text-[#111827]"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />

          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
            {options.map((option) => {
              const active = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-[14px] transition",
                    active ? "bg-[#DBEAFE]" : "hover:bg-[#F8FAFC]",
                  )}
                >
                  <span>{option}</span>
                  {active ? <span className="text-[13px]">✓</span> : null}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

type TextareaFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: TextareaFieldProps) {
  return (
    <div>
      <p className="mb-2 text-[12px] text-[#9CA3AF]">{label}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2563EB]"
      />
    </div>
  );
}

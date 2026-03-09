import { cn } from "./useCn";

export function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={cn(
        "relative inline-flex h-8 w-15 items-center rounded-full transition",
        value ? "bg-[#00B4FE33]" : "bg-slate-200",
      )}
      aria-pressed={value}
    >
      {" "}
      <span
        className={cn(
          "inline-block h-6 w-6 rounded-full bg-[#00B4FE] transition",
          value ? "translate-x-7.5" : "translate-x-1.5",
        )}
      />{" "}
    </button>
  );
}

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
        "relative inline-flex h-6 w-11 items-center rounded-full transition",
        value ? "bg-slate-900" : "bg-slate-200",
      )}
      aria-pressed={value}
    >
      <span
        className={cn(
          "inline-block h-5 w-5 rounded-full bg-white transition",
          value ? "translate-x-5" : "translate-x-1",
        )}
      />
    </button>
  );
}

// src/pages/SuperAdmin/SubscriptionsCom/ActionsMenu.tsx
import { Eye, RotateCcw, FileText } from "lucide-react";
import { useOutsideClose } from "./utils";

export function ActionsMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const ref = useOutsideClose<HTMLDivElement>(open, onClose);
  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-2 top-10 w-60 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl z-40"
    >
      {[
        { icon: Eye, label: "View Subscription" },
        { icon: RotateCcw, label: "Issue Refund" },
        { icon: FileText, label: "Invoice History" },
      ].map(({ icon: Icon, label }) => (
        <button
          key={label}
          type="button"
          onClick={onClose}
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        >
          <Icon className="h-4 w-4 text-slate-500" />
          {label}
        </button>
      ))}

      <div className="h-px bg-slate-100" />

      <button
        type="button"
        onClick={onClose}
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
      >
        Cancel
      </button>
    </div>
  );
}

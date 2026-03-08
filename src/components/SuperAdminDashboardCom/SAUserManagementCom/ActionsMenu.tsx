import { useOutsideClose } from "@/hooks/useOutsideClose";
import { Ban, Eye, FileText, UserCog } from "lucide-react";

export function ActionsMenu({
  open,
  onClose,
  onDisable,
}: {
  open: boolean;
  onClose: () => void;
  onDisable: () => void;
}) {
  const ref = useOutsideClose<HTMLDivElement>(open, onClose);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-0 top-10 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
    >
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        onClick={onClose}
      >
        <Eye className="h-4 w-4 text-slate-500" />
        View Profile
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        onClick={onClose}
      >
        <UserCog className="h-4 w-4 text-slate-500" />
        Impersonate
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        onClick={onClose}
      >
        <FileText className="h-4 w-4 text-slate-500" />
        Commission History
      </button>

      <div className="h-px bg-slate-100" />

      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
        onClick={onDisable}
      >
        <Ban className="h-4 w-4 text-rose-500" />
        Disable Access
      </button>
    </div>
  );
}

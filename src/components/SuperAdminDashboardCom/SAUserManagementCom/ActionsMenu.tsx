import { useOutsideClose } from "@/hooks/useOutsideClose";
import { Ban, CheckCircle, Eye, FileText, UserCog } from "lucide-react";
import { forwardRef } from "react";

export const ActionsMenu = forwardRef<
  HTMLDivElement,
  {
    open: boolean;
    onClose: () => void;
    onToggleAccess: () => void;
    isActive: boolean;
    position?: { top: number; left: number };
  }
>(function ActionsMenu(
  { open, onClose, onToggleAccess, isActive, position },
  forwardRef,
) {
  const ref = useOutsideClose<HTMLDivElement>(open, onClose);

  if (!open) return null;

  return (
    <div
      ref={(node) => {
        ref.current = node;
        if (typeof forwardRef === "function") forwardRef(node);
        else if (forwardRef) forwardRef.current = node;
      }}
      className={
        position
          ? "fixed z-60 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
          : "absolute right-3 top-10 z-60 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
      }
      style={position ? { top: position.top, left: position.left } : undefined}
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

      {isActive ? (
        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
          onClick={onToggleAccess}
        >
          <Ban className="h-4 w-4 text-rose-500" />
          Disable Access
        </button>
      ) : (
        <button
          type="button"
          className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-emerald-600 hover:bg-emerald-50"
          onClick={onToggleAccess}
        >
          <CheckCircle className="h-4 w-4 text-emerald-500" />
          Enable Access
        </button>
      )}
    </div>
  );
});

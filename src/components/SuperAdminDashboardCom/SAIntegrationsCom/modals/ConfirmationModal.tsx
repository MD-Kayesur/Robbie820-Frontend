import { X, AlertTriangle } from "lucide-react";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/hooks/useCn";

interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary";
}

export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
}: ConfirmationModalProps) {
  const panelRef = useOutsideClose<HTMLDivElement>(open, onClose);
  useLockBodyScroll(open);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/45" onClick={onClose} />
      
      <div
        ref={panelRef}
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className={cn(
            "mb-4 flex h-12 w-12 items-center justify-center rounded-full",
            variant === "danger" ? "bg-rose-50 text-rose-600" : "bg-blue-50 text-blue-600"
          )}>
            <AlertTriangle className="h-6 w-6" />
          </div>
          
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm text-slate-500">{description}</p>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={cn(
              "flex-1 rounded-xl py-2.5 text-sm font-semibold text-white transition-colors shadow-sm",
              variant === "danger" ? "bg-rose-600 hover:bg-rose-700" : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

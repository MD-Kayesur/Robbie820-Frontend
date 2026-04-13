import { AlertCircle, X } from "lucide-react";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOutsideClose } from "@/hooks/useOutsideClose";

type ResetPasswordModalProps = {
  open: boolean;
  email: string;
  onClose: () => void;
  onSubmit?: (email: string) => void;
};

const ResetPasswordModal = ({
  open,
  email,
  onClose,
  onSubmit,
}: ResetPasswordModalProps) => {
  useLockBodyScroll(open);
  const modalRef = useOutsideClose<HTMLDivElement>(open, onClose);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-3 md:p-6">
      <div
        ref={modalRef}
        className="mx-auto w-full max-w-215 rounded-[28px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-start justify-between px-6 pt-6 md:px-10 md:pt-8">
          <div>
            <h2 className="text-[28px] font-semibold leading-none text-black">
              Reset Partner Password
            </h2>
            <p className="mt-4 max-w-175 text-lg leading-9 text-[#6B7280]">
              A secure password reset link will be sent to the partner's
              registered email address.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#525252] transition hover:bg-slate-100"
          >
            <X className="h-7 w-7" />
          </button>
        </div>

        <div className="px-6 pb-6 pt-10 md:px-10 md:pb-10">
          <label className="block">
            <span className="mb-4 block text-[18px] font-normal text-[#525252]">
              Login Email
            </span>

            <input
              type="email"
              value={email}
              readOnly
              className="h-23 w-full rounded-[22px] border border-[#D1D5DB] bg-white px-6 text-[28px] text-black outline-none"
            />
          </label>

          <div className="mt-8 rounded-[22px] border border-[#F4C84A] bg-[#FFFBEF] px-6 py-7">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-[#D97706] text-[#D97706]">
                <AlertCircle className="h-7 w-7" />
              </div>

              <p className="max-w-155 text-[22px] leading-[1.45] text-[#B45309]">
                For security reasons, the partner will need to set a new
                password using the email link.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col-reverse gap-3 md:flex-row md:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-17.5 items-center justify-center rounded-[18px] border border-[#D1D5DB] px-8 text-[22px] font-normal text-black transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => onSubmit?.(email)}
              className="inline-flex h-17.5 items-center justify-center rounded-[18px] bg-[#020222] px-10 text-[22px] font-normal text-white transition hover:bg-[#0B0B35]"
            >
              Send Reset Link
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordModal;

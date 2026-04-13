import { X } from "lucide-react";

import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOutsideClose } from "@/hooks/useOutsideClose";

type SendInvitationModalProps = {
  open: boolean;
  email: string;
  onClose: () => void;
  onSubmit?: (email: string) => void;
};

const SendInvitationModal = ({
  open,
  email,
  onClose,
  onSubmit,
}: SendInvitationModalProps) => {
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
              Send Portal Invitation
            </h2>
            <p className="mt-4 max-w-175 text-lg leading-9 text-[#6B7280]">
              Invite this partner to access their referral portal.
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

          <p className="mt-8 max-w-170 text-[22px] leading-[1.45] text-[#6B7280]">
            An email invitation will be sent with instructions to activate their
            account.
          </p>

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
              Send Invitation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendInvitationModal;

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

import { cn } from "@/hooks/useCn";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { additionalLoginDefaultForm, additionalLoginRoleOptions } from "./mock";
import type { AdditionalLoginRole } from "./types";

type AdditionalLoginForm = {
  fullName: string;
  email: string;
  role: AdditionalLoginRole;
};

type AddAdditionalLoginModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: AdditionalLoginForm) => void;
};

function SelectMenu<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-18 w-full items-center justify-between rounded-[18px] bg-[#F5F5F7] px-6 text-left text-[20px] text-black"
      >
        <span>{value}</span>
        <ChevronDown className="h-7 w-7 text-[#9CA3AF]" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="close select"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
          />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="flex w-full items-center px-6 py-5 text-left text-[20px] text-black transition hover:bg-slate-50"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

const AddAdditionalLoginModal = ({
  open,
  onClose,
  onSubmit,
}: AddAdditionalLoginModalProps) => {
  const [form, setForm] = useState<AdditionalLoginForm>(
    additionalLoginDefaultForm,
  );

  useLockBodyScroll(open);
  const modalRef = useOutsideClose<HTMLDivElement>(open, onClose);

  const isValid = form.fullName.trim() && form.email.trim() && form.role;

  const updateForm = <K extends keyof AdditionalLoginForm>(
    key: K,
    value: AdditionalLoginForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!isValid) return;
    onSubmit?.(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-3 sm:p-6">
      <div
        ref={modalRef}
        className="mx-auto w-full max-w-235 rounded-[28px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-start justify-between px-6 pt-6 sm:px-10 sm:pt-8">
          <div>
            <h2 className="text-[28px] font-semibold leading-none text-black">
              Add Additional Login
            </h2>
            <p className="mt-4 max-w-180 text-lg leading-9 text-[#6B7280]">
              Create a new portal login for this partner's team.
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

        <div className="px-6 pb-6 pt-10 sm:px-10 sm:pb-10">
          <h3 className="text-[20px] font-semibold text-black">User Details</h3>

          <div className="mt-8 space-y-7">
            <label className="block">
              <span className="mb-4 block text-[18px] text-black">
                Full Name <span className="text-red-500">*</span>
              </span>

              <input
                type="text"
                value={form.fullName}
                onChange={(e) => updateForm("fullName", e.target.value)}
                placeholder="e.g. Sarah Connor"
                className="h-18 w-full rounded-[18px] bg-[#F5F5F7] px-6 text-[20px] text-black outline-none placeholder:text-[#737373]"
              />
            </label>

            <label className="block">
              <span className="mb-4 block text-[18px] text-black">
                Email Address <span className="text-red-500">*</span>
              </span>

              <input
                type="email"
                value={form.email}
                onChange={(e) => updateForm("email", e.target.value)}
                placeholder="sarah@primeestates.com.au"
                className="h-18 w-full rounded-[18px] bg-[#F5F5F7] px-6 text-[20px] text-black outline-none placeholder:text-[#737373]"
              />
            </label>

            <label className="block">
              <span className="mb-4 block text-[18px] text-black">
                Role <span className="text-red-500">*</span>
              </span>

              <SelectMenu<AdditionalLoginRole>
                value={form.role}
                onChange={(value) => updateForm("role", value)}
                options={additionalLoginRoleOptions}
              />
            </label>
          </div>

          <p className="mt-5 max-w-205 text-[18px] leading-[1.45] text-[#6B7280]">
            Admins can manage settings and view all referrals. Members can only
            view and manage their own referrals.
          </p>

          <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-17.5 items-center justify-center rounded-[18px] border border-[#D1D5DB] px-8 text-[22px] font-normal text-black transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid}
              className={cn(
                "inline-flex h-17.5 items-center justify-center rounded-[18px] px-10 text-[22px] font-normal text-white transition",
                isValid
                  ? "bg-[#020222] hover:bg-[#0B0B35]"
                  : "cursor-not-allowed bg-[#A1A1AA]",
              )}
            >
              Create Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdditionalLoginModal;

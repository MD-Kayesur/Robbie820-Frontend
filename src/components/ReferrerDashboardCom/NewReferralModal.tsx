// src/components/ReferrerDashboardCom/NewReferralModal.tsx

import React, { useEffect, useId, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Users } from "lucide-react";
import { NewReferralForm } from "@/pages/ReferrerDashboard/ReferrerOverview/types";
import { cn } from "@/hooks/useCn";
import { useEscClose } from "@/hooks/useEscClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 sm:space-y-4">
      <label className="block text-[20px] leading-none text-black sm:text-[22px] md:text-[24px]">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "h-12 sm:h-14 md:h-16 w-full rounded-2xl border border-[#00B4FE33] bg-white " +
  "px-4 sm:px-5 md:px-6 text-[16px] sm:text-[17px] md:text-[18px] text-[#6B7280] " +
  "placeholder:text-[#9CA3AF] outline-none " +
  "focus:border-[#00B4FE66] focus:ring-4 focus:ring-[#00B4FE1A]";

const textareaBase =
  "min-h-32 sm:min-h-40 md:min-h-44 w-full rounded-2xl border border-[#00B4FE33] bg-white " +
  "px-4 sm:px-5 md:px-6 py-4 sm:py-5 text-[16px] sm:text-[17px] md:text-[18px] text-[#6B7280] " +
  "placeholder:text-[#9CA3AF] outline-none " +
  "focus:border-[#00B4FE66] focus:ring-4 focus:ring-[#00B4FE1A] resize-none";

export default function NewReferralModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: NewReferralForm) => void;
}) {
  useEscClose(open, onClose);
  useLockBodyScroll(open);

  const fullNameId = useId();
  const emailId = useId();
  const phoneId = useId();
  const companyId = useId();
  const notesId = useId();

  const [form, setForm] = useState<NewReferralForm>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  useEffect(() => {
    if (!open) return;
    setForm({ fullName: "", email: "", phone: "", company: "", notes: "" });
  }, [open]);

  const panelRef = useRef<HTMLDivElement | null>(null);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className={cn(
            "fixed inset-0 z-200 bg-black/30",
            // centered on all sizes (matches your screenshots)
            "flex items-center justify-center",
            // mobile margin like the screenshot
            "p-4 sm:p-6",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="new-referral-title"
            className={cn(
              "w-full bg-white shadow-2xl overflow-hidden",
              // geometry
              "rounded-3xl",
              // width tuning: compact on mobile, wider on desktop (like images)
              "max-w-140 sm:max-w-2xl lg:max-w-3xl",
              // keep inside viewport
              "max-h-[92vh]",
              "flex flex-col",
            )}
            initial={{ y: 14, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.18 }}
          >
            {/* Header */}
            <div className="px-6 pt-7 sm:px-10 sm:pt-10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 sm:h-16 sm:w-16">
                    <Users className="h-7 w-7 text-sky-600 sm:h-8 sm:w-8" />
                  </div>

                  <div className="min-w-0">
                    <h2
                      id="new-referral-title"
                      className="text-[34px] font-semibold leading-[1.05] tracking-tight text-black sm:text-[40px]"
                    >
                      New Referral
                    </h2>
                    <p className="mt-2 text-[18px] text-slate-500 sm:text-[20px]">
                      Submit a new lead in seconds
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-2xl p-2.5 text-black hover:bg-slate-100 active:bg-slate-100"
                  aria-label="Close modal"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              <div className="mt-6 h-px w-full bg-slate-200" />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-10 sm:py-9">
              <div className="space-y-7 sm:space-y-9">
                <Field label="Client  Full Name">
                  <input
                    id={fullNameId}
                    value={form.fullName}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, fullName: e.target.value }))
                    }
                    className={inputBase}
                    placeholder="Cameron Williamson"
                  />
                </Field>

                <Field label="E-Mail Address">
                  <input
                    id={emailId}
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    className={inputBase}
                    placeholder="michelle.rivera@example.com"
                  />
                </Field>

                <Field label="Phone Number">
                  <input
                    id={phoneId}
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    className={inputBase}
                    placeholder="(302) 555-0107"
                  />
                </Field>

                <Field label="Company Name (Optional)">
                  <input
                    id={companyId}
                    value={form.company ?? ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, company: e.target.value }))
                    }
                    className={inputBase}
                    placeholder="Mark Robertson GREENBUILD CONSTRUCTION"
                  />
                </Field>

                <Field label="Additional Notes (Optional)">
                  <textarea
                    id={notesId}
                    value={form.notes ?? ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, notes: e.target.value }))
                    }
                    className={textareaBase}
                    placeholder="eg."
                  />
                </Field>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-7 sm:px-10 sm:pb-10">
              <button
                type="button"
                onClick={() => {
                  onSubmit?.(form);
                  onClose();
                }}
                className={cn(
                  "h-14 sm:h-16 w-full rounded-2xl",
                  "flex items-center justify-center gap-3",
                  "text-[18px] font-medium text-black",
                  "bg-[#00B4FE] transition-colors",
                  "hover:bg-[#00A6E8] active:bg-[#0097D2]",
                )}
              >
                <span>Submit to Broker</span>
                <Send className="h-7 w-7" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

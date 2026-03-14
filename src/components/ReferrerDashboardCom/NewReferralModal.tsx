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
    <div className="space-y-2.5">
      <label className="block text-base leading-4 text-black">{label}</label>
      {children}
    </div>
  );
}

const inputBase =
  "px-6 py-4 w-full rounded-sm border border-[#00B4FE33] bg-white " +
  "px-4 md:px-5 md:px-6 text-base text-[#6B7280] " +
  "placeholder:text-[#9CA3AF] outline-none " +
  "focus:border-[#00B4FE66] focus:ring-4 focus:ring-[#00B4FE1A]";

const textareaBase =
  "min-h-32 md:min-h-40 md:min-h-44 w-full rounded-sm border border-[#00B4FE33] bg-white " +
  "px-4 md:px-5 md:px-6 py-4 md:py-5 text-base text-[#6B7280] " +
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
            "fixed inset-0 z-50 bg-black/30",
            "flex items-center justify-center",
            "p-4 md:p-6",
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
              "w-full bg-white overflow-hidden",
              "max-w-lg md:max-w-xl p-6 space-y-5.5",
              "max-h-[92vh]",
              "flex flex-col",
            )}
            initial={{ y: 14, opacity: 0, scale: 0.99 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.995 }}
            transition={{ duration: 0.18 }}
          >
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 md:gap-5">
                  <div className="p-2.5 rounded-lg bg-sky-100">
                    <Users className="h-6 w-6 text-sky-600" />
                  </div>

                  <div className="min-w-0">
                    <h2
                      id="new-referral-title"
                      className="font-semibold text-black text-xl"
                    >
                      New Referral
                    </h2>
                    <p className="text-base text-slate-500">
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
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-2.5 h-px w-full bg-slate-200" />
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 md:space-y-6">
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
            <div>
              <button
                type="button"
                onClick={() => {
                  onSubmit?.(form);
                  onClose();
                }}
                className={cn(
                  "px-6 py-3 w-full rounded-2xl",
                  "flex items-center justify-center gap-3",
                  "text-base font-medium text-black",
                  "bg-[#00B4FE] transition-colors",
                  "hover:bg-[#00A6E8] active:bg-[#0097D2]",
                )}
              >
                <span>Submit to Broker</span>
                <Send className="h-6 w-6" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

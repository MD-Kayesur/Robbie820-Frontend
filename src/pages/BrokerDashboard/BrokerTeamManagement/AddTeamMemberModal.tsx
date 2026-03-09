import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

import { paidSeatExtraCost, roleOptions, totalSeats } from "./mock";
import type { AddUserForm } from "./types";

type AddTeamMemberModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: AddUserForm) => void;
  usedSeats: number;
};

const defaultForm: AddUserForm = {
  fullName: "",
  email: "",
  role: "Broker",
};

const AddTeamMemberModal = ({
  open,
  onClose,
  onSubmit,
  usedSeats,
}: AddTeamMemberModalProps) => {
  const [form, setForm] = useState<AddUserForm>(defaultForm);

  useEffect(() => {
    if (!open) {
      setForm(defaultForm);
    }
  }, [open]);

  useLockBodyScroll(open);
  const modalRef = useOutsideClose<HTMLDivElement>(open, onClose);

  const isBroker = form.role === "Broker";
  const nextUsedSeats = isBroker ? usedSeats + 1 : usedSeats;
  const increaseAmount = isBroker ? paidSeatExtraCost : 0;

  const canAddSelectedRole = form.role !== "Broker" || usedSeats < totalSeats;

  const canSubmit =
    form.fullName.trim().length > 0 &&
    form.email.trim().length > 0 &&
    canAddSelectedRole;

  if (!open) return null;

  const handleChange = <K extends keyof AddUserForm>(
    key: K,
    value: AddUserForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(form);
    setForm(defaultForm);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-3 sm:p-5">
      <div
        ref={modalRef}
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6">
          <h2 className="text-[28px] font-medium leading-none text-[#111111] sm:text-[34px]">
            Add Team Member
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#111111] transition hover:bg-[#F5F5F5]"
          >
            <X className="h-8 w-8" strokeWidth={1.8} />
          </button>
        </div>

        <div className="border-t border-[#E8E8E8]" />

        <div className="space-y-8 px-6 py-8 sm:px-8 sm:py-10">
          <section>
            <h3 className="text-[22px] font-medium text-[#111111] sm:text-[24px]">
              User Details
            </h3>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-3 block text-[18px] text-[#6E6E73]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter full name"
                  className="h-17 w-full rounded-[18px] border border-[#D9D9DF] bg-[#F8F8FA] px-5 text-[18px] text-[#111111] outline-none transition placeholder:text-[#9B9BA1] focus:border-[#11A8F5] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-[18px] text-[#6E6E73]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="email@example.com"
                  className="h-17 w-full rounded-[18px] border border-[#D9D9DF] bg-[#F8F8FA] px-5 text-[18px] text-[#111111] outline-none transition placeholder:text-[#9B9BA1] focus:border-[#11A8F5] focus:bg-white"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[22px] font-medium text-[#111111] sm:text-[24px]">
              Assign Role
            </h3>

            <div className="mt-8 space-y-4">
              {roleOptions.map((option) => {
                const selected = form.role === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange("role", option.value)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-[20px] border px-5 py-6 text-left transition sm:px-6",
                      selected
                        ? "border-[#11A8F5] bg-white shadow-[inset_0_0_0_1px_#11A8F5]"
                        : "border-[#D9D9D9] bg-white hover:border-[#C8CDD5]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-[#030526] bg-[#030526]"
                          : "border-[#D9D9D9] bg-white",
                      )}
                    >
                      {selected ? (
                        <span className="h-3 w-3 rounded-full bg-white" />
                      ) : null}
                    </span>

                    <div className="min-w-0">
                      <p className="text-[18px] font-medium text-[#111111] sm:text-[20px]">
                        {option.label}
                      </p>
                      <p className="mt-3 text-[16px] text-[#6F6F75] sm:text-[17px]">
                        {option.description}
                      </p>

                      {option.warning ? (
                        <span className="mt-4 inline-flex rounded-xl bg-[#FFF1E7] px-4 py-2 text-[15px] text-[#F07B49]">
                          {option.warning}
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[20px] border border-[#D9D9DF] bg-[#FAFAFB] px-5 py-5 sm:px-6">
            <h4 className="text-[18px] font-medium text-[#111111]">
              Seat Summary:
            </h4>
            <p className="mt-4 text-[18px] text-[#66666D]">
              Current seats used:{" "}
              <span className="font-medium text-[#111111]">
                {nextUsedSeats} of {totalSeats}
              </span>
            </p>
            <p className="mt-4 text-[18px] text-[#111111]">
              {increaseAmount > 0
                ? `Adding this user will increase your monthly subscription by $${increaseAmount}.`
                : "Adding this user will not increase your monthly subscription."}
            </p>
          </section>

          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="h-17 rounded-[18px] border border-[#D9D9DF] bg-white text-[18px] font-medium text-[#111111] transition hover:bg-[#F8F8F8]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                "h-17 rounded-[18px] bg-[#020428] text-[18px] font-medium text-white transition",
                canSubmit
                  ? "hover:opacity-95"
                  : "cursor-not-allowed opacity-50",
              )}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;

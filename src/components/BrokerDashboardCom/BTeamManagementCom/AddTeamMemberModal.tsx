import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

import {
  paidSeatExtraCost,
  roleOptions,
  totalSeats,
} from "../../../pages/BrokerDashboard/BrokerTeamManagement/mock";
import type { AddUserForm } from "../../../pages/BrokerDashboard/BrokerTeamManagement/types";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 sm:p-6">
      <div
        ref={modalRef}
        className="
      w-full max-w-lg sm:max-w-2xl
      max-h-[90vh]
      overflow-y-auto
      rounded-2xl
      bg-white
      shadow-[0_28px_80px_rgba(0,0,0,0.28)]
    "
      >
        <div className="flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
          <h2 className="pr-3 text-[22px] font-medium leading-tight text-[#111111] sm:text-[34px]">
            Add Team Member
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[#111111] transition hover:bg-[#F5F5F5] sm:h-11 sm:w-11"
          >
            <X className="h-5 w-5 sm:h-8 sm:w-8" strokeWidth={1.8} />
          </button>
        </div>

        <div className="border-t border-[#E8E8E8]" />

        <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-8 sm:py-10">
          <div className="space-y-6 sm:space-y-8">
            <section>
              <h3 className="text-[18px] font-medium text-[#111111] sm:text-[24px]">
                User Details
              </h3>

              <div className="mt-5 space-y-4 sm:mt-8 sm:space-y-6">
                <div>
                  <label className="mb-2 block text-[14px] text-[#6E6E73] sm:mb-3 sm:text-[18px]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Enter full name"
                    className="h-12 w-full rounded-[14px] border border-[#D9D9DF] bg-[#F8F8FA] px-4 text-[15px] text-[#111111] outline-none transition placeholder:text-[#9B9BA1] focus:border-[#11A8F5] focus:bg-white sm:h-17 sm:rounded-[18px] sm:px-5 sm:text-[18px]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-[14px] text-[#6E6E73] sm:mb-3 sm:text-[18px]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="email@example.com"
                    className="h-12 w-full rounded-[14px] border border-[#D9D9DF] bg-[#F8F8FA] px-4 text-[15px] text-[#111111] outline-none transition placeholder:text-[#9B9BA1] focus:border-[#11A8F5] focus:bg-white sm:h-17 sm:rounded-[18px] sm:px-5 sm:text-[18px]"
                  />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-[18px] font-medium text-[#111111] sm:text-[24px]">
                Assign Role
              </h3>

              <div className="mt-5 space-y-3 sm:mt-8 sm:space-y-4">
                {roleOptions.map((option) => {
                  const selected = form.role === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleChange("role", option.value)}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-2xl border px-4 py-4 text-left transition sm:gap-4 sm:rounded-[20px] sm:px-6 sm:py-6",
                        selected
                          ? "border-[#11A8F5] bg-white shadow-[inset_0_0_0_1px_#11A8F5]"
                          : "border-[#D9D9D9] bg-white hover:border-[#C8CDD5]",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 sm:mt-1 sm:h-8 sm:w-8",
                          selected
                            ? "border-[#030526] bg-[#030526]"
                            : "border-[#D9D9D9] bg-white",
                        )}
                      >
                        {selected ? (
                          <span className="h-2 w-2 rounded-full bg-white sm:h-3 sm:w-3" />
                        ) : null}
                      </span>

                      <div className="min-w-0">
                        <p className="text-[15px] font-medium text-[#111111] sm:text-[20px]">
                          {option.label}
                        </p>
                        <p className="mt-1.5 text-[13px] leading-5 text-[#6F6F75] sm:mt-3 sm:text-[17px]">
                          {option.description}
                        </p>

                        {option.warning ? (
                          <span className="mt-3 inline-flex rounded-lg bg-[#FFF1E7] px-3 py-1.5 text-[12px] text-[#F07B49] sm:mt-4 sm:rounded-xl sm:px-4 sm:py-2 sm:text-[15px]">
                            {option.warning}
                          </span>
                        ) : null}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-[#D9D9DF] bg-[#FAFAFB] px-4 py-4 sm:rounded-[20px] sm:px-6 sm:py-5">
              <h4 className="text-[15px] font-medium text-[#111111] sm:text-[18px]">
                Seat Summary:
              </h4>

              <p className="mt-3 text-[14px] leading-6 text-[#66666D] sm:mt-4 sm:text-[18px]">
                Current seats used:{" "}
                <span className="font-medium text-[#111111]">
                  {nextUsedSeats} of {totalSeats}
                </span>
              </p>

              <p className="mt-3 text-[14px] leading-6 text-[#111111] sm:mt-4 sm:text-[18px]">
                {increaseAmount > 0
                  ? `Adding this user will increase your monthly subscription by $${increaseAmount}.`
                  : "Adding this user will not increase your monthly subscription."}
              </p>

              {!canAddSelectedRole ? (
                <p className="mt-3 text-[13px] font-medium text-red-500 sm:text-[15px]">
                  No available paid seats left for Broker role.
                </p>
              ) : null}
            </section>
          </div>
        </div>

        <div className="border-t border-[#E8E8E8] bg-white px-4 py-4 sm:px-8 sm:py-6">
          <div className="grid gap-3 grid-cols-2 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="h-12 rounded-[14px] border border-[#D9D9DF] bg-white text-[15px] font-medium text-[#111111] transition hover:bg-[#F8F8F8] sm:h-17 sm:rounded-[18px] sm:text-[18px]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                "h-12 rounded-[14px] bg-[#020428] text-[15px] font-medium text-white transition sm:h-17 sm:rounded-[18px] sm:text-[18px]",
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

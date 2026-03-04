// src/pages/SuperAdmin/SubscriptionsCom/pills.ts
import type {
  PaymentStatus,
  PlanName,
  SubStatus,
} from "../../../pages/SuperAdminDashboard/SuperAdminSubscriptions/types";

export const planPill = (p: PlanName) =>
  p === "Enterprise"
    ? "bg-violet-50 text-violet-700"
    : p === "Pro"
      ? "bg-sky-100 text-sky-700"
      : "bg-slate-100 text-slate-700";

export const paymentPill = (p: PaymentStatus) =>
  p === "Paid"
    ? "bg-emerald-100 text-emerald-700"
    : p === "Failed"
      ? "bg-rose-600 text-white"
      : "bg-amber-100 text-amber-700";

export const statusPill = (s: SubStatus) => {
  if (s === "Active") return "bg-emerald-100 text-emerald-700";
  if (s === "Suspended") return "bg-rose-600 text-white";
  if (s === "Trial") return "bg-sky-100 text-sky-700";
  if (s === "Payment Failed") return "bg-amber-100 text-rose-500";
  return "bg-slate-100 text-slate-700";
};

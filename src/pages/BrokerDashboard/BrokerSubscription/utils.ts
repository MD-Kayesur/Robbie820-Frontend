import type { PaymentMethod } from "./types";

export function ensureOneDefault(methods: PaymentMethod[]) {
  if (!methods.length) return methods;
  if (methods.some((item) => item.isDefault)) return methods;

  return methods.map((item, index) =>
    index === 0 ? { ...item, isDefault: true } : item,
  );
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatMoney2(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

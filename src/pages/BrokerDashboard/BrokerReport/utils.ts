import {
  ArrowUpRight,
  DollarSign,
  FileText,
  TrendingUp,
  Waves,
} from "lucide-react";
import type { SummaryMetric } from "./types";

export function getMetricIcon(icon: SummaryMetric["icon"]) {
  switch (icon) {
    case "conversion":
      return Waves;
    case "funded":
      return TrendingUp;
    case "settlement":
      return DollarSign;
    case "revenue":
      return ArrowUpRight;
    default:
      return FileText;
  }
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

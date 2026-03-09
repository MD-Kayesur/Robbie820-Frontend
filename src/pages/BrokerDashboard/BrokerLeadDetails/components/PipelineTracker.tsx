import { CheckCircle2 } from "lucide-react";
import { cn } from "@/hooks/useCn";
import type { LeadStatus } from "../../BrokerOverview/types";

type PipelineTrackerProps = {
  stage: LeadStatus;
};

export default function PipelineTracker({ stage }: PipelineTrackerProps) {
  const steps: Array<{ label: string; key: LeadStatus }> = [
    { label: "New Referral", key: "NEW REFERRAL" },
    { label: "Contacted", key: "CONTACTED" },
    { label: "Application Started", key: "APPLICATION STARTED" },
    { label: "Submitted to Lender", key: "SUBMITTED TO LENDER" },
    { label: "Approved", key: "APPROVED" },
    { label: "Funded", key: "FUNDED" },
  ];

  const currentIndex = steps.findIndex((item) => item.key === stage);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-180">
        <div className="flex items-center">
          {steps.map((item, index) => {
            const done = index < currentIndex;
            const current = index === currentIndex;

            return (
              <div
                key={item.key}
                className="flex flex-1 items-center last:flex-none"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px]",
                      done && "border-[#2563EB] bg-[#2563EB] text-white",
                      current && "border-[#2563EB] bg-white text-[#2563EB]",
                      !done &&
                        !current &&
                        "border-[#D1D5DB] bg-white text-[#D1D5DB]",
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-current" />
                    )}
                  </div>

                  <p className="mt-2 max-w-22.5 text-center text-[11px] text-[#111827]">
                    {item.label}
                  </p>
                </div>

                {index < steps.length - 1 ? (
                  <div
                    className={cn(
                      "mb-6 h-0.5 flex-1",
                      index < currentIndex ? "bg-[#2563EB]" : "bg-[#D1D5DB]",
                    )}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

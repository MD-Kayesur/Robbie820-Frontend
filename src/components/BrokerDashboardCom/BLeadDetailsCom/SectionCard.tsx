import type { ElementType, ReactNode } from "react";
import { cn } from "@/hooks/useCn";

type SectionCardProps = {
  title: string;
  icon?: ElementType;
  children: ReactNode;
  className?: string;
  rightSlot?: ReactNode;
};

export default function SectionCard({
  title,
  icon: Icon,
  children,
  className,
  rightSlot,
}: SectionCardProps) {
  return (
    <section
      className={cn("rounded-xl border border-[#E5E7EB] p-4 md:p-5", className)}
    >
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-3">
        <div className="flex min-w-0 items-center gap-2">
          {Icon ? <Icon className="h-4 w-4 shrink-0 text-[#2563EB]" /> : null}
          <h3 className="text-[15px] font-semibold text-[#111827]">{title}</h3>
        </div>
        {rightSlot}
      </div>

      {children}
    </section>
  );
}

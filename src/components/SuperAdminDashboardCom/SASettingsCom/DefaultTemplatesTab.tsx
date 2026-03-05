// src/components/SuperAdminDashboardCom/SASettingsCom/DefaultTemplatesTab.tsx

import { useState } from "react";
import { Eye, FileText, SquarePen } from "lucide-react";
import { TemplateItem } from "@/pages/SuperAdminDashboard/SuperAdminSettings/types";
import { templatesMock } from "@/pages/SuperAdminDashboard/SuperAdminSettings/mock";
import { cn } from "@/hooks/useCn";

export default function DefaultTemplatesTab() {
  const [items] = useState<TemplateItem[]>(templatesMock);

  return (
    <div className="space-y-5.5 inter">
      {/* Agreement & Email Templates */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        {/* Header */}
        <div className="p-5.5">
          <h2 className="text-base font-semibold text-black">
            Agreement &amp; Email Templates
          </h2>
        </div>

        {/* Content */}
        <div className="px-5.5 pb-5.5">
          <div className="space-y-3">
            {items.map((t) => (
              <div
                key={t.id}
                className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-[#F9FAFB] px-4 py-4"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-[#DBEAFE]">
                    <FileText className="h-4.5 w-4.5 text-[#155DFC]" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {t.title}
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      {t.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => console.log("Preview", t.id)}
                    className={cn(
                      "inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3",
                      "text-xs font-semibold text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <Eye className="h-4 w-4" />
                    Preview
                  </button>

                  <button
                    type="button"
                    onClick={() => console.log("Edit", t.id)}
                    className={cn(
                      "inline-flex h-9 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3",
                      "text-xs font-semibold text-slate-700 hover:bg-slate-50",
                    )}
                  >
                    <SquarePen className="h-4 w-4" />
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-violet-200 bg-violet-50/60 px-6 py-4">
        <p className="text-sm text-violet-900">
          <span className="font-bold">Note:</span> Template changes will apply
          to all new documents and emails. Existing sent communications will not
          be affected.
        </p>
      </div>
    </div>
  );
}

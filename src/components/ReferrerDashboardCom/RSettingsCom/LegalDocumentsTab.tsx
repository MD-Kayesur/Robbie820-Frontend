// src/components/ReferrerDashboardCom/RSettingsCom/LegalDocumentsTab.tsx

import React from "react";
import { Download, Upload, File } from "lucide-react";
import { LegalDocument } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-[#1B72311A] px-3.5 py-1.5 text-sm text-[#1B7231] ring-1 ring-[#1B7231]">
      {children}
    </span>
  );
}

export default function LegalDocumentsTab({
  docs,
  onUpload,
  onDownload,
}: {
  docs: LegalDocument[];
  onUpload: () => void;
  onDownload: (id: string) => void;
}) {
  return (
    <div className="space-y-8">
      {/* blue header */}
      <div className="rounded-2xl bg-[#00B4FE] px-6 py-6 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="mt-1 grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <File className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-medium">Legal Documents</p>
              <p className="text-sm">
                View and manage agreements between you and the broker team.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onUpload}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-white/95"
          >
            <Upload className="h-4 w-4" />
            Upload New Documents
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="grid gap-17 sm:grid-cols-2 lg:grid-cols-3">
        {docs.map((d) => (
          <div
            key={d.id}
            className="rounded-2xl border border-slate-200 bg-white p-6"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-[#00B4FE26] text-[#00B4FE] ring-1 ring-sky-200">
                <File className="h-6 w-6" />
              </div>
              <Pill>{d.type}</Pill>
            </div>

            <p className="mt-5.5 line-clamp-2 text-sm font-medium text-slate-900">
              {d.title}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              {d.sizeLabel}. Uploaded {d.uploadedOn}
            </p>

            <button
              type="button"
              onClick={() => onDownload(d.id)}
              className={cn(
                "mt-6 inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl",
                "bg-[#00B4FE] text-sm font-medium leading-4 text-white hover:opacity-95",
              )}
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

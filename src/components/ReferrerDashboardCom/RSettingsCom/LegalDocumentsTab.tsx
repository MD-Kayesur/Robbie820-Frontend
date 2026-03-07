// src/components/ReferrerDashboardCom/RSettingsCom/LegalDocumentsTab.tsx

import React from "react";
import { Download, FileText, Upload } from "lucide-react";
import { LegalDocument } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[#63AC73] bg-[#1B72311A] px-5 py-2 text-[16px] leading-none text-[#1B7231] md:px-3.5 md:py-1.5 md:text-sm">
      {children}
    </span>
  );
}

function DocCard({
  doc,
  onDownload,
}: {
  doc: LegalDocument;
  onDownload: (id: string) => void;
}) {
  return (
    <div className="rounded-3xl border border-[#D6D6D6] bg-white p-6 md:rounded-2xl md:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-19 w-19 shrink-0 place-items-center rounded-2xl bg-[#00B4FE26] text-[#00B4FE] md:h-12 md:w-12 md:rounded-lg">
          <FileText className="h-9 w-9 md:h-6 md:w-6" />
        </div>

        <Pill>{doc.type}</Pill>
      </div>

      <p className="mt-8 line-clamp-2 text-[18px] font-medium leading-tight text-black md:mt-5 md:text-base">
        {doc.title}
      </p>

      <p className="mt-4 text-[14px] leading-7 text-[#777777] md:mt-2 md:text-xs md:leading-5">
        {doc.sizeLabel} Uploaded {doc.uploadedOn}
      </p>

      <button
        type="button"
        onClick={() => onDownload(doc.id)}
        className={cn(
          "mt-8 inline-flex h-17 w-full items-center justify-center gap-3 rounded-xl bg-[#00B4FE] text-[18px] font-medium text-white transition hover:opacity-95",
          "md:mt-6 md:h-11 md:rounded-xl md:text-sm",
        )}
      >
        <Download className="h-6 w-6 md:h-4 md:w-4" />
        Download
      </button>
    </div>
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
    <div className="space-y-8 md:space-y-6">
      {/* hero card */}
      <div className="rounded-[28px] bg-[#00B4FE] px-7 py-8 text-white md:rounded-2xl md:px-6 md:py-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex items-start gap-6 md:gap-3">
            <div className="grid h-19 w-19 shrink-0 place-items-center rounded-2xl bg-white/15 text-white md:h-10 md:w-10 md:rounded-xl">
              <FileText className="h-9 w-9 md:h-5 md:w-5" />
            </div>

            <div className="min-w-0">
              <p className="text-[20px] font-medium leading-none md:text-xl">
                Legal Documents
              </p>
              <p className="mt-5 max-w-95 text-[18px] leading-8 text-white/95 md:mt-2 md:text-sm md:leading-6">
                View and manage agreements between you and the broker team.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onUpload}
            className="inline-flex h-17 w-full items-center justify-center gap-3 rounded-[10px] bg-white px-6 text-[18px] font-medium text-black transition hover:bg-white/95 md:h-10 md:w-auto md:rounded-xl md:px-4 md:text-sm"
          >
            <Upload className="h-6 w-6 md:h-4 md:w-4" />
            Upload New Documents
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="grid gap-9 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {docs.map((doc) => (
          <DocCard key={doc.id} doc={doc} onDownload={onDownload} />
        ))}
      </div>
    </div>
  );
}

// src/components/ReferrerDashboardCom/RSettingsCom/LegalDocumentsTab.tsx

import React from "react";
import { Download, File, Upload } from "lucide-react";
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
    <div className="rounded-3xl border border-[#D6D6D6] bg-white p-4 md:p-6 md:rounded-2xl md:p-6">
      <div className="flex items-start justify-between">
        <div className="grid shrink-0 place-items-center bg-[#00B4FE26] text-[#00B4FE] p-2.5 rounded-lg">
          <File className="h-6 w-6" />
        </div>
        <Pill>{doc.type}</Pill>
      </div>

      <p className="mt-4 md:mt-8 line-clamp-2 text-[18px] font-medium leading-tight text-black md:mt-5 md:text-base">
        {doc.title}
      </p>

      <p className="mt-1 md:mt-2 text-[#777777] text-xs leading-5">
        {doc.sizeLabel} Uploaded {doc.uploadedOn}
      </p>

      <button
        type="button"
        onClick={() => onDownload(doc.id)}
        className={cn(
          "inline-flex w-full items-center justify-center gap-3 bg-[#00B4FE] font-medium text-white transition hover:opacity-95",
          "mt-6 h-11 rounded-xl text-sm",
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
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* hero card */}
      <div className="rounded-2xl bg-[#00B4FE] text-white p-4 md:p-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="flex items-start gap-6 md:gap-3">
            <div className="shrink-0 p-2.5 rounded-lg bg-[#FFFFFF40] text-white">
              <File className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <p className="text-xl font-medium leading-none">
                Legal Documents
              </p>
              <p className="mt-2 text-sm leading-4 md:leading-8">
                View and manage agreements between you and the broker team.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onUpload}
            className="flex w-full md:w-fit items-center justify-center gap-2.5 rounded-[10px] bg-white p-2.5 text-sm font-medium text-black hover:bg-white/95"
          >
            <Upload className="h-5 w-5" />
            Upload New Documents
          </button>
        </div>
      </div>

      {/* cards */}
      <div className="grid gap-6 md:gap-16 md:grid-cols-3">
        {docs.map((doc) => (
          <DocCard key={doc.id} doc={doc} onDownload={onDownload} />
        ))}
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Download, File, Upload, Eye, EyeOff } from "lucide-react";
import { LegalDocument } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";

type BrokerLegalDocument = LegalDocument & {
    visibility: "Broker Only" | "Referral & Broker";
};

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span className="inline-flex items-center rounded-full border border-[#63AC73] bg-[#1B72311A] px-3 py-1 text-xs font-medium text-[#1B7231]">
            {children}
        </span>
    );
}

function DocCard({
    doc,
    onDownload,
    onToggleVisibility,
}: {
    doc: BrokerLegalDocument;
    onDownload: (id: string) => void;
    onToggleVisibility: (id: string) => void;
}) {
    const isPublic = doc.visibility === "Referral & Broker";

    return (
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 transition hover:border-[#0EA5E9]/30">
            <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky-50 text-[#0EA5E9]">
                    <File className="h-5 w-5" />
                </div>
                <Pill>{doc.type}</Pill>
            </div>

            <p className="mt-5 line-clamp-2 text-[15px] font-semibold leading-tight text-[#111827]">
                {doc.title}
            </p>

            <p className="mt-1 text-xs text-[#6B7280]">
                {doc.sizeLabel} • Uploaded {doc.uploadedOn}
            </p>

            <div className="mt-6 flex gap-2">
                <button
                    type="button"
                    onClick={() => onDownload(doc.id)}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] py-2.5 text-sm font-medium text-white transition hover:bg-[#0284C7]"
                >
                    <Download className="h-4 w-4" />
                    Download
                </button>

                <button
                    type="button"
                    onClick={() => onToggleVisibility(doc.id)}
                    title={isPublic ? "Visible to Referral & Broker" : "Broker Only View"}
                    className={cn(
                        "inline-flex w-11 items-center justify-center rounded-xl border transition",
                        isPublic
                            ? "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-slate-50"
                            : "border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100",
                    )}
                >
                    {isPublic ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </button>
            </div>
        </div>
    );
}

export default function PartnerLegalDocuments() {
    const [docs, setDocs] = useState<BrokerLegalDocument[]>([
        {
            id: "doc-1",
            title: "Referral Partnership Agreement - 2026",
            type: "Agreement",
            sizeLabel: "2.4 MB",
            uploadedOn: "Feb 05, 2026",
            visibility: "Referral & Broker",
        },
        {
            id: "doc-2",
            title: "Internal Compliance Review - Q1",
            type: "Policy",
            sizeLabel: "1.2 MB",
            uploadedOn: "Mar 10, 2026",
            visibility: "Broker Only",
        },
    ]);

    const handleUpload = () => {
        // Mock upload
        alert("Upload functionality triggered");
    };

    const handleDownload = (id: string) => {
        // Mock download
        alert(`Downloading document ${id}`);
    };

    const handleToggleVisibility = (id: string) => {
        setDocs((prev) =>
            prev.map((doc) =>
                doc.id === id
                    ? {
                        ...doc,
                        visibility:
                            doc.visibility === "Broker Only"
                                ? "Referral & Broker"
                                : "Broker Only",
                    }
                    : doc,
            ),
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-[#111827]">
                        Legal Documents & Agreements
                    </h2>
                    <p className="mt-1 text-sm text-[#6B7280]">
                        Manage partnership agreements and internal compliance documents.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleUpload}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] px-6 text-sm font-medium text-white transition hover:bg-[#0284C7]"
                >
                    <Upload className="h-4 w-4" />
                    Upload New Document
                </button>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {docs.map((doc) => (
                    <DocCard
                        key={doc.id}
                        doc={doc}
                        onDownload={handleDownload}
                        onToggleVisibility={handleToggleVisibility}
                    />
                ))}

                <button
                    type="button"
                    onClick={handleUpload}
                    className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#D1D5DB] bg-[#F9FAFB] p-5 transition hover:border-[#0EA5E9]/40 hover:bg-[#EEF8FF]"
                >
                    <div className="grid h-10 w-10 place-items-center rounded-full bg-white shadow-sm">
                        <Upload className="h-5 w-5 text-[#6B7280]" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-[#111827]">
                            Upload New Documents
                        </p>
                        <p className="mt-1 text-xs text-[#6B7280]">
                            Max file size: 10MB (PDF, DOCX)
                        </p>
                    </div>
                </button>
            </div>
        </div>
    );
}

import { useState } from "react";
import {
    Database,
    RefreshCw,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ExternalLink,
    ChevronDown
} from "lucide-react";
import { cn } from "@/hooks/useCn";
import type { CRMIntegrationState, CRMProvider } from "../types";

type CRMIntegrationTabProps = {
    value: CRMIntegrationState;
    onChange: (value: CRMIntegrationState) => void;
};

const providers: CRMProvider[] = [
    "Salesforce",
    "HubSpot",
    "Pipedrive",
    "Zapier",
    "Custom Webhook"
];

const CRMIntegrationTab = ({ value, onChange }: CRMIntegrationTabProps) => {
    const [testing, setTesting] = useState(false);
    const [providerOpen, setProviderOpen] = useState(false);

    const updateField = <K extends keyof CRMIntegrationState>(
        key: K,
        val: CRMIntegrationState[K]
    ) => {
        onChange({ ...value, [key]: val });
    };

    const handleTestConnection = () => {
        setTesting(true);
        // Simulate API call
        setTimeout(() => {
            setTesting(false);
            updateField("status", "Connected");
            updateField("lastTested", new Date().toLocaleString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true
            }));
        }, 2000);
    };

    return (
        <div className="space-y-6">
            <section className="rounded-[20px] border border-[#DADDE3] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <Database className="h-7 w-7 text-[#0EA5E9]" />
                        <h2 className="text-[20px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[22px]">
                            CRM Configuration
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className={cn(
                            "inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[13px] font-semibold transition-all",
                            value.status === "Connected" ? "bg-[#DDF7E8] text-[#0F9F61]" :
                                value.status === "Failed" ? "bg-[#FEE2E2] text-[#DC2626]" :
                                    "bg-[#F3F4F6] text-[#6B7280]"
                        )}>
                            {value.status === "Connected" && <CheckCircle2 className="h-3.5 w-3.5" />}
                            {value.status === "Failed" && <XCircle className="h-3.5 w-3.5" />}
                            {value.status}
                        </span>
                    </div>
                </div>

                <p className="mt-2 text-[14px] leading-6 text-[#6B7280] sm:text-[16px]">
                    Connect your CRM to automate referral data synchronization and lead management.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-6">
                    <div className="relative">
                        <label className="mb-2 block text-[12px] font-medium uppercase text-[#8B8F97] sm:text-[13px]">
                            Target CRM System
                        </label>
                        <button
                            type="button"
                            onClick={() => setProviderOpen(!providerOpen)}
                            className="group flex h-12 w-full items-center justify-between rounded-[12px] border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-left text-[15px] font-medium text-[#111827] outline-none transition focus:border-sky-300 sm:w-[320px]"
                        >
                            <span>{value.provider}</span>
                            <ChevronDown className={cn("h-4 w-4 text-[#94A3B8] transition-transform", providerOpen && "rotate-180")} />
                        </button>

                        {providerOpen && (
                            <div className="absolute top-[calc(100%+8px)] z-10 w-full rounded-xl border border-[#DADDE3] bg-white py-2 shadow-xl sm:w-[320px]">
                                {providers.map((p) => (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => {
                                            updateField("provider", p);
                                            setProviderOpen(false);
                                        }}
                                        className={cn(
                                            "flex w-full px-4 py-2.5 text-sm transition hover:bg-slate-50",
                                            value.provider === p ? "font-semibold text-[#0EA5E9]" : "text-[#4B5563]"
                                        )}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="block text-[12px] font-medium uppercase text-[#8B8F97] sm:text-[13px]">
                                API Key / Access Token
                            </label>
                            <input
                                type="password"
                                value={value.apiKey}
                                onChange={(e) => updateField("apiKey", e.target.value)}
                                placeholder="Enter your API key"
                                className="h-12 w-full rounded-[12px] border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-[15px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-sky-300"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[12px] font-medium uppercase text-[#8B8F97] sm:text-[13px]">
                                CRM API Endpoint
                            </label>
                            <input
                                type="text"
                                value={value.endpoint}
                                onChange={(e) => updateField("endpoint", e.target.value)}
                                placeholder="https://api.crm.com/v1"
                                className="h-12 w-full rounded-[12px] border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-[15px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-sky-300"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex flex-col gap-4 border-t border-[#F1F5F9] pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleTestConnection}
                            disabled={testing || !value.apiKey}
                            className={cn(
                                "inline-flex h-11 items-center gap-2 rounded-xl px-6 text-[14px] font-medium transition active:scale-95",
                                testing ? "bg-slate-100 text-slate-400" :
                                    value.apiKey ? "bg-[#0B1736] text-white hover:bg-[#1e293b]" :
                                        "bg-slate-100 text-slate-400 cursor-not-allowed"
                            )}
                        >
                            {testing ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                                <RefreshCw className="h-4 w-4" />
                            )}
                            Test Connection
                        </button>
                        <span className="text-[13px] text-[#64748B]">
                            {value.lastTested ? `Last match: ${value.lastTested}` : "Not tested yet"}
                        </span>
                    </div>

                    <a
                        href="#"
                        className="flex items-center gap-1.5 text-[14px] font-medium text-[#0EA5E9] transition hover:text-sky-600"
                    >
                        Setup Guide <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                </div>
            </section>

            <section className="rounded-[20px] border border-[#DADDE3] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                        <h3 className="text-[18px] font-semibold text-[#111827]">
                            Automated Setup
                        </h3>
                        <p className="mt-1 text-[14px] leading-6 text-[#6B7280] sm:text-[15px]">
                            When enabled, ReferNow will attempt to automatically configure standard lead fields in your CRM.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => updateField("autoSetup", !value.autoSetup)}
                        className={cn(
                            "relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full transition-colors",
                            value.autoSetup ? "bg-[#0EA5E9]" : "bg-[#E2E8F0]"
                        )}
                    >
                        <span className={cn(
                            "inline-block h-6 w-6 rounded-full bg-white shadow-sm transition-transform",
                            value.autoSetup ? "translate-x-[24px]" : "translate-x-[2px]"
                        )} />
                    </button>
                </div>

                <div className="mt-6 flex items-start gap-3 rounded-xl bg-[#F0F9FF] p-4">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-[#0EA5E9]" />
                    <div className="text-[13px] leading-5 text-[#334155]">
                        <p className="font-semibold text-[#0369A1]">Integration Monitoring</p>
                        <p className="mt-0.5">Automated uploads will retry up to 3 times in case of network failures. You will be notified via the notification center if manual intervention is required.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CRMIntegrationTab;

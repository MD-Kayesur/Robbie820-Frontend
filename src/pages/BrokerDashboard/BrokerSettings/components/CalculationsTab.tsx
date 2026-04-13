import { Calculator, Percent, ShieldCheck } from "lucide-react";
import type { SystemCalculationsState, GlobalCalculationRule } from "../types";

type CalculationsTabProps = {
    value: SystemCalculationsState;
    onChange: (value: SystemCalculationsState) => void;
};

const CalculationsTab = ({ value, onChange }: CalculationsTabProps) => {
    const updateRule = (id: string, updates: Partial<GlobalCalculationRule>) => {
        onChange({
            ...value,
            rules: value.rules.map((rule) =>
                rule.id === id ? { ...rule, ...updates } : rule,
            ),
        });
    };

    const updateGlobalAggregator = (val: number) => {
        onChange({
            ...value,
            globalAggregatorFee: val,
        });
    };

    return (
        <div className="space-y-6">
            <section className="rounded-[20px] border border-[#DADDE3] bg-white p-4 shadow-sm md:p-6">
                <div className="flex items-center gap-3">
                    <Percent className="h-6 w-6 text-[#0EA5E9]" />
                    <h2 className="text-[18px] font-semibold uppercase tracking-tight text-[#111827] md:text-[22px]">
                        Aggregator Configuration
                    </h2>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-[12px] font-medium uppercase text-[#6B7280]">
                            Global Aggregator Fee (%)
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                value={value.globalAggregatorFee}
                                onChange={(e) => updateGlobalAggregator(Number(e.target.value))}
                                className="h-11 w-full rounded-xl border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-sm font-medium text-[#111827] outline-none transition focus:border-[#0EA5E9]"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">
                                %
                            </span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8]">
                            Standard percentage your aggregator takes before commission splits.
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-[20px] border border-[#DADDE3] bg-white p-4 shadow-sm md:p-6">
                <div className="flex items-center gap-3">
                    <Calculator className="h-6 w-6 text-[#111827]" />
                    <h2 className="text-[18px] font-semibold uppercase tracking-tight text-[#111827] md:text-[22px]">
                        Custom Loan Calculations
                    </h2>
                </div>
                <p className="mt-2 text-sm text-[#6B7280]">
                    Define default commission splits and fees for different loan categories.
                </p>

                <div className="mt-8 space-y-4">
                    <div className="hidden lg:grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-4 px-2 pb-2 text-[11px] font-semibold uppercase text-[#6B7280]">
                        <div>Loan Category</div>
                        <div>Referrer split (%)</div>
                        <div>Aggregator Fee (%)</div>
                        <div>Broker Processing Fee ($)</div>
                    </div>

                    <div className="space-y-3">
                        {value.rules.map((rule) => (
                            <div
                                key={rule.id}
                                className="grid grid-cols-1 gap-4 rounded-2xl border border-[#F1F5F9] bg-[#F8FAFC] p-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:items-center lg:bg-transparent lg:border-0 lg:p-0"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white shadow-sm border border-[#E2E8F0] lg:hidden">
                                        <ShieldCheck className="h-4 w-4 text-[#0EA5E9]" />
                                    </div>
                                    <span className="text-[15px] font-semibold text-[#111827]">
                                        {rule.loanCategory}
                                    </span>
                                </div>

                                <div className="space-y-1.5 lg:space-y-0">
                                    <label className="text-[10px] font-medium uppercase text-[#94A3B8] lg:hidden">
                                        Referrer Split
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={rule.referralCommissionPercent}
                                            onChange={(e) =>
                                                updateRule(rule.id, {
                                                    referralCommissionPercent: Number(e.target.value),
                                                })
                                            }
                                            className="h-10 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm font-medium text-[#111827] outline-none transition focus:border-[#0EA5E9]"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">
                                            %
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1.5 lg:space-y-0">
                                    <label className="text-[10px] font-medium uppercase text-[#94A3B8] lg:hidden">
                                        Aggregator Fee
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={rule.aggregatorFeePercent}
                                            onChange={(e) =>
                                                updateRule(rule.id, {
                                                    aggregatorFeePercent: Number(e.target.value),
                                                })
                                            }
                                            className="h-10 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm font-medium text-[#111827] outline-none transition focus:border-[#0EA5E9]"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">
                                            %
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-1.5 lg:space-y-0">
                                    <label className="text-[10px] font-medium uppercase text-[#94A3B8] lg:hidden">
                                        Processing Fee
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={rule.brokerProcessingFee}
                                            onChange={(e) =>
                                                updateRule(rule.id, {
                                                    brokerProcessingFee: Number(e.target.value),
                                                })
                                            }
                                            className="h-10 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 text-sm font-medium text-[#111827] outline-none transition focus:border-[#0EA5E9]"
                                        />
                                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#94A3B8]">
                                            $
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CalculationsTab;

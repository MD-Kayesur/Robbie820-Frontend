import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Search, Download, MoreVertical } from "lucide-react";

import { useFloatingMenu } from "@/hooks/useFloatingMenu";
import { brokersMock, pillPlan, pillStatus, referrersMock } from "./mock";
import type { BrokerRow, ReferrerRow, StatusFilter, Tab } from "./types";
import { SegmentedTabs } from "@/components/SuperAdminDashboardCom/SAUserManagementCom/SegmentedTabs";
import { MobileBrokerCard } from "@/components/SuperAdminDashboardCom/SAUserManagementCom/MobileBrokerCard";
import { StatusDropdown } from "@/components/SuperAdminDashboardCom/SAUserManagementCom/StatusDropdown";
import { MobileReferrerCard } from "@/components/SuperAdminDashboardCom/SAUserManagementCom/MobileReferrerCard";
import { ActionsMenu } from "@/components/SuperAdminDashboardCom/SAUserManagementCom/ActionsMenu";

export default function SuperAdminUserManagement() {
  const location = useLocation();
  const [tab, setTab] = useState<Tab>(location.state?.tab || "Brokers");
  const [status, setStatus] = useState<StatusFilter>("Active");
  const [q, setQ] = useState("");
  const [menuKey, setMenuKey] = useState<string | null>(null);

  const { triggerRef, menuRef, position } = useFloatingMenu({
    open: !!menuKey,
  });

  const [brokersData, setBrokersData] = useState<BrokerRow[]>(brokersMock);
  const [referrersData, setReferrersData] =
    useState<ReferrerRow[]>(referrersMock);

  const activeUserStatus = useMemo(() => {
    if (!menuKey) return null;
    if (menuKey.startsWith("broker")) {
      return brokersData.find((r) => `broker:${r.name}:${r.company}` === menuKey)?.status;
    } else {
      return referrersData.find((r) => `referrer:${r.name}:${r.linkedBroker}` === menuKey)?.status;
    }
  }, [menuKey, brokersData, referrersData]);

  const brokers = useMemo(() => {
    const s = q.trim().toLowerCase();

    return brokersData
      .filter((r) => r.status === status)
      .filter((r) =>
        !s
          ? true
          : `${r.name} ${r.company} ${r.plan} ${r.commissionYTD}`
            .toLowerCase()
            .includes(s),
      );
  }, [q, status, brokersData]);

  const referrers = useMemo(() => {
    const s = q.trim().toLowerCase();

    const normalized: ReferrerRow["status"] =
      status === "Active" ? "Active" : "Disabled";

    return referrersData
      .filter((r) => r.status === normalized)
      .filter((r) =>
        !s
          ? true
          : `${r.name} ${r.linkedBroker} ${r.totalCommission} ${r.lastLogin}`
            .toLowerCase()
            .includes(s),
      );
  }, [q, status, referrersData]);

  const handleToggleAccess = (key: string) => {
    if (key.startsWith("broker")) {
      setBrokersData((prev) =>
        prev.map((r) =>
          `broker:${r.name}:${r.company}` === key
            ? { ...r, status: r.status === "Active" ? "Suspended" : "Active" }
            : r,
        ),
      );
    } else {
      setReferrersData((prev) =>
        prev.map((r) =>
          `referrer:${r.name}:${r.linkedBroker}` === key
            ? { ...r, status: r.status === "Active" ? "Disabled" : "Active" }
            : r,
        ),
      );
    }

    setMenuKey(null);
  };

  const handleExport = () => {
    const data = tab === "Brokers" ? brokers : referrers;
    if (!data.length) return;

    let csvContent = "data:text/csv;charset=utf-8,";

    if (tab === "Brokers") {
      csvContent +=
        "Broker Name,Company,Subscription Plan,Active Seats,Total Referrers,Total Commission (YTD),Status\n";
      (data as BrokerRow[]).forEach((r) => {
        csvContent += `"${r.name}","${r.company}","${r.plan}",${r.seats},${r.referrers},"${r.commissionYTD}","${r.status}"\n`;
      });
    } else {
      csvContent +=
        "Referrer Name,Linked Broker,Total Referrals,Total Commission Earned,Marked Paid,Status,Last Login\n";
      (data as ReferrerRow[]).forEach((r) => {
        csvContent += `"${r.name}","${r.linkedBroker}",${r.totalReferrals},"${r.totalCommission}","${r.markedPaid}","${r.status}","${r.lastLogin}"\n`;
      });
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${tab.toLowerCase()}_export.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement>, key: string) => {
    if (menuKey === key) {
      setMenuKey(null);
    } else {
      triggerRef.current = e.currentTarget;
      setMenuKey(key);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        <div className="flex flex-col gap-4 md:gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Account Management
            </h1>

            <div className="mt-3">
              <div className="flex w-full items-center gap-2 rounded-xl border border-slate-200 bg-[#F9FAFB] px-4 py-3 md:max-w-105 md:py-2">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search broker, referrer, company..."
                  className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleExport}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 md:h-10 md:w-auto"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        <div className="mt-6 h-px w-full bg-slate-200" />

        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <SegmentedTabs tab={tab} setTab={setTab} />
          <StatusDropdown value={status} onChange={setStatus} />
        </div>

        <div className="mt-6">
          {/* mobile cards */}
          <div className="space-y-4 lg:hidden">
            {tab === "Brokers" ? (
              brokers.length ? (
                brokers.map((r) => {
                  const key = `broker:${r.name}:${r.company}`;
                  return (
                    <MobileBrokerCard
                      key={key}
                      row={r}
                      onToggleMenu={(e) => handleToggleMenu(e, key)}
                    />
                  );
                })
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
                  No brokers found.
                </div>
              )
            ) : referrers.length ? (
              referrers.map((r) => {
                const key = `referrer:${r.name}:${r.linkedBroker}`;
                return (
                  <MobileReferrerCard
                    key={key}
                    row={r}
                    onToggleMenu={(e) => handleToggleMenu(e, key)}
                  />
                );
              })
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
                No referrers found.
              </div>
            )}
          </div>

          {/* desktop tables */}
          <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block">
            {tab === "Brokers" ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-245">
                  <thead className="bg-[#F9FAFB]">
                    <tr className="border-b border-slate-200">
                      {[
                        "Broker Name",
                        "Company",
                        "Subscription Plan",
                        "Active Seats",
                        "Total Referrers",
                        "Total Commission (YTD)",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-4 text-left text-xs font-bold text-slate-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {brokers.map((r) => {
                      const key = `broker:${r.name}:${r.company}`;

                      return (
                        <tr key={key} className="bg-white">
                          <td className="px-5 py-4 text-xs font-semibold text-slate-900">
                            {r.name}
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-700">
                            {r.company}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={[
                                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                pillPlan(r.plan),
                              ].join(" ")}
                            >
                              {r.plan}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-700">
                            {r.seats}
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-700">
                            {r.referrers}
                          </td>
                          <td className="px-5 py-4 text-xs font-semibold text-slate-900">
                            {r.commissionYTD}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={[
                                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                pillStatus(r.status),
                              ].join(" ")}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="relative flex justify-start">
                              <button
                                type="button"
                                onClick={(e) => handleToggleMenu(e, key)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
                                aria-label="Open actions"
                              >
                                <MoreVertical className="h-4 w-4 text-slate-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {!brokers.length && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-12 text-center text-sm text-slate-500"
                        >
                          No brokers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-245">
                  <thead className="bg-white">
                    <tr className="border-b border-slate-200">
                      {[
                        "Referrer Name",
                        "Linked Broker",
                        "Total Referrals",
                        "Total Commission Earned",
                        "Marked Paid",
                        "Status",
                        "Last Login",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-4 text-left text-xs font-bold text-slate-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {referrers.map((r) => {
                      const key = `referrer:${r.name}:${r.linkedBroker}`;

                      return (
                        <tr key={key} className="bg-white">
                          <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                            {r.name}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-700">
                            {r.linkedBroker}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-700">
                            {r.totalReferrals}
                          </td>
                          <td className="px-5 py-4 text-sm font-bold text-slate-900">
                            {r.totalCommission}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-700">
                            {r.markedPaid}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={[
                                "inline-flex rounded-full px-3 py-1 text-xs font-bold",
                                pillStatus(r.status),
                              ].join(" ")}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-500">
                            {r.lastLogin}
                          </td>
                          <td className="px-5 py-4">
                            <div className="relative flex justify-end">
                              <button
                                type="button"
                                onClick={(e) => handleToggleMenu(e, key)}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
                                aria-label="Open actions"
                              >
                                <MoreVertical className="h-4 w-4 text-slate-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                    {!referrers.length && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-5 py-12 text-center text-sm text-slate-500"
                        >
                          No referrers found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <ActionsMenu
        ref={menuRef}
        open={!!menuKey}
        onClose={() => setMenuKey(null)}
        onToggleAccess={() => {
          if (menuKey) handleToggleAccess(menuKey);
        }}
        isActive={activeUserStatus === "Active"}
        position={position}
      />
    </div>
  );
}

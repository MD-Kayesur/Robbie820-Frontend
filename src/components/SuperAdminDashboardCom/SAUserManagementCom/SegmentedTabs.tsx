import { Tab } from "@/pages/SuperAdminDashboard/SuperAdminUserManagement/types";

export function SegmentedTabs({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  return (
    <div className="inline-flex w-full items-center rounded-full bg-slate-100 p-1 sm:w-auto">
      {(["Brokers", "Referrers"] as const).map((t) => {
        const active = tab === t;

        return (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={[
              "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition sm:flex-none sm:px-7",
              active ? "bg-white text-slate-900 shadow-sm" : "text-slate-600",
            ].join(" ")}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

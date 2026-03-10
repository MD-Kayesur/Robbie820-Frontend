import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import { cn } from "@/hooks/useCn";
import { useFloatingMenu } from "@/hooks/useFloatingMenu";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { PartnerActionKey } from "@/pages/BrokerDashboard/BrokerPartnerProfiles/types";
import { partnerActionOptions } from "@/pages/BrokerDashboard/BrokerPartnerProfiles/mock";

type PartnerActionsMenuProps = {
  onSelect: (action: PartnerActionKey) => void;
};

const PartnerActionsMenu = ({ onSelect }: PartnerActionsMenuProps) => {
  const [open, setOpen] = useState(false);

  const { triggerRef, menuRef, position } = useFloatingMenu({
    open,
    gap: 8,
    viewportPadding: 8,
  });

  const containerRef = useOutsideClose<HTMLDivElement>(open, () =>
    setOpen(false),
  );

  return (
    <div ref={containerRef}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#94A3B8] transition hover:bg-slate-100 hover:text-slate-700"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {open ? (
        <div
          ref={menuRef}
          style={{
            top: position.top,
            left: position.left,
          }}
          className="fixed z-50 min-w-55 overflow-hidden rounded-2xl border border-slate-200 bg-white py-2 shadow-[0_16px_40px_rgba(15,23,42,0.12)]"
        >
          {partnerActionOptions.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => {
                onSelect(item.key);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-4 py-3 text-left text-sm transition hover:bg-slate-50",
                item.danger ? "text-red-500" : "text-slate-800",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default PartnerActionsMenu;

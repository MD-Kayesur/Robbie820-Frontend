import {
  // Bell,
  Menu,
} from "lucide-react";

type Props = {
  onMenuClick: () => void;
};

const BrokerTopbar = ({ onMenuClick }: Props) => {
  return (
    <header className="flex h-14 sm:h-22 items-center justify-between px-5 lg:hidden">
      <button
        type="button"
        onClick={onMenuClick}
        className="fixed left-4 top-4 grid h-10 w-10 place-items-center rounded-lg p-1 text-black z-50 bg-white shadow-sm ring-1 ring-slate-200"
        aria-label="Open sidebar"
      >
        <Menu size={32} />
      </button>

      {/* <button
        type="button"
        className="fixed right-5 top-4 grid h-10 w-10 place-items-center rounded-lg p-1 text-black"
        aria-label="Notifications"
      >
        <Bell size={32} />
      </button> */}
    </header>
  );
};

export default BrokerTopbar;

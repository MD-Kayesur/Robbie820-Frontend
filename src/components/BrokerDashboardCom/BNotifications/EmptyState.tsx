import { CircleAlert } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex min-h-42 flex-col items-center justify-center px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3F4F6] text-[#9CA3AF]">
        <CircleAlert className="h-6 w-6" />
      </div>
      <p className="mt-4 text-[18px] font-medium text-[#374151]">
        No notifications
      </p>
      <p className="mt-1 text-sm text-[#6B7280]">You're all caught up!</p>
    </div>
  );
};

export default EmptyState;

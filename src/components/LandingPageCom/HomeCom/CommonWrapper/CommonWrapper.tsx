import React from "react";
import { cn } from "@/hooks/useCn";

interface CommonWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const CommonWrapper = ({ children, className }: CommonWrapperProps) => {
  return <div className={cn("pl-4", className)}>{children}</div>;
};

export default CommonWrapper;

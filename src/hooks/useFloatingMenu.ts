import { useEffect, useLayoutEffect, useRef, useState } from "react";

type FloatingPosition = {
  top: number;
  left: number;
};

type UseFloatingMenuOptions = {
  open: boolean;
  gap?: number;
  viewportPadding?: number;
};

export function useFloatingMenu({
  open,
  gap = 8,
  viewportPadding = 8,
}: UseFloatingMenuOptions) {
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [position, setPosition] = useState<FloatingPosition>({
    top: 0,
    left: 0,
  });

  const updatePosition = () => {
    const trigger = triggerRef.current;
    const menu = menuRef.current;

    if (!trigger || !menu) return;

    const triggerRect = trigger.getBoundingClientRect();
    const menuRect = menu.getBoundingClientRect();

    let top = triggerRect.bottom + gap;
    let left = triggerRect.right - menuRect.width;

    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceAbove = triggerRect.top;

    if (
      spaceBelow < menuRect.height + gap &&
      spaceAbove > menuRect.height + gap
    ) {
      top = triggerRect.top - menuRect.height - gap;
    }

    if (left < viewportPadding) {
      left = viewportPadding;
    }

    if (left + menuRect.width > window.innerWidth - viewportPadding) {
      left = window.innerWidth - menuRect.width - viewportPadding;
    }

    if (top < viewportPadding) {
      top = viewportPadding;
    }

    if (top + menuRect.height > window.innerHeight - viewportPadding) {
      top = Math.max(
        viewportPadding,
        window.innerHeight - menuRect.height - viewportPadding,
      );
    }

    setPosition({ top, left });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleReposition = () => updatePosition();

    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open]);

  return {
    triggerRef,
    menuRef,
    position,
    updatePosition,
  };
}

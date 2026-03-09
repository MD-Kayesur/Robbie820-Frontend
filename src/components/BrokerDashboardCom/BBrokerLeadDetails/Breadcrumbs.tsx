import { Link } from "react-router-dom";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-[12px]"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div
            key={`${item.label}-${index}`}
            className="flex items-center gap-2"
          >
            {isLast || !item.to ? (
              <span className="font-medium text-[#111827]">{item.label}</span>
            ) : (
              <Link
                to={item.to}
                className="text-[#9CA3AF] transition hover:text-[#2563EB]"
              >
                {item.label}
              </Link>
            )}

            {!isLast ? <span className="text-[#D1D5DB]">&gt;</span> : null}
          </div>
        );
      })}
    </nav>
  );
}

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import type { NavLink } from "./types";

type DesktopNavProps = {
  pathname: string;
  links?: readonly NavLink[];
  /** When false, hide dropdown chevrons and treat children as absent */
  showDropdowns?: boolean;
  /** Styling variant: primary = larger / more prominent, secondary = subtle */
  variant?: "primary" | "secondary";
};

const DesktopNav = ({
  pathname,
  links,
  showDropdowns = true,
  variant = "secondary",
}: DesktopNavProps) => {
  const items = links ?? [];

  return (
    <nav
      className={cn(
        "mt-0 hidden items-center lg:flex",
        variant === "primary" ? "gap-8 xl:gap-10" : "gap-6",
      )}
    >
      {items.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.children?.some((child) => child.href === pathname) ?? false);

        const baseLinkClass = cn(
          variant === "primary"
            ? "text-base font-semibold xl:text-lg"
            : "text-sm font-medium text-foreground/70",
          "transition-colors hover:text-accent",
          isActive &&
            (variant === "primary" ? "text-accent" : "text-foreground"),
        );

        if (showDropdowns && link.children?.length) {
          return (
            <div key={link.name} className="group relative">
              <Link
                to={link.href}
                className={cn("inline-flex items-center", baseLinkClass)}
              >
                {link.name}
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>

              <div className="invisible absolute left-0 top-full z-40 mt-2 min-w-[13rem] rounded-md border border-border/70 bg-card p-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      "block rounded-sm px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent",
                      pathname === child.href
                        ? "text-accent"
                        : "text-foreground/75",
                    )}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        }

        return (
          <Link key={link.name} to={link.href} className={baseLinkClass}>
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNav;

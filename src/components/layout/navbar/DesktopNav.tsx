import { navLinks } from "@/components/layout/navbar/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type DesktopNavProps = {
  pathname: string;
};

const DesktopNav = ({ pathname }: DesktopNavProps) => {
  return (
    <nav className="mt-2 hidden items-center gap-5 lg:flex xl:gap-6">
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href ||
          (link.children?.some((child) => child.href === pathname) ?? false);

        if (link.children?.length) {
          return (
            <div key={link.name} className="group relative">
              <button
                type="button"
                className={cn(
                  "inline-flex items-center text-base font-semibold transition-colors hover:text-accent xl:text-lg",
                  isActive ? "text-accent" : "text-foreground/70",
                )}
              >
                {link.name}
              </button>

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
          <Link
            key={link.name}
            to={link.href}
            className={cn(
              "text-base font-semibold transition-colors hover:text-accent xl:text-lg",
              isActive ? "text-accent" : "text-foreground/70",
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNav;

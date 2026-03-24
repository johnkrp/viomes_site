import { languages, navLinks } from "@/components/layout/navbar/constants";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

type MobileMenuProps = {
  isOpen: boolean;
  pathname: string;
  language: string;
  onLanguageChange: (value: string) => void;
  onClose: () => void;
};

const MobileMenu = ({
  isOpen,
  pathname,
  language,
  onLanguageChange,
  onClose,
}: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-4.75rem)] overflow-y-auto border-t border-border bg-card text-card-foreground animate-in fade-in slide-in-from-top-4 lg:hidden">
      <div className="container mx-auto flex flex-col gap-5 px-4 py-6">
        {navLinks.map((link) => (
          <div key={link.name} className="border-b border-border pb-4">
            <Link
              to={link.href}
              className="block text-xl font-semibold"
              onClick={onClose}
            >
              {link.name}
            </Link>
            {link.children?.length ? (
              <div className="mt-2 flex flex-col gap-2 pl-3">
                {link.children.map((child) => (
                  <Link
                    key={child.href}
                    to={child.href}
                    className={cn(
                      "text-sm",
                      pathname === child.href
                        ? "text-accent"
                        : "text-foreground/80",
                    )}
                    onClick={onClose}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ))}

        <div className="rounded-lg border border-border bg-card p-3">
          <label className="mb-2 block text-sm font-medium text-foreground/80">
            Language
          </label>
          <select
            value={language}
            onChange={(event) => onLanguageChange(event.target.value)}
            className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
          >
            {languages.map((languageOption) => (
              <option key={languageOption.code} value={languageOption.code}>
                {languageOption.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

import { navLinks } from "@/components/layout/navbar/constants";
import DesktopNav from "@/components/layout/navbar/DesktopNav";
import MobileMenu from "@/components/layout/navbar/MobileMenu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Globe, Menu, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isNearTop = currentScrollY < 24;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      const hasMeaningfulDelta =
        Math.abs(currentScrollY - lastScrollY.current) > 4;

      setIsScrolled(currentScrollY > 20);

      if (isNearTop) {
        setIsHeaderVisible(true);
      } else if (hasMeaningfulDelta && isScrollingUp) {
        setIsHeaderVisible(true);
      } else if (hasMeaningfulDelta && isScrollingDown) {
        setIsHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    lastScrollY.current = window.scrollY;
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsHeaderVisible(true);
    }
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "site-header-footer fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isHeaderVisible ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "bg-secondary/90 backdrop-blur-sm border-b border-border"
          : "bg-background/95 backdrop-blur-sm border-b border-border/60",
      )}
    >
      <div className="relative h-full bg-transparent px-8 py-2 sm:px-10 lg:px-12 lg:flex lg:items-center lg:justify-between lg:py-2.5 lg:gap-6 w-full">
        {/* Left: Logo */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="no-link-underline flex items-center gap-2">
            <img
              src="/images/viomes-logo.png"
              alt="VIOMES Logo"
              className="h-8 w-auto md:h-10"
            />
          </Link>
        </div>

        {/* Left-center: Main subjects */}
        <div className="flex justify-start items-center flex-1 pl-20">
          <DesktopNav
            pathname={location.pathname}
            links={navLinks.slice(0, 2)}
            showDropdowns={false}
            variant="primary"
          />
        </div>

        {/* Right-center: Lesser subjects + search */}
        <div className="flex justify-center items-center gap-4 flex-1">
          <DesktopNav
            pathname={location.pathname}
            links={navLinks.slice(2)}
            variant="secondary"
          />
        </div>

        {/* Right: Social links + settings */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            aria-label="Language settings placeholder"
            className="no-accent-bg inline-flex h-9 items-center gap-1 rounded-sm bg-[hsl(var(--viomes-header-bg))] px-1 text-[14px] font-medium uppercase tracking-[0.04em]"
          >
            <span className="leading-none">EN</span>
            <Globe className="h-4 w-4" />
          </button>
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              className="text-foreground/70 no-accent-bg transition-none hover:bg-transparent hover:text-foreground/70"
            >
              <Search className="w-5 h-5" />
            </Button>
            <img
              src="/images/antagonistikotitaframeEL.jpg"
              alt="EU Competitiveness Program 2021-2027"
              className="h-7 w-auto"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-3 top-3 sm:right-4 lg:hidden"
            onClick={() => setIsMobileMenuOpen((prevState) => !prevState)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        pathname={location.pathname}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
};

export default Navbar;

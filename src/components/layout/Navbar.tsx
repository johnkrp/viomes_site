import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Globe,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Προϊόντα", en: "Products", href: "/products" },
    { name: "Βιομηχανίες", en: "Industries", href: "/industries" },
    { name: "Η Εταιρεία", en: "About", href: "/about" },
    { name: "Ποιότητα", en: "Quality", href: "/quality" },
    { name: "Νέα", en: "News", href: "/news" },
    { name: "Επικοινωνία", en: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/80 backdrop-blur-md h-20 border-border shadow-sm"
          : "bg-transparent h-24 border-transparent",
      )}
    >
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/viomes-logo.png"
            alt="VIOMES Logo"
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                "text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 group",
                location.pathname === link.href
                  ? "text-accent"
                  : "text-primary/70",
              )}
            >
              {link.name}
              {link.name === "Προϊόντα" && (
                <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 mr-4 border-r pr-4 border-border">
            <button className="text-xs font-bold hover:text-accent transition-colors">
              EL
            </button>
            <span className="text-border">|</span>
            <button className="text-xs font-medium text-muted-foreground hover:text-accent transition-colors">
              EN
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent/10 hover:text-accent"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-accent/10 hover:text-accent"
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative hover:bg-accent/10 hover:text-accent"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-20 bg-background z-40 animate-in fade-in slide-in-from-top-4">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xl font-semibold border-b border-border pb-4"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="flex items-center justify-between pt-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="gap-2">
                  <Globe className="w-4 h-4" />
                  Greek (EL)
                </Button>
              </div>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <Search />
                </Button>
                <Button variant="ghost" size="icon">
                  <User />
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

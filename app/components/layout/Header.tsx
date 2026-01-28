"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border glass-panel">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <h1 className="text-xl font-black tracking-tight text-foreground">
                Trendy Packaging
              </h1>
            </Link>
          </div>

          {/* Desktop Nav + Actions */}
          <div className="flex items-center gap-6">
            <nav className="hidden xl:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-semibold transition-colors ${
                    pathname === link.href ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-primary/20 hover:bg-primary/20 transition-colors"
                aria-label="User profile"
              >
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

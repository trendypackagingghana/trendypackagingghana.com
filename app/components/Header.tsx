"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Services", href: "/services" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border glass-panel">
      <div className="max-w-7xl mx-auto px-4 md:px-10 py-3">
        <div className="flex items-center justify-between">
          {/* Logo + Search */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3">
              <h1 className="text-xl font-black tracking-tight text-foreground">
                Trendy Packaging
              </h1>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex min-w-80 max-w-md h-10">
              <div className="flex w-full items-stretch rounded-lg bg-input border border-border overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                <div className="text-muted-foreground flex items-center justify-center pl-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  className="flex w-full border-none bg-transparent focus:outline-none text-sm placeholder:text-muted-foreground px-3 text-foreground"
                  placeholder="Search for bottles, pumps, or jars..."
                />
              </div>
            </div>
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
                href="#contact"
                className="hidden sm:flex min-w-[120px] items-center justify-center rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold shadow-sm hover:opacity-90 transition-all"
              >
                Request Quote
              </Link>
              
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

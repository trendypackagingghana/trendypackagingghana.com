"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NAV_ITEMS, isNavGroup, type NavItem, type NavEntry } from "../_lib/navigation";
import { company } from "@/app/config/company";
import type { UserRole } from "@/lib/auth";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  role: UserRole;
}

function filterNavItems(items: NavEntry[], role: UserRole): NavEntry[] {
  return items
    .map((entry) => {
      if (isNavGroup(entry)) {
        const filtered = entry.items.filter(
          (item) => !item.roles || item.roles.includes(role)
        );
        if (filtered.length === 0) return null;
        return { ...entry, items: filtered };
      }
      if (entry.roles && !entry.roles.includes(role)) return null;
      return entry;
    })
    .filter((entry): entry is NavEntry => entry !== null);
}

export default function Sidebar({ open, onClose, role }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  function renderNavLink(item: NavItem) {
    const isActive =
      item.href === "/dashboard"
        ? pathname === "/dashboard"
        : pathname.startsWith(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={onClose}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
          isActive
            ? "bg-foreground/10 text-foreground font-semibold border-r-4 border-foreground"
            : "text-muted-foreground hover:bg-muted font-medium"
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">
          {item.icon}
        </span>
        {item.label}
      </Link>
    );
  }

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    router.push("/login");
  }

  const nav = (
    <div className="flex flex-col h-full p-4 sm:p-6 justify-between">
      <div className="flex flex-col gap-6 sm:gap-8">
        {/* Branding */}
        <div className="flex flex-col">
          <h1 className="text-sm font-bold leading-tight">{company.legalName}</h1>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1">
          {filterNavItems(NAV_ITEMS, role).map((entry, i) => {
            if (isNavGroup(entry)) {
              return (
                <div key={entry.label} className={i > 0 ? "mt-4" : ""}>
                  <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                    {entry.label}
                  </p>
                  {entry.items.map((item) => renderNavLink(item))}
                </div>
              );
            }
            return renderNavLink(entry);
          })}
        </nav>
      </div>

      {/* Bottom: sign out */}
      <div className="border-t border-border pt-4">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-card border-r border-border h-screen sticky top-0 overflow-y-auto">
        {nav}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="absolute inset-y-0 left-0 w-64 bg-card border-r border-border overflow-y-auto animate-in slide-in-from-left duration-200">
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}

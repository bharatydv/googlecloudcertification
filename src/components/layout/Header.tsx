"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mainNav, site } from "@/lib/site";
import { Icon, Logo } from "@/components/ui/Icon";
import { buttonClass } from "@/components/ui";
import { SearchDialog } from "@/components/search/SearchDialog";

export function Header() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close both overlays whenever navigation happens. Adjusting state during
  // render is React's recommended pattern here — it avoids the extra commit
  // an effect would cause, so the overlay never flashes on the new page.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
  }

  // Cmd/Ctrl+K opens search from anywhere.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-ink-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 rounded-lg py-1"
            aria-label={`${site.name} home`}
          >
            <Logo className="h-8 w-8" />
            <span className="text-[0.95rem] font-semibold tracking-tight text-ink-900">
              {site.name}
            </span>
          </Link>

          <nav
            aria-label="Main"
            className="ml-4 hidden items-center gap-0.5 lg:flex"
          >
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-[0.875rem] font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-brand-50 text-brand-700"
                    : "text-ink-600 hover:bg-ink-100 hover:text-ink-900",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-10 items-center gap-2 rounded-lg border border-ink-200 px-2.5 text-ink-500 transition-colors hover:border-ink-300 hover:text-ink-700 sm:w-52 sm:justify-start lg:w-60"
              aria-label="Search"
            >
              <Icon name="search" className="h-[1.125rem] w-[1.125rem]" />
              <span className="hidden text-[0.8125rem] sm:inline">Search</span>
              <kbd className="ml-auto hidden rounded border border-ink-200 px-1.5 py-0.5 font-sans text-[0.6875rem] text-ink-400 lg:inline">
                ⌘K
              </kbd>
            </button>

            <Link
              href="/signin"
              className="hidden rounded-lg px-3 py-2 text-[0.875rem] font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 sm:block"
            >
              Sign In
            </Link>

            <Link
              href="/practice-tests"
              className={cn(buttonClass("primary", "sm"), "hidden sm:inline-flex")}
            >
              Start Practicing
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-ink-600 transition-colors hover:bg-ink-100 lg:hidden"
            >
              <Icon name={menuOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div
            id="mobile-nav"
            className="border-t border-ink-200 bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="px-5 py-3 sm:px-6">
              <ul className="flex flex-col">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium",
                        isActive(item.href)
                          ? "bg-brand-50 text-brand-700"
                          : "text-ink-700 hover:bg-ink-100",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-2 border-t border-ink-200 pt-3">
                  <Link
                    href="/dashboard"
                    className="block rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-ink-700 hover:bg-ink-100"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signin"
                    className="block rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-ink-700 hover:bg-ink-100"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    href="/practice-tests"
                    className={cn(buttonClass("primary", "md"), "w-full")}
                  >
                    Start Practicing
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        ) : null}
      </header>

      {searchOpen ? <SearchDialog onClose={() => setSearchOpen(false)} /> : null}
    </>
  );
}

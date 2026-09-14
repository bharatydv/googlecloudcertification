"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { displayName, initialsOf, type AuthUser } from "@/lib/auth/types";
import { useSession, useSessionRevalidation } from "@/lib/auth/session";
import { SignOutButton } from "./SignOutButton";

/**
 * The header's account control.
 *
 * Three states, and the first one matters: until `/api/auth/session` answers
 * we do not know who this is, so a neutral placeholder holds the space. A
 * header that renders "Sign in" first and swaps to an avatar a moment later
 * both jumps the layout and tells signed-in people they have been logged out.
 */

const accountLinks = [
  { href: "/dashboard", label: "Dashboard", icon: "chart" },
  { href: "/account", label: "Account settings", icon: "shield" },
] as const;

function Avatar({ user, className }: { user: AuthUser; className?: string }) {
  // Provider avatars are hotlinked from Google's CDN and can fail or be slow;
  // the initials sit underneath rather than as a swap, so there is no flash.
  return (
    <span
      className={cn(
        "relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-[0.75rem] font-semibold text-brand-700",
        className,
      )}
    >
      {initialsOf(user)}
      {user.avatarUrl ? (
        // A 32px provider avatar from Google's CDN. next/image would need a
        // remotePatterns entry and an optimisation round trip for an image
        // already smaller than the request that fetches it.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={user.avatarUrl}
          alt=""
          width={32}
          height={32}
          className="absolute inset-0 h-full w-full object-cover"
          referrerPolicy="no-referrer"
        />
      ) : null}
    </span>
  );
}

export function AccountMenu() {
  // The header is on every page, so this is the one place that needs to watch
  // for a sign-in completing on another route.
  useSessionRevalidation();
  const { user, status, configured } = useSession();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [lastPath, setLastPath] = useState(pathname);

  // Same pattern as the header's other overlays: close on navigation during
  // render, so the menu never lingers over the new page.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (status === "loading") {
    return <span className="hidden h-8 w-8 rounded-full bg-ink-100 sm:block" />;
  }

  if (!user) {
    // With no Supabase configured there is nothing to sign in to, so the link
    // is hidden rather than pointing at a page that can only apologise.
    if (!configured) return null;
    return (
      <Link
        href="/signin"
        className="hidden rounded-lg px-3 py-2 text-[0.875rem] font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 sm:block"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="relative hidden sm:block" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls="account-menu"
        className="flex items-center gap-1.5 rounded-full p-0.5 transition-colors hover:bg-ink-100"
      >
        <Avatar user={user} />
        <span className="sr-only">Account menu for {displayName(user)}</span>
        <Icon
          name="chevron-down"
          className={cn(
            "h-4 w-4 text-ink-400 transition-transform duration-150",
            open && "rotate-180",
          )}
          strokeWidth={2}
        />
      </button>

      {open ? (
        <div
          id="account-menu"
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-card border border-ink-200 bg-white shadow-raised"
        >
          <div className="border-b border-ink-100 px-4 py-3">
            <p className="truncate text-[0.875rem] font-semibold text-ink-900">
              {displayName(user)}
            </p>
            <p className="truncate text-[0.8125rem] text-ink-500">{user.email}</p>
          </div>

          <div className="py-1.5">
            {accountLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                role="menuitem"
                className="flex items-center gap-2.5 px-4 py-2 text-[0.875rem] text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900"
              >
                <Icon name={link.icon} className="h-4 w-4 text-ink-400" />
                {link.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-ink-100">
            <SignOutButton className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-[0.875rem] text-ink-700 transition-colors hover:bg-ink-50 hover:text-ink-900">
              <Icon name="arrow-right" className="h-4 w-4 text-ink-400" />
              Sign out
            </SignOutButton>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/**
 * The same account controls, flattened into the mobile navigation list. A
 * dropdown inside an already-open drawer would be a menu inside a menu.
 */
export function AccountMobileLinks() {
  const { user, status, configured } = useSession();

  if (status === "loading" || !configured) return null;

  const itemClass =
    "block rounded-lg px-3 py-2.5 text-[0.9375rem] font-medium text-ink-700 hover:bg-ink-100";

  if (!user) {
    return (
      <>
        <li>
          <Link href="/signin" className={itemClass}>
            Sign In
          </Link>
        </li>
        <li>
          <Link href="/signup" className={itemClass}>
            Create free account
          </Link>
        </li>
      </>
    );
  }

  return (
    <>
      <li className="px-3 py-2">
        <p className="truncate text-[0.875rem] font-semibold text-ink-900">
          {displayName(user)}
        </p>
        <p className="truncate text-[0.8125rem] text-ink-500">{user.email}</p>
      </li>
      <li>
        <Link href="/account" className={itemClass}>
          Account settings
        </Link>
      </li>
      <li>
        <SignOutButton className={cn(itemClass, "w-full text-left")}>
          Sign out
        </SignOutButton>
      </li>
    </>
  );
}

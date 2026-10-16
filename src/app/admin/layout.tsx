"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Inbox,
  BookMarked,
  Image as ImageIcon,
  Crown,
  ArrowLeft,
  Menu,
  X,
  ShieldCheck,
  Users,
  LogOut,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { AuthProvider, useAuth } from "@/lib/admin/auth";

const navItems: { label: string; href: string; icon: React.ReactNode; ownerOnly?: boolean }[] = [
  { label: "Dashboard Metrics", href: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Multi-Hall Calendar Matrix", href: "/admin/calendar", icon: <CalendarDays className="w-4 h-4" /> },
  { label: "Lead Pipeline (Enquiries)", href: "/admin/enquiries", icon: <Inbox className="w-4 h-4" /> },
  { label: "Bookings & Date Blocking", href: "/admin/bookings", icon: <BookMarked className="w-4 h-4" /> },
  { label: "Gallery & Media Assets", href: "/admin/media", icon: <ImageIcon className="w-4 h-4" /> },
  { label: "Security & MFA", href: "/admin/security", icon: <ShieldCheck className="w-4 h-4" /> },
  { label: "Staff Administration", href: "/admin/staff", icon: <Users className="w-4 h-4" />, ownerOnly: true },
];

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, staff, authLoading, isStaff, isOwner, signOut, staffStatus, staffRoleRaw, staffErrorCode } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // next.config.ts sets trailingSlash, so usePathname() returns "/admin/login/"
  // (with slash). An exact `=== "/admin/login"` comparison is therefore false
  // ON the login page itself, which made the guard redirect the login page to
  // itself forever. Always compare the slash-normalized path.
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  const isLoginPage = normalizedPath === "/admin/login";

  // Unauthenticated visitors are redirected to staff sign-in (never just paneled).
  useEffect(() => {
    if (!isLoginPage && !authLoading && !user) {
      router.replace("/admin/login");
    }
  }, [isLoginPage, authLoading, user, router]);

  const handleSignOut = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  const roleLabel = staff ? staff.role.toUpperCase() : "NO RECORD";

  const userCard = (
    <div className="p-4 mx-3 my-4 rounded-xl bg-zinc-900 border border-zinc-800">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
          Authenticated Session
        </span>
        <span className="text-[10px] font-bold bg-[#C5A059]/20 text-[#DFCA95] px-2 py-0.5 rounded-full">
          {roleLabel}
        </span>
      </div>
      <div className="text-xs font-bold text-white mt-1 truncate">
        {staff ? staff.email : user?.email ?? "—"}
      </div>
      {!isOwner && (
        <div className="text-[10px] text-zinc-400 mt-1">
          {staff ? `${staff.venues.length} venue(s) authorized` : "Awaiting staff record"}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col md:flex-row">
      <aside className="hidden md:flex flex-col w-64 bg-[#141414] text-white border-r border-[#C5A059]/20 shrink-0">
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#C5A059] flex items-center justify-center text-[#1A1A1A]">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-white tracking-wide block">
                ROYAL ADMIN
              </span>
              <span className="text-[10px] text-[#DFCA95] font-semibold tracking-wider uppercase">
                Venue Operations
              </span>
            </div>
          </Link>
        </div>

        {user && userCard}

        <nav className="flex-1 px-3 space-y-1" aria-label="Admin">
          {navItems
            .filter((item) => !item.ownerOnly || isOwner)
            .map((item) => {
            const isActive = normalizedPath === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#C5A059] text-[#1A1A1A] font-bold shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-800 space-y-2">
          {user && (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 transition-colors min-h-[44px]"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          )}
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white px-2 py-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
        </div>
      </aside>

      <div className="md:hidden bg-[#141414] text-white p-4 border-b border-[#C5A059]/30 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-[#C5A059]" />
          <span className="font-serif font-bold text-sm tracking-wide">ROYAL ADMIN PORTAL</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-200 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Toggle Navigation"
          aria-expanded={sidebarOpen}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {sidebarOpen && (
        <div className="md:hidden bg-[#141414] text-white p-4 border-b border-zinc-800 space-y-2">
          {user && (
            <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs mb-3">
              <span className="text-[10px] text-[#C5A059] font-bold uppercase">Role: {roleLabel}</span>
              <div className="font-bold truncate">{staff?.email ?? user.email}</div>
            </div>
          )}
          {navItems
            .filter((item) => !item.ownerOnly || isOwner)
            .map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold min-h-[48px] ${
                normalizedPath === item.href ? "bg-[#C5A059] text-[#1A1A1A] font-bold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          {user && (
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-800 text-xs font-semibold min-h-[48px]"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}
          <Link href="/" className="flex items-center gap-2 text-xs text-[#DFCA95] pt-2 min-h-[44px]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      )}

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {isLoginPage || authLoading ? (
          children
        ) : !user ? (
          <div className="max-w-md mx-auto mt-16 text-center">
            <p className="text-xs text-zinc-500">Redirecting to staff sign-in…</p>
            <Link
              href="/admin/login"
              className="mt-4 inline-flex px-6 py-3 rounded-xl bg-[#1A1A1A] text-[#DFCA95] text-xs font-bold min-h-[48px] items-center"
            >
              Go to Staff Sign In
            </Link>
          </div>
        ) : !isStaff ? (
          <div className="max-w-md mx-auto mt-16 bg-white rounded-3xl border border-amber-200 shadow-sm p-8 text-center">
            <h1 className="font-serif text-xl font-bold text-[#1A1A1A]">
              {staffStatus === "invalid-role" ? "Unauthorized Role"
                : staffStatus === "inactive" ? "Staff Access Disabled"
                : staffStatus === "denied" ? "Staff Record Not Accessible"
                : staffStatus === "error" ? "Authorization Lookup Failed"
                : "No Staff Record"}
            </h1>
            <p className="text-xs text-zinc-500 mt-2 mb-3">
              {staffStatus === "invalid-role" ? (
                <>Your staff record carries role <code className="font-mono font-bold">“{staffRoleRaw}”</code>, which grants no admin permissions. Ask the owner to set it to <code className="font-mono">owner</code> or <code className="font-mono">manager</code>.</>
              ) : staffStatus === "inactive" ? (
                <>Your staff record exists but is marked inactive. Ask the owner to re-enable it.</>
              ) : staffStatus === "denied" ? (
                <>The staff lookup was blocked by security rules. This happens when no <code className="font-mono">staff</code> document exists with your exact sign-in UID below — a record under a different ID or email cannot be read. Ask the owner to create it.</>
              ) : staffStatus === "error" ? (
                <>The authorization lookup failed{staffErrorCode ? <> (<code className="font-mono">{staffErrorCode}</code>)</> : null}. Check your connection and reload. Nothing was changed.</>
              ) : (
                <>{user.email} is signed in but no staff document exists for this account. Ask the owner to create one, then reload.</>
              )}
            </p>
            <div className="mb-5 rounded-xl bg-zinc-50 border border-zinc-200 px-3 py-2.5 text-left">
              <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Your sign-in UID</div>
              <div className="font-mono text-xs text-zinc-800 break-all select-all">{user.uid}</div>
              <div className="text-[10px] text-zinc-400 mt-1">The owner must match the staff document ID to this value exactly.</div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-6 py-3 rounded-xl border border-zinc-300 text-xs font-bold min-h-[48px]"
            >
              Sign Out
            </button>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}

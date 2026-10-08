"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Inbox, 
  BookMarked, 
  Image as ImageIcon, 
  Crown, 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Menu, 
  X,
  PlusCircle,
  Bell
} from "lucide-react";
import { siteConfig } from "@/config/site";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Active admin session simulation
  const currentAdmin = {
    name: "N. Nageswara Rao",
    role: "OWNER",
    email: "proprietor@theroyalconventions.com",
  };

  const navItems = [
    {
      label: "Dashboard Metrics",
      href: "/admin/dashboard",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      label: "Multi-Hall Calendar Matrix",
      href: "/admin/calendar",
      icon: <CalendarDays className="w-4 h-4" />,
    },
    {
      label: "Lead Pipeline (Enquiries)",
      href: "/admin/enquiries",
      icon: <Inbox className="w-4 h-4" />,
    },
    {
      label: "Bookings & Date Blocking",
      href: "/admin/bookings",
      icon: <BookMarked className="w-4 h-4" />,
    },
    {
      label: "Gallery & Media Assets",
      href: "/admin/media",
      icon: <ImageIcon className="w-4 h-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-[#141414] text-white border-r border-[#C5A059]/20 shrink-0">
        {/* Brand Banner */}
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

        {/* Current Active User RBAC Badge */}
        <div className="p-4 mx-3 my-4 rounded-xl bg-zinc-900 border border-zinc-800">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
              Authenticated Session
            </span>
            <span className="text-[10px] font-bold bg-[#C5A059]/20 text-[#DFCA95] px-2 py-0.5 rounded-full">
              {currentAdmin.role}
            </span>
          </div>
          <div className="text-xs font-bold text-white mt-1">
            {currentAdmin.name}
          </div>
          <div className="text-[10px] text-zinc-400 truncate">
            {currentAdmin.email}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
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

        {/* Bottom Exit to Public Site */}
        <div className="p-4 border-t border-zinc-800 space-y-2">
          <Link
            href="/admin/bookings"
            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-[#DFCA95] transition-colors"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Block Date / Manual Entry</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white px-2 py-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </Link>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-[#141414] text-white p-4 border-b border-[#C5A059]/30 flex items-center justify-between">
        <Link href="/admin/dashboard" className="flex items-center gap-2">
          <Crown className="w-5 h-5 text-[#C5A059]" />
          <span className="font-serif font-bold text-sm tracking-wide">
            ROYAL ADMIN PORTAL
          </span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-zinc-800 text-zinc-200"
          aria-label="Toggle Navigation"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {sidebarOpen && (
        <div className="md:hidden bg-[#141414] text-white p-4 border-b border-zinc-800 space-y-2">
          <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs mb-3">
            <span className="text-[10px] text-[#C5A059] font-bold uppercase">
              Role: {currentAdmin.role}
            </span>
            <div className="font-bold">{currentAdmin.name}</div>
          </div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                pathname === item.href
                  ? "bg-[#C5A059] text-[#1A1A1A] font-bold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-[#DFCA95] pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Public Website</span>
          </Link>
        </div>
      )}

      {/* Main Admin Content Body */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
}

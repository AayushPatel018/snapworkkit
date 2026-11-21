"use client";
import Link from "next/link";
import { useState } from "react";

interface NavItem {
  label: string;
  href: string;
}

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold shrink-0">
        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-lg transition shadow-2xs"
        >
          Contact
        </Link>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 cursor-pointer"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 shadow-md">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2 mt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs font-semibold text-slate-600">
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="py-2 rounded-lg bg-slate-50 hover:bg-slate-100"
            >
              About
            </Link>
            <Link
              href="/press"
              onClick={() => setMobileOpen(false)}
              className="py-2 rounded-lg bg-slate-50 hover:bg-slate-100"
            >
              Press
            </Link>
            <Link
              href="/privacy-policy"
              onClick={() => setMobileOpen(false)}
              className="py-2 rounded-lg bg-slate-50 hover:bg-slate-100"
            >
              Privacy
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
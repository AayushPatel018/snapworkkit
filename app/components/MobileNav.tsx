"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface NavItem {
  label: string;
  href: string;
}

export default function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex lg:hidden items-center gap-1.5 shrink-0">
      <Link
        href="/contact"
        className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition whitespace-nowrap shadow-2xs"
      >
        Contact
      </Link>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-700 hover:bg-slate-50 transition cursor-pointer shrink-0"
      >
        {open ? "✕" : "☰"}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/25"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-14 right-3 z-50 w-64 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-slate-200 bg-white shadow-xl p-3 space-y-1">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3.5 py-2.5 rounded-xl text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition"
              >
                {item.label}
              </Link>
            ))}

            <div className="pt-2 mt-1 border-t border-slate-100 flex items-center justify-between px-3.5 py-1.5 text-xs font-semibold text-slate-500">
              <Link href="/about" onClick={() => setOpen(false)} className="hover:text-blue-600">
                About
              </Link>
              <Link href="/press" onClick={() => setOpen(false)} className="hover:text-blue-600">
                Press
              </Link>
              <Link
                href="/privacy-policy"
                onClick={() => setOpen(false)}
                className="hover:text-blue-600"
              >
                Privacy
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
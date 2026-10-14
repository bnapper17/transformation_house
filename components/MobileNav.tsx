"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "./Navigation";

function DotsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="5" r="1.75" />
      <circle cx="12" cy="12" r="1.75" />
      <circle cx="12" cy="19" r="1.75" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="nav:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="relative z-50 flex h-12 w-12 items-center justify-center text-primary mr-4"
      >
        {open ? <CloseIcon className="h-8 w-8" /> : <DotsIcon className="h-8 w-8" />}
      </button>

      {/* inert while closed so the off-screen links can't be tabbed to or read by screen readers. */}
      <div
        inert={!open}
        className={`fixed inset-y-0 left-0 z-40 w-4/5 bg-background/80 backdrop-blur-md shadow-xl transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex h-full flex-col items-start justify-center gap-6 px-10 text-xl text-primary">
          {NAV_LINKS.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}

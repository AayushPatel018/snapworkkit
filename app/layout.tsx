import type { Metadata, Viewport } from "next";
import Link from "next/link";
import MobileNav from "@/app/components/MobileNav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SnapWorkKit - Free Online PDF, Image, Student & AI Tools",
    template: "%s | SnapWorkKit",
  },
  description:
    "Free browser-based tools to merge, split, rotate, and number PDFs, compress exam photos to 20KB/50KB, calculate CGPA & 75% attendance, and generate AI prompts.",
  keywords: [
    "merge pdf online free",
    "split pdf pages",
    "compress image to 50kb",
    "compress photo to 20kb",
    "cgpa to percentage calculator",
    "75 percent attendance calculator",
    "json formatter online",
    "ai prompt generator",
  ],
  openGraph: {
    title: "SnapWorkKit - Free Online PDF, Image, Student & AI Tools",
    description:
      "Fast, privacy-friendly browser tools for PDFs, image compression, CGPA & attendance calculators, and AI prompts.",
    type: "website",
    siteName: "SnapWorkKit",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const NAV_LINKS = [
  { label: "Merge PDF", href: "/tools/merge-pdf" },
  { label: "Split PDF", href: "/tools/extract-pdf-pages" },
  { label: "Compress", href: "/tools/image-compressor" },
  { label: "QR Code", href: "/tools/qr-code-generator" },
  { label: "AI Prompts", href: "/prompts" },
  { label: "All Tools", href: "/" },
  { label: "Blog", href: "/blog" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <div className="bg-slate-900 text-slate-200 text-[11px] sm:text-xs py-1.5 px-3.5 border-b border-slate-800">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span className="truncate">
                17+ Free Browser Tools • No File Uploads • Works on Mobile, Tablet &amp; Desktop
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-4 text-slate-300 shrink-0">
              <Link href="/tools/qr-code-generator" className="hover:text-white transition">
                QR Studio
              </Link>
              <Link href="/tools/word-counter" className="hover:text-white transition">
                Word Counter
              </Link>
              <Link href="/tools/age-calculator" className="hover:text-white transition">
                Age Calc
              </Link>
            </div>
          </div>
        </div>

        <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur shadow-2xs">
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-6">
            <div className="flex items-center gap-4 lg:gap-7 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2.5 font-extrabold text-lg sm:text-xl tracking-tight shrink-0 group"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-600 text-white shadow-sm group-hover:scale-105 transition-transform">
                  <svg
                    className="w-4 h-4 sm:w-4.5 sm:h-4.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M13.5 2L5 13h6.5L10.5 22 19 11h-6.5L13.5 2z" />
                  </svg>
                </span>
                <span className="text-slate-900">
                  SnapWork<span className="text-blue-600">Kit</span>
                </span>
              </Link>

              <nav className="hidden md:flex items-center gap-4 lg:gap-5 text-xs font-bold uppercase tracking-wider text-slate-700">
                {NAV_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-blue-600 transition whitespace-nowrap py-1"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <MobileNav items={NAV_LINKS} />
          </div>
        </header>

        <div className="flex-1 w-full">{children}</div>

        <footer className="border-t border-slate-200 bg-white mt-14 sm:mt-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10 border-b border-slate-200/80">
              <div className="lg:col-span-4 space-y-4">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2.5 font-extrabold text-xl tracking-tight"
                >
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xs">
                    <svg
                      className="w-4.5 h-4.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M13.5 2L5 13h6.5L10.5 22 19 11h-6.5L13.5 2z" />
                    </svg>
                  </span>
                  <span className="text-slate-900">
                    SnapWork<span className="text-blue-600">Kit</span>
                  </span>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  An all-in-one browser toolkit for PDF editing, exam form image compression,
                  student attendance &amp; CGPA calculators, QR codes, and structured AI prompts.
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80">
                    100% Free
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80">
                    Browser-Based
                  </span>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    No Account Needed
                  </span>
                </div>
              </div>

              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-7 text-sm">
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3.5">
                    PDF &amp; Image
                  </h3>
                  <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm">
                    <li>
                      <Link href="/tools/merge-pdf" className="hover:text-blue-600 transition">
                        Merge PDF
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/extract-pdf-pages" className="hover:text-blue-600 transition">
                        Split / Extract PDF
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/image-to-pdf" className="hover:text-blue-600 transition">
                        Images to PDF
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/image-compressor" className="hover:text-blue-600 transition">
                        Image Compressor
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/add-page-numbers" className="hover:text-blue-600 transition">
                        Add Page Numbers
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3.5">
                    Student &amp; AI
                  </h3>
                  <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm">
                    <li>
                      <Link href="/tools/attendance-calculator" className="hover:text-blue-600 transition">
                        75% Attendance
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/cgpa-calculator" className="hover:text-blue-600 transition">
                        CGPA Calculator
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/word-counter" className="hover:text-blue-600 transition">
                        Word Counter
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/age-calculator" className="hover:text-blue-600 transition">
                        Age Calculator
                      </Link>
                    </li>
                    <li>
                      <Link href="/prompts" className="hover:text-blue-600 transition">
                        AI Prompt Generator
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3.5">
                    Dev &amp; QR
                  </h3>
                  <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm">
                    <li>
                      <Link href="/tools/qr-code-generator" className="hover:text-blue-600 transition">
                        QR Code Generator
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/json-formatter" className="hover:text-blue-600 transition">
                        JSON Formatter
                      </Link>
                    </li>
                    <li>
                      <Link href="/tools/password-generator" className="hover:text-blue-600 transition">
                        Password Generator
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="hover:text-blue-600 transition">
                        How-To Guides
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-900 mb-3.5">
                    Company
                  </h3>
                  <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm">
                    <li>
                      <Link href="/about" className="hover:text-blue-600 transition">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="hover:text-blue-600 transition">
                        Contact &amp; Support
                      </Link>
                    </li>
                    <li>
                      <Link href="/press" className="hover:text-blue-600 transition">
                        Press Kit
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy" className="hover:text-blue-600 transition">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="py-5 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
              <span className="font-bold uppercase tracking-wider text-slate-400">
                Quick Access
              </span>
              <div className="flex flex-wrap gap-2">
                <Link
                  href="/tools/merge-pdf"
                  className="px-3 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 font-semibold transition"
                >
                  PDF Suite
                </Link>
                <Link
                  href="/tools/image-compressor"
                  className="px-3 py-1 rounded-lg bg-slate-50 hover:bg-purple-50 hover:text-purple-700 border border-slate-200/80 font-semibold transition"
                >
                  20KB/50KB Resizer
                </Link>
                <Link
                  href="/tools/attendance-calculator"
                  className="px-3 py-1 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/80 font-semibold transition"
                >
                  Student Calculators
                </Link>
                <Link
                  href="/tools/qr-code-generator"
                  className="px-3 py-1 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 border border-slate-200/80 font-semibold transition"
                >
                  QR &amp; Dev Tools
                </Link>
              </div>
            </div>

            <div className="pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 text-center sm:text-left">
              <p>© 2026 SnapWorkKit. All rights reserved.</p>
              <p>Built with Next.js &amp; Tailwind CSS • Fast • Free • Browser-Based</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface RelatedTool {
  title: string;
  desc: string;
  href: string;
}

interface ToolShellProps {
  title: string;
  subtitle: string;
  accent?: "red" | "blue" | "purple" | "emerald";
  guideTitle?: string;
  guideText?: string;
  relatedTools?: RelatedTool[];
  children: React.ReactNode;
}

const ACCENT_MAP = {
  red: {
    pill: "bg-rose-50 text-rose-700 border-rose-200",
    bar: "from-rose-500 to-red-600",
  },
  blue: {
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    bar: "from-blue-500 to-indigo-600",
  },
  purple: {
    pill: "bg-purple-50 text-purple-700 border-purple-200",
    bar: "from-purple-500 to-violet-600",
  },
  emerald: {
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    bar: "from-emerald-500 to-teal-600",
  },
};

const CATALOG: RelatedTool[] = [
  {
    title: "Extract / Split PDF Pages",
    desc: "Extract selected pages or ranges into a new PDF.",
    href: "/tools/extract-pdf-pages",
  },
  {
    title: "Exam Image Compressor",
    desc: "Resize photos to 20KB, 50KB, or 100KB.",
    href: "/tools/image-compressor",
  },
  {
    title: "75% Attendance Calculator",
    desc: "Check required classes or safe skips.",
    href: "/tools/attendance-calculator",
  },
  {
    title: "Merge PDF Files",
    desc: "Combine multiple PDFs into one clean file.",
    href: "/tools/merge-pdf",
  },
  {
    title: "Images to PDF",
    desc: "Convert JPG and PNG photos into a PDF.",
    href: "/tools/image-to-pdf",
  },
  {
    title: "Add Page Numbers to PDF",
    desc: "Add page numbers to every PDF page footer.",
    href: "/tools/add-page-numbers",
  },
  {
    title: "CGPA to Percentage",
    desc: "Convert CGPA to percentage quickly.",
    href: "/tools/cgpa-calculator",
  },
  {
    title: "AI Prompt Generator",
    desc: "Generate prompts for images, code & study.",
    href: "/prompts",
  },
  {
    title: "Free QR Code Generator",
    desc: "Create PNG QR codes for links, Wi-Fi & text.",
    href: "/tools/qr-code-generator",
  },
  {
    title: "Word & Character Counter",
    desc: "Count words, characters, and reading time.",
    href: "/tools/word-counter",
  },
];

const USAGE_KEY = "snaptools_tool_usage_v1";

export default function ToolShell({
  title,
  subtitle,
  accent = "blue",
  guideTitle,
  guideText,
  relatedTools,
  children,
}: ToolShellProps) {
  const pathname = usePathname();
  const colors = ACCENT_MAP[accent];
  const [suggestedTools, setSuggestedTools] = useState<RelatedTool[]>(() => {
    const pool = relatedTools && relatedTools.length > 0 ? relatedTools : CATALOG;
    return pool.filter((item) => item.href !== pathname).slice(0, 3);
  });

  useEffect(() => {
    if (!pathname) return;

    let usageMap: Record<string, number> = {};
    try {
      const raw = window.localStorage.getItem(USAGE_KEY);
      if (raw) {
        usageMap = JSON.parse(raw) as Record<string, number>;
      }
    } catch {
      usageMap = {};
    }

    // Track current tool visit for personalized suggestions on future visits
    usageMap[pathname] = (usageMap[pathname] || 0) + 1;
    try {
      window.localStorage.setItem(USAGE_KEY, JSON.stringify(usageMap));
    } catch {
      // Ignore storage quota/privacy errors
    }

    const pool = relatedTools && relatedTools.length > 0 ? relatedTools : CATALOG;
    const candidates = pool.filter((item) => item.href !== pathname);

    // Sort by highest user usage count first, preserving base order on ties
    const ranked = candidates
      .map((item, idx) => ({
        item,
        count: usageMap[item.href] || 0,
        idx,
      }))
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.idx - b.idx;
      })
      .slice(0, 3)
      .map((entry) => entry.item);

    setSuggestedTools(ranked);
  }, [pathname, relatedTools]);

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description: subtitle,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-7 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="flex items-center justify-between gap-3 mb-5 sm:mb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs transition"
        >
          <span>←</span>
          <span>All Tools</span>
        </Link>

        <span
          className={`text-[11px] sm:text-xs font-semibold px-3 py-1 rounded-full border ${colors.pill}`}
        >
          100% Local • No Upload
        </span>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200/90 shadow-sm overflow-hidden">
        <div className={`h-1.5 w-full bg-gradient-to-r ${colors.bar}`} />

        <div className="p-5 sm:p-8">
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
            {title}
          </h1>
          <p className="text-slate-600 text-xs sm:text-base mb-6 sm:mb-7 leading-relaxed">
            {subtitle}
          </p>

          {children}
        </div>
      </div>

      {/* Smart Personalized Related Tools Block */}
      {suggestedTools.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3">
            Related Tools You May Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {suggestedTools.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl bg-white border border-slate-200/90 hover:border-blue-400 p-4 shadow-2xs transition group"
              >
                <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* SEO Helpful Guide & FAQ Block */}
      <section className="mt-7 rounded-2xl bg-white border border-slate-200/90 p-5 sm:p-7 space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          {guideTitle || `About ${title}`}
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          {guideText ||
            `${title} is designed to run directly inside your web browser on desktop, tablet, and mobile devices without requiring registration or installing extra software.`}
        </p>

        <div className="pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Is my data kept private?</h3>
            <p className="text-slate-600 leading-relaxed">
              Yes. Processing happens locally in your browser session without requiring an account.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900 mb-1">Does it work on mobile &amp; desktop?</h3>
            <p className="text-slate-600 leading-relaxed">
              Yes. The interface adapts cleanly across phones, tablets, laptops, and desktop browsers.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
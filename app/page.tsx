"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ToolItem {
  title: string;
  desc: string;
  href: string;
  category: "PDF Tools" | "Image Tools" | "Student Tools" | "AI & Dev Tools";
  badgeStyle: string;
  accentHover: string;
}

const ALL_TOOLS: ToolItem[] = [
  {
    title: "Merge PDF",
    desc: "Combine two or more PDF documents into a single clean PDF file.",
    href: "/tools/merge-pdf",
    category: "PDF Tools",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    accentHover: "hover:border-rose-300",
  },
  {
    title: "Images to PDF",
    desc: "Convert JPG and PNG photos into a single organized PDF document.",
    href: "/tools/image-to-pdf",
    category: "PDF Tools",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    accentHover: "hover:border-rose-300",
  },
  {
    title: "Rotate PDF Pages",
    desc: "Rotate sideways or upside-down PDF pages by 90°, 180°, or 270°.",
    href: "/tools/rotate-pdf",
    category: "PDF Tools",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    accentHover: "hover:border-rose-300",
  },
  {
    title: "Extract / Split PDF Pages",
    desc: "Extract selected pages or ranges (e.g., 1, 3-5) into a new PDF file.",
    href: "/tools/extract-pdf-pages",
    category: "PDF Tools",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    accentHover: "hover:border-rose-300",
  },
  {
    title: "Remove PDF Pages",
    desc: "Delete unwanted or blank pages from any PDF and download a clean copy.",
    href: "/tools/remove-pdf-pages",
    category: "PDF Tools",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    accentHover: "hover:border-rose-300",
  },
  {
    title: "Add Page Numbers to PDF",
    desc: "Automatically add clean page numbers to the footer of every PDF page.",
    href: "/tools/add-page-numbers",
    category: "PDF Tools",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    accentHover: "hover:border-rose-300",
  },
  {
    title: "Reverse PDF Page Order",
    desc: "Reverse the page order of scanned PDFs from last-to-first to proper order.",
    href: "/tools/reverse-pdf",
    category: "PDF Tools",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    accentHover: "hover:border-rose-300",
  },
  {
    title: "Text & Notes to PDF",
    desc: "Turn typed notes, drafts, or plain text into a ready-to-share A4 PDF.",
    href: "/tools/text-to-pdf",
    category: "PDF Tools",
    badgeStyle: "bg-rose-50 text-rose-700 border-rose-200",
    accentHover: "hover:border-rose-300",
  },
  {
    title: "Exam Form Image Compressor",
    desc: "Compress photos and signatures to 20KB, 50KB, or 100KB for online forms.",
    href: "/tools/image-compressor",
    category: "Image Tools",
    badgeStyle: "bg-purple-50 text-purple-700 border-purple-200",
    accentHover: "hover:border-purple-300",
  },
  {
    title: "75% Attendance Calculator",
    desc: "Calculate how many classes you need to attend or can safely skip.",
    href: "/tools/attendance-calculator",
    category: "Student Tools",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
    accentHover: "hover:border-blue-300",
  },
  {
    title: "CGPA to Percentage Calculator",
    desc: "Convert your CGPA into percentage using standard conversion formulas.",
    href: "/tools/cgpa-calculator",
    category: "Student Tools",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
    accentHover: "hover:border-blue-300",
  },
  {
    title: "Word & Character Counter",
    desc: "Count words, characters, sentences, and reading time in real time.",
    href: "/tools/word-counter",
    category: "Student Tools",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
    accentHover: "hover:border-blue-300",
  },
  {
    title: "Age Calculator",
    desc: "Calculate exact age in years, months, and days from birth date.",
    href: "/tools/age-calculator",
    category: "Student Tools",
    badgeStyle: "bg-blue-50 text-blue-700 border-blue-200",
    accentHover: "hover:border-blue-300",
  },
  {
    title: "AI Prompt Generator",
    desc: "Generate structured prompts for AI image art, coding, and exam study.",
    href: "/prompts",
    category: "AI & Dev Tools",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentHover: "hover:border-emerald-300",
  },
  {
    title: "JSON Formatter & Validator",
    desc: "Beautify, minify, and validate JSON payloads with instant syntax feedback.",
    href: "/tools/json-formatter",
    category: "AI & Dev Tools",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentHover: "hover:border-emerald-300",
  },
  {
    title: "Strong Password Generator",
    desc: "Generate cryptographically random passwords right inside your browser.",
    href: "/tools/password-generator",
    category: "AI & Dev Tools",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentHover: "hover:border-emerald-300",
  },
  {
    title: "QR Code Generator",
    desc: "Create QR codes for links, WhatsApp, social profiles, Wi-Fi, and text.",
    href: "/tools/qr-code-generator",
    category: "AI & Dev Tools",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accentHover: "hover:border-emerald-300",
  },
];

const CATEGORIES = [
  "All",
  "PDF Tools",
  "Image Tools",
  "Student Tools",
  "AI & Dev Tools",
] as const;

const USAGE_KEY = "snaptools_tool_usage_v1";

export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mostUsedTools, setMostUsedTools] = useState<ToolItem[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(USAGE_KEY);
      if (!raw) return;
      const usageMap = JSON.parse(raw) as Record<string, number>;
      const ranked = ALL_TOOLS.filter((t) => (usageMap[t.href] || 0) > 0)
        .sort((a, b) => (usageMap[b.href] || 0) - (usageMap[a.href] || 0))
        .slice(0, 3);
      setMostUsedTools(ranked);
    } catch {
      // Ignore storage errors
    }
  }, []);

  const visibleTools = ALL_TOOLS.filter((tool) => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      tool.title.toLowerCase().includes(q) ||
      tool.desc.toLowerCase().includes(q) ||
      tool.category.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (visibleTools.length > 0) {
      router.push(visibleTools[0].href);
    }
  };

  return (
    <main className="relative bg-gradient-to-b from-blue-50/70 via-slate-50 to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-7 sm:pt-12 pb-12 sm:pb-16">
        <section className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-700 text-[11px] sm:text-xs font-semibold border border-slate-200/90 shadow-2xs mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Free • No Sign-Up • Browser-Based</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight mb-3">
            Every PDF, Image, Student &amp;{" "}
            <span className="text-blue-600">AI Tool</span> in One Place
          </h1>

          <p className="text-slate-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
            Fast, privacy-friendly tools for everyday tasks—merge or split PDFs, compress exam
            photos, calculate CGPA &amp; attendance, and generate structured AI prompts.
          </p>
        </section>

        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto mb-5 sm:mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools & press Enter (e.g., merge pdf, cgpa, 75%, qr)..."
              className="w-full px-4 py-3 rounded-xl sm:rounded-2xl bg-white border border-slate-200/90 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-800 px-2 py-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </form>

        {/* Most Used Tools Row (Shown when user has used tools) */}
        {mostUsedTools.length > 0 && !searchQuery && activeCategory === "All" && (
          <section className="max-w-4xl mx-auto mb-7 rounded-2xl bg-white/90 border border-slate-200/90 p-4 shadow-2xs">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Your Most Used Tools
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {mostUsedTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200/80 hover:border-blue-300 text-xs sm:text-sm font-semibold text-slate-800 hover:text-blue-700 transition"
                >
                  <span className="truncate">{tool.title}</span>
                  <span>→</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-7 sm:mb-10">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {visibleTools.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {visibleTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className={`group flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-2xs hover:shadow-md ${tool.accentHover} hover:-translate-y-0.5 transition-all duration-150`}
              >
                <div>
                  <span
                    className={`inline-block text-[11px] sm:text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full border mb-3 ${tool.badgeStyle}`}
                  >
                    {tool.category}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    {tool.title}
                  </h2>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {tool.desc}
                  </p>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">
                  <span>Use Tool</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </section>
        ) : (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-200 max-w-lg mx-auto">
            <p className="text-slate-800 font-semibold mb-1">No matching tool found</p>
            <p className="text-slate-500 text-sm mb-4">
              Try searching with another keyword like &ldquo;pdf&rdquo;, &ldquo;cgpa&rdquo;, or &ldquo;prompt&rdquo;.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
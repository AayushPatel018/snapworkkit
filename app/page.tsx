"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";

type CategoryKey = "PDF Tools" | "Image Tools" | "Student Tools" | "AI & Dev Tools";

interface ToolItem {
  title: string;
  description: string;
  href: string;
  category: CategoryKey;
  popular?: boolean;
}

const TOOLS: ToolItem[] = [
  {
    title: "Merge PDF",
    description: "Combine two or more PDF documents into a single clean PDF file.",
    href: "/tools/merge-pdf",
    category: "PDF Tools",
    popular: true,
  },
  {
    title: "Extract / Split PDF Pages",
    description: "Select specific pages or page ranges and save them as a new PDF.",
    href: "/tools/extract-pdf-pages",
    category: "PDF Tools",
    popular: true,
  },
  {
    title: "Images to PDF",
    description: "Convert JPG and PNG photos into a single organized PDF document.",
    href: "/tools/image-to-pdf",
    category: "PDF Tools",
  },
  {
    title: "Rotate PDF Pages",
    description: "Rotate sideways or upside-down PDF pages by 90°, 180°, or 270°.",
    href: "/tools/rotate-pdf",
    category: "PDF Tools",
  },
  {
    title: "Add Page Numbers to PDF",
    description: "Add clean, formatted page numbers to PDF pages in your browser.",
    href: "/tools/add-page-numbers",
    category: "PDF Tools",
  },
  {
    title: "Remove PDF Pages",
    description: "Delete unwanted pages from any PDF file quickly.",
    href: "/tools/remove-pdf-pages",
    category: "PDF Tools",
  },
  {
    title: "Reverse PDF Pages",
    description: "Flip PDF page order from last page to first page.",
    href: "/tools/reverse-pdf",
    category: "PDF Tools",
  },
  {
    title: "Text to PDF",
    description: "Turn plain notes or text into a clean downloadable PDF.",
    href: "/tools/text-to-pdf",
    category: "PDF Tools",
  },
  {
    title: "Image Compressor",
    description: "Reduce image file size while keeping clear visual quality.",
    href: "/tools/image-compressor",
    category: "Image Tools",
    popular: true,
  },
  {
    title: "75% Attendance Calculator",
    description: "Track attendance percentage and see how many classes to attend or skip.",
    href: "/tools/attendance-calculator",
    category: "Student Tools",
    popular: true,
  },
  {
    title: "CGPA Calculator",
    description: "Calculate semester GPA and overall CGPA from grades and credits.",
    href: "/tools/cgpa-calculator",
    category: "Student Tools",
  },
  {
    title: "Word Counter",
    description: "Count words, characters, sentences, and estimated reading time.",
    href: "/tools/word-counter",
    category: "Student Tools",
  },
  {
    title: "Age Calculator",
    description: "Find exact age in years, months, and days from date of birth.",
    href: "/tools/age-calculator",
    category: "Student Tools",
  },
  {
    title: "AI Prompt Generator",
    description: "Build structured prompts for coding, study notes, and content tasks.",
    href: "/prompts",
    category: "AI & Dev Tools",
  },
  {
    title: "QR Code Generator",
    description: "Generate instant QR codes for links, text, and sharing.",
    href: "/tools/qr-code-generator",
    category: "AI & Dev Tools",
  },
  {
    title: "JSON Formatter",
    description: "Beautify, validate, and format JSON data cleanly.",
    href: "/tools/json-formatter",
    category: "AI & Dev Tools",
  },
  {
    title: "Password Generator",
    description: "Create strong, random passwords directly in your browser.",
    href: "/tools/password-generator",
    category: "AI & Dev Tools",
  },
];

const CATEGORIES: { key: CategoryKey; label: string; subtitle: string }[] = [
  { key: "PDF Tools", label: "PDF Tools", subtitle: "Merge, split, rotate & number" },
  { key: "Image Tools", label: "Image Tools", subtitle: "Compress & optimize images" },
  { key: "Student Tools", label: "Student Tools", subtitle: "Attendance, CGPA, words & age" },
  { key: "AI & Dev Tools", label: "AI & Dev Tools", subtitle: "Prompts, QR, JSON & passwords" },
];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | CategoryKey>("All");
  const [showAllOnMobile, setShowAllOnMobile] = useState(false);

  const isFiltering = query.trim().length > 0 || selectedCategory !== "All";

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesCat = selectedCategory === "All" || tool.category === selectedCategory;
      const matchesQuery =
        !q ||
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q);
      return matchesCat && matchesQuery;
    });
  }, [query, selectedCategory]);

  const popularTools = useMemo(() => TOOLS.filter((t) => t.popular), []);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Compact Hero + Search */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 text-xs font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Free • No Sign-Up • Browser-Based
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
          Every PDF, Image, Student &amp; AI Tool in One Place
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
          Pick a category or search a tool—no long scrolling needed. Everything runs fast in your
          browser.
        </p>

        {/* Search Input */}
        <div>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools (e.g., merge pdf, compress, cgpa, 75%, qr)..."
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-2xs focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setShowAllOnMobile(false);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
              selectedCategory === "All"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
            }`}
          >
            All
          </button>

          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition cursor-pointer ${
                  active
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* When Searching or Filtering by Category */}
      {isFiltering ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              {selectedCategory === "All" ? "Search Results" : selectedCategory} (
              {filteredTools.length})
            </h2>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
            >
              Reset
            </button>
          </div>

          {filteredTools.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-sm text-slate-600">
              No matching tools found. Try another keyword like &ldquo;pdf&rdquo;,
              &ldquo;compress&rdquo;, or &ldquo;cgpa&rdquo;.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between gap-3"
                >
                  <div>
                    <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 mb-2">
                      {tool.category}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">{tool.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">{tool.description}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 flex items-center justify-between pt-1">
                    <span>Use Tool</span>
                    <span>→</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* Quick Most Used Tools (Compact for Mobile) */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Quick Popular Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {popularTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-blue-50/60 hover:border-blue-300 transition text-sm font-bold text-slate-800"
                >
                  <span>{tool.title}</span>
                  <span className="text-slate-400">→</span>
                </Link>
              ))}
            </div>
          </section>

          {/* Category Cards (Fast Tap on Phone — No Endless Scroll) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
                Browse by Category
              </h2>
              <button
                type="button"
                onClick={() => setShowAllOnMobile((prev) => !prev)}
                className="sm:hidden text-xs font-bold text-blue-600 cursor-pointer"
              >
                {showAllOnMobile ? "Compact View" : `Show All (${TOOLS.length})`}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {CATEGORIES.map((cat) => {
                const count = TOOLS.filter((t) => t.category === cat.key).length;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className="text-left rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 hover:border-blue-400 hover:shadow-sm transition flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-slate-900">{cat.label}</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {count}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">{cat.subtitle}</p>
                    </div>
                    <span className="text-sm font-bold text-blue-600 shrink-0">Open →</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Full Tools Grid: Always visible on sm+ screens, or when user taps "Show All" on phone */}
          <section className={`${showAllOnMobile ? "block" : "hidden sm:block"} space-y-3.5`}>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">All Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {TOOLS.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-blue-400 hover:shadow-sm transition flex flex-col justify-between gap-3"
                >
                  <div>
                    <span className="inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 mb-2">
                      {tool.category}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">{tool.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">{tool.description}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 flex items-center justify-between pt-1">
                    <span>Use Tool</span>
                    <span>→</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
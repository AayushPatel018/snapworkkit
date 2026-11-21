import Link from "next/link";

interface ToolBreadcrumbProps {
  title: string;
}

export default function ToolBreadcrumb({ title }: ToolBreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 transition"
      >
        <span>←</span>
        <span>All Tools</span>
      </Link>

      <div className="flex items-center gap-2">
        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          100% Browser-Based
        </span>
        <span className="hidden sm:inline text-xs text-slate-400">/</span>
        <span className="hidden sm:inline text-xs font-medium text-slate-500 truncate max-w-[200px]">
          {title}
        </span>
      </div>
    </div>
  );
}
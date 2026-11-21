import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="max-w-xl mx-auto px-4 sm:px-6 py-16 text-center">
      <div className="rounded-2xl bg-white border border-slate-200/90 p-8 shadow-2xs">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-2">
          Error 404
        </p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
          The page or tool you are looking for does not exist or may have moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition"
        >
          Back to All Tools
        </Link>
      </div>
    </main>
  );
}
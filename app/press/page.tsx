import Link from "next/link";

export default function PressPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Some facts about SnapWorkKit
        </h1>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-2xl bg-white border border-slate-200/90 p-7 shadow-2xs">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-sm mb-4">
            01
          </span>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Who are we?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            SnapWorkKit is a lightweight web utility hub created to simplify everyday PDF, image,
            calculation, and AI prompt tasks without unnecessary sign-up walls.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/90 p-7 shadow-2xs">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-rose-50 text-rose-600 font-extrabold text-sm mb-4">
            02
          </span>
          <h2 className="text-lg font-bold text-slate-900 mb-2">What do we do?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            We offer free browser-based tools to merge, rotate, split, number, and reverse PDFs,
            compress images, compute CGPA and attendance, format JSON, and generate AI prompts.
          </p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200/90 p-7 shadow-2xs">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 font-extrabold text-sm mb-4">
            03
          </span>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Browser-first privacy</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            File and text utilities process data directly in the user&apos;s browser so documents
            do not need to be uploaded to external servers for basic tasks.
          </p>
        </div>
      </section>

      <div className="rounded-2xl bg-white border border-slate-200/90 p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Media &amp; Inquiries</h2>
          <p className="text-sm text-slate-600 mt-1">
            Looking for product details or feedback? Reach out through our contact page.
          </p>
        </div>
        <Link
          href="/contact"
          className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shrink-0"
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
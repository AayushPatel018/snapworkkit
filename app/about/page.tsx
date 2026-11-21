import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Our Story
        </h1>
      </div>

      <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed">
        <p>
          The <b className="text-slate-900">SnapTools</b> team is here to make everyday document
          tasks, calculations, and AI prompt drafting effortless. From firsthand experience, we know
          that dealing with PDFs, resizing photos for forms, or formatting JSON can waste valuable
          time.
        </p>

        <p>
          Our goal is simple: offer <b className="text-slate-900">free, accessible</b>, and{" "}
          <b className="text-slate-900">easy-to-use</b> tools without forcing sign-ups or
          complicated menus. What started as a practical hub for students and builders is growing
          into a clean all-in-one utility workspace.
        </p>

        <p>
          Because our file and text tools run directly inside your web browser, your documents and
          images stay on your device—giving you speed and privacy at the same time.
        </p>

        <p>
          We continuously refine existing utilities and add new tools so you can get your work done
          quickly and move on with your day.
        </p>

        <div className="pt-4 flex flex-wrap gap-3">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >
            Explore All Tools
          </Link>
          <Link
            href="/contact"
            className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-sm font-semibold px-5 py-2.5 rounded-xl transition"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </main>
  );
}
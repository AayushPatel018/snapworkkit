import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/app/data/blogPosts";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);
  if (!post) {
    return { title: "Article Not Found" };
  }
  return {
    title: post.title,
    description: post.summary,
  };
}

export default async function BlogArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 px-3.5 py-1.5 rounded-full shadow-2xs transition"
        >
          <span>←</span>
          <span>Back to Blog</span>
        </Link>
      </div>

      <article className="rounded-2xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
            {post.category}
          </span>
          <span className="text-slate-500">{post.readTime}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
          {post.title}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-b border-slate-100 pb-5">
          {post.summary}
        </p>

        <div className="space-y-6">
          {post.sections.map((sec) => (
            <section key={sec.heading} className="space-y-2.5">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base text-slate-700 leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-blue-50/60 rounded-xl p-4 sm:p-5 border border-blue-100">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Try It Now
            </p>
            <p className="text-sm font-semibold text-slate-900 mt-0.5">
              Use the matching browser tool directly without sign-up.
            </p>
          </div>
          <Link
            href={post.toolHref}
            className="inline-block text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shrink-0"
          >
            {post.toolLabel} →
          </Link>
        </div>
      </article>
    </main>
  );
}
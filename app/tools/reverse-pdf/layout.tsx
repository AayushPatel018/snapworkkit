import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reverse PDF Page Order Online Free",
  description:
    "Flip scanned PDF pages from last-to-first back to proper order directly in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
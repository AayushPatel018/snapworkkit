import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Word & Character Counter Online Free",
  description:
    "Count words, characters, sentences, paragraphs, and estimated reading time in real time inside your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Prompt Generator for Images, Coding & Study",
  description:
    "Create structured prompts for AI image generation, coding tasks, and exam preparation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
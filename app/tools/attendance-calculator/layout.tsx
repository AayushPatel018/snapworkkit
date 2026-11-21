import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "75% Attendance Calculator for College Students",
  description:
    "Calculate how many classes you need to attend or can safely skip to maintain 75% attendance.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
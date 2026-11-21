import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CGPA to Percentage Calculator Online",
  description:
    "Convert CGPA into percentage quickly using common university and grading conversion formulas.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
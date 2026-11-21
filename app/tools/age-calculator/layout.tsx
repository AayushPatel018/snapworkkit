import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator Online - Exact Years, Months & Days",
  description:
    "Calculate your exact age in years, months, and days from your date of birth for forms and eligibility checks.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
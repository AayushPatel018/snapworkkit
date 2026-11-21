import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Strong Random Password Generator Online",
  description:
    "Generate strong passwords with custom length, numbers, and symbols locally using Web Crypto.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
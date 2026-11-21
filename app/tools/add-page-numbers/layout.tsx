import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Page Numbers to PDF Online Free",
  description:
    "Add clean bottom-center or bottom-right page numbers to every page of your PDF online.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
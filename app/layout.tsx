import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Chenyu Notes",
    template: "%s | Chenyu Notes",
  },
  description:
    "Chenyu Wang's notes on AI, quantitative finance, analytics, energy, projects, and life.",
  keywords: [
    "Chenyu Wang",
    "AI",
    "quantitative finance",
    "blockchain analytics",
    "business analytics",
    "personal blog",
  ],
  authors: [{ name: "Chenyu Wang" }],
  creator: "Chenyu Wang",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Chenyu Notes",
    title: "Chenyu Notes",
    description:
      "Research, projects, experiments, and personal notes by Chenyu Wang.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Chenyu Notes — AI, Markets, Projects, and Life",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chenyu Notes",
    description:
      "Research, projects, experiments, and personal notes by Chenyu Wang.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GTA VI Guide - Grand Theft Auto VI Walkthrough & Tips",
  description: "The most comprehensive GTA6 guide website, providing the latest news, detailed walkthroughs, mission guides, and game database.",
  keywords: "GTA6, GTA VI, Grand Theft Auto 6, guide, walkthrough, tips, game, Grand Theft Auto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

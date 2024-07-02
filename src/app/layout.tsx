import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Tester } from "@/database/tester";
import NavBar from "@/components/NavBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nexus",
  description: "A simple task management platform",
  icons: { icon: "/icon.png", apple: "/icon.png" },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  Tester.syncAllModelsAndTest();
  return (
    <html lang="en" className="bg-base-200">
      <body className={inter.className + " bg-base-200"}>
        <section className="pb-16">
          <NavBar />
        </section>
        {children}
      </body>
    </html>
  );
}

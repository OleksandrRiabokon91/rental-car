import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Izi rent car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Header />
        </header>

        <main>{children}</main>
        <div id="loader-root"></div>
        <footer>
          <p>Rental Car Footer</p>
          <p>
            Created <time dateTime="2025">2025</time>
          </p>
        </footer>
      </body>
    </html>
  );
}

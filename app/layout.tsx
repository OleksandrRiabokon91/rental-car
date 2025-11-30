import type { Metadata } from "next";

import "./globals.css";

import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-family",
  weight: ["400", "500", "600", "700", "800"], // нужные веса
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--second-family",
  weight: ["400", "500", "600", "700"],
});

import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: {
    default: "Rental Car",
    template: "%s | Rental Car",
  },
  description: "Izi rent car",
  keywords: ["car", "rental", "rent"],
  openGraph: {
    title: "Rental Car",
    description: "Izi rent car",
    url: "https://example.com",
    siteName: "Rental Car",
    images: ["/og-image.jpg"],
    type: "website",
  },
  icons: {
    icon: "/car-lite.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body>
        <header className="header">
          <Header />
        </header>
        <main>{children}</main>
        {/* <div id="loader-root" /> */}
        <footer></footer>
      </body>
    </html>
  );
}

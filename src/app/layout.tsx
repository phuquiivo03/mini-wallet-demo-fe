import type { Metadata } from "next";
import { Geist, Geist_Mono, Momo_Trust_Sans } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/store/provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const momoSans = Momo_Trust_Sans({
  variable: "--font-momo-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SP.TR Account Management",
  description: "Transaction flow testing UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${momoSans.className} ${momoSans.variable}`}
    >
      {/* <StoreProvider> */}
        <body>{children}</body>
      {/* </StoreProvider> */}
    </html>
  );
}

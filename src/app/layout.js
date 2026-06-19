import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import AppToastProvider from "@/Components/AppToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: {
    default: "docAppoint | Doctor Appointment Manager",
    template: "%s",
  },
  description:
    "docAppoint helps patients discover doctors, compare availability, book appointments, and manage bookings from one secure dashboard.",
};

export default function RootLayout({ children }) {
  return (
    <html
      data-theme="light"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        {children}
        <Footer />
        <AppToastProvider />
      </body>
    </html>
  );
}

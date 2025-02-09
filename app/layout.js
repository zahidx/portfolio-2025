import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import DarkModeToggle from "./components/DarkModeToggle";
import Nav from "./pages/Nav";
import Head from "next/head"; // Import the Head component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Portfolio", // Default title
  description: "This is my website description",
  icons: {
    icon: "/portfolio.svg", // Path to favicon (inside `public/` folder)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Add the PWA meta and link tags inside the Head component */}
        <Head>
          <link rel="manifest" href="/manifest.json" />
        </Head>

        {/* Navbar */}
        <Nav />
        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {children}
      </body>
    </html>
  );
}

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DarkModeToggle from "./components/DarkModeToggle";
import Nav from "./pages/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Correct way to add metadata in Next.js 13+
export const metadata = {
  title: "Portfolio",
  description: "This is my website description",
  manifest: "/manifest.json", // ✅ Correct way to add manifest in Next.js
  icons: {
    icon: "/portfolio.svg", // Path to favicon (inside `public/` folder)
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navbar */}
        <Nav />
        {/* Dark Mode Toggle */}
        <DarkModeToggle />

        {children}
      </body>
    </html>
  );
}

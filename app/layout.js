import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./pages/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://portfolio-2025-u.netlify.app"),
  title: {
    default: "Zahidul Islam — Software Engineer & Web Developer",
    template: "%s | Zahidul Islam",
  },
  description:
    "Portfolio of Zahidul Islam, a Software Engineer and Full-Stack Developer specializing in React, Next.js, Node.js, and Computer Vision solutions.",
  keywords: [
    "Zahidul Islam",
    "Zahid",
    "Software Engineer",
    "Full-Stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Portfolio",
    "Dhaka Developer",
  ],
  authors: [{ name: "Zahidul Islam" }],
  creator: "Zahidul Islam",
  manifest: "/manifest.json",
  icons: {
    icon: "/portfolio.svg",
  },
  openGraph: {
    title: "Zahidul Islam — Software Engineer Portfolio",
    description:
      "Passionate Software Engineer skilled in React, Next.js, Node.js, and Computer Vision.",
    url: "https://portfolio-2025-u.netlify.app",
    siteName: "Zahidul Islam Portfolio",
    images: [
      {
        url: "/profile.png",
        width: 800,
        height: 800,
        alt: "Zahidul Islam",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zahidul Islam — Software Engineer Portfolio",
    description:
      "Passionate Software Engineer skilled in React, Next.js, Node.js, and Computer Vision.",
    images: ["/profile.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navbar */}
        <Nav />

        {children}
      </body>
    </html>
  );
}

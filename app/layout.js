import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "PlantHealth - AI-Powered Plant Disease Detection",
  description:
    "Instantly detect diseases in your potato and tomato plants using AI. Get expert recommendations to keep your garden healthy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

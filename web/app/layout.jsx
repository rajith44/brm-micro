import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata = {
  title: "Prestige Gems — Luxury Ceylon Gemstones & Jewelry",
  description:
    "A premium storefront for exceptional Ceylon gemstones, handcrafted jewelry and one-of-a-kind heirloom pieces inspired by Sri Lankan artistry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={cormorant.variable}>
      <body className="bg-cream text-ink">
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

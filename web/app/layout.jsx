import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getCategories } from "@/lib/api";

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

export default async function RootLayout({ children }) {
  const [gemCategories, jewelryCategories] = await Promise.all([
    getCategories("gemstone"),
    getCategories("jewelry"),
  ]);

  return (
    <html lang="en" className={cormorant.variable}>
      <body className="bg-cream text-ink">
        <AnnouncementBar />
        <Header gemCategories={gemCategories} jewelryCategories={jewelryCategories} />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

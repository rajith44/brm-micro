import PageHero from "@/components/PageHero";
import ShopGrid from "@/components/ShopGrid";
import { jewelry } from "@/lib/data";

export const metadata = {
  title: "Jewelry Collection — Prestige Gems",
  description: "Elegant, handcrafted gemstone jewelry for every occasion.",
};

export default function JewelryPage() {
  return (
    <>
      <PageHero
        title="Jewelry Collection"
        crumb="Jewelry"
        subtitle="Elegant, handcrafted pieces set with exceptional Ceylon gemstones and refined artistry."
      />
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-14">
        <ShopGrid products={jewelry} />
      </section>
    </>
  );
}

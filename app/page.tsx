import Header from "./components/layout/Header";
import HeroBanner from "./components/home/HeroBanner";
import CategoryCarousel from "./components/home/CategoryCarousel";
import FeatureCards from "./components/home/FeatureCards";
import NewsletterCTA from "./components/home/NewsletterCTA";
import FooterNew from "./components/layout/FooterNew";
import MobileBottomNav from "./components/layout/MobileBottomNav";

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col pt-16 bg-background">
      <Header />

      <main className="flex-1 max-w-[1280px] mx-auto w-full py-8 pb-24 xl:pb-8">
        <HeroBanner />
        <CategoryCarousel />
        <FeatureCards />
        <NewsletterCTA />
      </main>

      <FooterNew />
      <MobileBottomNav />
    </div>
  );
}

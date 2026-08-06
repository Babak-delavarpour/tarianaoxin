import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyUs } from "@/components/home/WhyUs";
import { Quality } from "@/components/home/Quality";
import { Testimonials } from "@/components/home/Testimonials";
import { HomeCta } from "@/components/home/HomeCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <CategoryGrid />
      <FeaturedProducts />
      <WhyUs />
      <Quality />
      <Testimonials />
      <HomeCta />
    </>
  );
}

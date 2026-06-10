"use client";
import { HeroSection } from "./_Components/Hero/Hero";
import WhoWeAre from "./_Components/home/WhoWeAre";
import TargetAudience from "./_Components/home/TargetAudience";
import Testimonials from "./_Components/home/Testimonials";
import AboutProduct from "./_Components/home/AboutProduct";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <WhoWeAre />
      <TargetAudience />
      <Testimonials />
      <AboutProduct />
    </main>
  );
}

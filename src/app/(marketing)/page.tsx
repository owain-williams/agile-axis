import { Footer } from "@/app/(marketing)/_components/footer";
import { Hero } from "@/app/(marketing)/_components/hero";
import { LandingNav } from "@/app/(marketing)/_components/nav";
import { Pricing } from "@/app/(marketing)/_components/pricing";
import { WhyChooseUs } from "@/app/(marketing)/_components/why-choose-us";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingNav />
      <main className="flex-1">
        <Hero />
        <WhyChooseUs />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

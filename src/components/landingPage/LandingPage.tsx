import Hero from "./HeroSection";
import Footer from "./Footer";
import Header from "./Header";
import CTA from "./Cta";

const LandingPageComponent = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />

      <main className="flex-grow w-full">
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 md:gap-24">
          <div className="w-full mt-20 md:mt-36">
            <Hero />
          </div>

          <CTA />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPageComponent;

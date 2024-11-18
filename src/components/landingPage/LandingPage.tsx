import Hero from "./HeroSection";
import Footer from "./Footer";
import Header from "./Header";
import CTA from "./Cta";
const LandingPageComponent = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        <div className="flex flex-col gap-16 md:gap-24">
          <div className="mt-36">
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

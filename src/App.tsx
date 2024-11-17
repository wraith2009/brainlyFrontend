import Header from "./components/landingPage/Header";
import Hero from "./components/landingPage/HeroSection";
import CTA from "./components/landingPage/Cta";
import Footer from "./components/landingPage/Footer";
const Layout = () => {
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

export default Layout;

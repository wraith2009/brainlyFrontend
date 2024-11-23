import { useState, useEffect } from "react";
import Hero from "./HeroSection";
import Footer from "./Footer";
import Header from "./Header";
import CTA from "./Cta";
import LoadingScreen from "./LoadingScreen";
import { useNavigate } from "react-router-dom";
import apiCall from "../../api/auth.api";

const LandingPageComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function checkValidation() {
      try {
        if (token) {
          const response = await apiCall("/verify-token", {}, "GET");
          if (response.message === "Token is valid") {
            navigate("/Home");
          }
        }
      } catch (error) {
        console.error("Token verification failed");
      } finally {
        setIsLoading(false);
      }
    }
    checkValidation();
  }, [token, navigate]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow w-full">
        <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 md:gap-24">
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

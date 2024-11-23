import { Search, BookMarked, BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between mb-12 md:mb-20">
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left mb-10 lg:mb-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-4">
              Simplify Your
              <span className="block md:inline bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Digital Clutter
              </span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl md:text-2xl text-blue-500 max-w-2xl mb-8">
              Store links, jot down notes, and find them instantly.
            </p>

            <div className="mb-8 md:mb-0">
              <Link to="/Sign-up">
                <button className="px-6 py-3 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-base md:text-lg font-semibold">
                  Get Started - It's Free
                </button>
              </Link>
            </div>
          </div>

          <div className="hidden lg:block w-1/2 max-w-[600px] relative">
            <img
              src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1732176378/Macbook_Mockup_Front_View_UV_1_rbil1e.png"
              alt="Digital organization illustration"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            {
              icon: <Search size={32} className="text-blue-600 mb-4" />,
              title: "Instant Search",
              description: "Find any note or link in milliseconds",
            },
            {
              icon: <BookMarked size={32} className="text-blue-600 mb-4" />,
              title: "Smart Organization",
              description: "Auto-categorize your content",
            },
            {
              icon: <BrainCircuit size={32} className="text-blue-600 mb-4" />,
              title: "AI-Powered",
              description: "Intelligent suggestions and connections",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-center p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {feature.icon}
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 md:mt-16 text-center">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Trusted by thousands of users worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8 opacity-70">
            <div className="h-6 sm:h-8 w-24 sm:w-32 bg-gray-200 rounded"></div>
            <div className="h-6 sm:h-8 w-24 sm:w-32 bg-gray-200 rounded"></div>
            <div className="h-6 sm:h-8 w-24 sm:w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Background Blur Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-[300px] sm:w-[400px] md:w-[500px] h-[300px] sm:h-[400px] md:h-[500px] bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import { Search, BookMarked, BrainCircuit } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:justify-between mb-20">
          <div className="lg:max-w-[50%] flex flex-col items-center lg:items-start text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
              Simplify Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Digital Clutter
              </span>
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-blue-500 max-w-2xl">
              Store links, jot down notes, and find them instantly.
            </p>

            <div className="mt-10">
              <button className="px-4 py-2 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-lg font-semibold">
                Get Started - It's Free
              </button>
            </div>
          </div>

          <div className="hidden lg:block w-[45%] h-[500px] relative -mt-28">
            <img
              src="/public/LandingPage.png"
              alt="Digital organization illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <Search size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Instant Search
            </h3>
            <p className="text-gray-600">
              Find any note or link in milliseconds
            </p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <BookMarked size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              Smart Organization
            </h3>
            <p className="text-gray-600">Auto-categorize your content</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-xl bg-gray-50 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <BrainCircuit size={32} className="text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              AI-Powered
            </h3>
            <p className="text-gray-600">
              Intelligent suggestions and connections
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">
            Trusted by thousands of users worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-70">
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
            <div className="h-8 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
          <div className="w-[500px] h-[500px] bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

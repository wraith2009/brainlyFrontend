import { Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className=" max-w-full h-[300px] bg-blue-100 rounded-full blur-3xl opacity-30"></div>
        </div>
      </div>

      <div className="max-w-7xl mb-10 mx-auto px-4 sm:px-6 lg:px-24">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Organize Your Digital Life?
              </h2>
              <p className="text-lg text-gray-600 mb-6 md:mb-0">
                Join thousands of users who've already simplified their online
                experience.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/Sign-up">
                <button className="px-4 py-2 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition-colors text-lg font-semibold flex items-center justify-center gap-2">
                  <Rocket size={20} />
                  Get Started Free
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

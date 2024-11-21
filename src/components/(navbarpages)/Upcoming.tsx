import Header from "../landingPage/Header";
import Footer from "../landingPage/Footer";

const UpcomingAIPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      <main className="container mt-10 mx-auto px-4 sm:px-8 lg:px-16 py-16 flex-grow">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
            AI Assistance <span className="text-blue-500">Coming Soon!</span> 🤖
          </h1>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto mb-8">
            We're building an intelligent assistant to help you streamline your
            workflow and take productivity to the next level. Stay tuned for
            updates!
          </p>
        </div>

        <div className="flex justify-center">
          <img
            src="https://res.cloudinary.com/dhrbg2jbi/image/upload/v1732176350/Ai_uwrxgn.avif"
            alt="AI Assistance Coming Soon"
            className="max-w-full rounded-lg"
          />
        </div>

        <div className="text-center mt-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg">
            Notify Me
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UpcomingAIPage;

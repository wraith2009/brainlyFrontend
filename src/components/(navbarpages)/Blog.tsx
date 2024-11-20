import Header from "../landingPage/Header";
import Footer from "../landingPage/Footer";

const BlogPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mt-10 mx-auto px-4 sm:px-8 lg:px-16 py-16 flex-grow">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Blog <span className="text-blue-500">Coming Soon!</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            We're working hard to bring you engaging and informative content.
            Stay tuned for updates as we build something exciting for you. 🚀
          </p>
        </div>

        <div className="flex  bg-gray-100 justify-center mt-12">
          <img
            src="/blog illustration.webp"
            alt="Blog Coming Soon Illustration"
            className="max-w-full bg-gray-100 rounded-lg"
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;

import Header from "../landingPage/Header";
import Footer from "../landingPage/Footer";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="container mx-auto mt-10 px-4 sm:px-8 lg:px-16 py-16 flex-grow">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Transparent Pricing Plans for Everyone
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Literally begging you to use our product 🙏
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Starter Plan */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-6">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-green-600 mb-4">
                Starter
              </h3>
              <p className="text-3xl md:text-4xl font-bold mb-4">Free</p>
              <ul className="space-y-2 md:space-y-4 mb-6 text-gray-600 text-sm md:text-base">
                <li>7 days of trial</li>
                <li>Manage up to 50 Students</li>
                <li>Manage up to 10 tutors</li>
                <li>No Payment Integration</li>
                <li>No video lectures</li>
                <li>Post up to 10 events</li>
                <li>For small businesses</li>
              </ul>
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg w-full">
                Start 7-day free trial (Please 🥺)
              </button>
            </div>
          </div>

          {/* Basic Plan */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-6">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">
                Basic
              </h3>
              <p className="text-3xl md:text-4xl font-bold mb-4">
                Coming Soon™
              </p>
              <ul className="space-y-2 md:space-y-4 mb-6 text-gray-600 text-sm md:text-base">
                <li>Manage up to 300 students</li>
                <li>Manage up to 50 teachers</li>
                <li>100 payment instances</li>
                <li>Upload your lectures</li>
                <li>Class-specific chatroom</li>
                <li>Post up to 100 events/month</li>
                <li>For medium businesses</li>
              </ul>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg w-full">
                Notify Me
              </button>
            </div>
          </div>

          {/* Business Plan */}
          <div className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-shadow p-6">
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-bold text-purple-600 mb-4">
                Business
              </h3>
              <p className="text-3xl md:text-4xl font-bold mb-4">
                Coming Soon™
              </p>
              <ul className="space-y-2 md:space-y-4 mb-6 text-gray-600 text-sm md:text-base">
                <li>Manage any number of Students</li>
                <li>Manage any number of faculty</li>
                <li>Payment Integration</li>
                <li>Class-specific chatroom</li>
                <li>AI Assistant</li>
                <li>Post any number of events</li>
                <li>For universities</li>
              </ul>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg w-full">
                Contact Us
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-12 text-gray-600 text-sm md:text-base">
          <p className="italic">
            Disclaimer: We're so desperate for users, we might as well be
            offering our product for exposure. Help a startup out? 😅
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;

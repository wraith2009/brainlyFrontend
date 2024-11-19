import Header from "../landingPage/Header";
import Footer from "../landingPage/Footer";
import { FaLink, FaClipboard, FaSearch, FaUserFriends } from "react-icons/fa";
import { BsFillLightningFill, BsShieldCheck } from "react-icons/bs";

const features = [
  {
    icon: <FaLink className="text-blue-500 text-5xl mb-4" />,
    title: "Unlimited Link Storage",
    description:
      "Effortlessly save, organize, and access your important links from any website. 100xBrainly is your digital second brain.",
  },
  {
    icon: <FaClipboard className="text-green-500 text-5xl mb-4" />,
    title: "Easy Document Surfing",
    description:
      "Quickly retrieve your saved documents, notes, and files from a centralized hub. Never lose track of your essential information.",
  },
  {
    icon: <FaSearch className="text-yellow-500 text-5xl mb-4" />,
    title: "Intelligent Search",
    description:
      "Find what you need in seconds with 100xBrainly's powerful search capabilities. Locate links, files, and content with ease.",
  },
  {
    icon: <FaUserFriends className="text-purple-500 text-5xl mb-4" />,
    title: "Collaborative Workspace",
    description:
      "Share links, documents, and ideas with your team or community. 100xBrainly fosters seamless collaboration.",
  },
  {
    icon: <BsFillLightningFill className="text-orange-500 text-5xl mb-4" />,
    title: "AI Assistant (Coming Soon)",
    description:
      "Harness the power of artificial intelligence to streamline your research, analysis, and content creation.",
  },
  {
    icon: <BsShieldCheck className="text-indigo-500 text-5xl mb-4" />,
    title: "Secure & Reliable",
    description:
      "Trust 100xBrainly to safeguard your data and provide a reliable platform for your digital needs.",
  },
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-16 md:px-16 lg:px-24">
        <div className="text-center mt-10 mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Unlock the Power of <span>100xBrainly</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your digital second brain for seamless link management and content
            surfing.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:mx-[200px] md:mx-[150px] sm:mx-[50px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105"
            >
              {feature.icon}
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;

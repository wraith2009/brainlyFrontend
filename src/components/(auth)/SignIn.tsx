import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../landingPage/Header";
import Footer from "../landingPage/Footer";
import apiCall from "../../api/auth.api";
import { AuthSchema } from "../../config/validators/auth.validator";
import { useSetRecoilState } from "recoil";
import { UserIdState } from "../../recoil/atoms/auth.atom";

const SignInPageComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const setUserId = useSetRecoilState(UserIdState);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await AuthSchema.safeParse(formData);
    } catch (validationError) {
      if (validationError instanceof Error && "errors" in validationError) {
        setError(
          "Validation failed: " + (validationError as any).errors.join(", ")
        );
      } else {
        setError("Validation failed.");
      }
      setLoading(false);
      return;
    }

    const url = "/Signin";
    const data = {
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await apiCall(url, data);

      if (response.token) {
        localStorage.setItem("token", response.token);
        setUserId(response.user._id);
        navigate("/Home");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow mt-10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 max-w-xl">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  100xBrainly
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your digital second brain for storing knowledge, organizing
                thoughts, and boosting productivity.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-lg text-gray-600">
                    Store and organize your thoughts effortlessly
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-lg text-gray-600">
                    Find information instantly with powerful search
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="ml-3 text-lg text-gray-600">
                    Connect ideas and discover new insights
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#676767]">
                  Sign In
                </h2>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#676767]"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#676767]"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div className="flex justify-end">
                    <div className="text-sm">
                      <Link
                        to="#"
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Signing in..." : "Sign in"}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link
                      to="/Sign-up"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SignInPageComponent;

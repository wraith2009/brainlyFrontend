import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "../landingPage/Header";
import Footer from "../landingPage/Footer";
import apiCall from "../../api/auth.api";
import {
  AuthSchema,
  AuthSchemaType,
} from "../../config/validators/auth.validator";

import { useNavigate, Link } from "react-router-dom";

const SignUpPageComponent = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthSchemaType>({
    resolver: zodResolver(AuthSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data: AuthSchemaType) => {
    setError("");
    setLoading(true);

    try {
      const response = await apiCall("/Signup", data);

      if (response) {
        navigate("/Sign-in");
      }
    } catch (err: any) {
      setError(err.message || "Failed to register. Please try again.");
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
                Start Your Journey with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  100xBrainly
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Join thousands of thinkers who've already transformed their
                digital experience. Create your free account today and unlock a
                smarter way to organize your thoughts.
              </p>
            </div>

            <div className="flex-1 w-full max-w-md">
              <div className="p-8 rounded-lg">
                <h2 className="text-3xl font-bold text-center mb-8 text-[#676767]">
                  Register Yourself
                </h2>

                {error && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#676767]"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      {...register("email")}
                      type="email"
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.email && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
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
                      {...register("password")}
                      type="password"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    {errors.password && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.password.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Registering..." : "Register"}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      to="/Sign-in"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Sign In
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

export default SignUpPageComponent;

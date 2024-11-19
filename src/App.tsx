import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LandingPageComponent from "./components/landingPage/LandingPage";
import SignInPageComponent from "./components/(auth)/SignIn";
import SignUpPageComponent from "./components/(auth)/SignUp";
import HomePageComponent from "./components/Dashboard/HomePage";
import SharedPageComponent from "./components/sharablePage/page";
import Sidebar from "./lib/utils";
import TagPage from "./components/ui/filteredTagComponent";
import PricingPage from "./components/(navbarpages)/Pricing";
import BlogPage from "./components/(navbarpages)/Blog";
import UpcomingAIPage from "./components/(navbarpages)/Upcoming";
import FeaturesPage from "./components/(navbarpages)/Feature";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 md:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

const appRouting = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageComponent />,
  },
  {
    path: "/Sign-in",
    element: <SignInPageComponent />,
  },
  {
    path: "/Sign-up",
    element: <SignUpPageComponent />,
  },
  {
    path: "pricing",
    element: <PricingPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/features",
    element: <FeaturesPage />,
  },
  {
    path: "/upcoming",
    element: <UpcomingAIPage />,
  },
  {
    path: "/sharable-link/:id",
    element: <SharedPageComponent />,
  },
  {
    path: "/Home",
    element: <Layout />,
    children: [
      {
        path: "/Home",
        element: <HomePageComponent />,
      },
      {
        path: "/Home/tweets",
        element: <TagPage tag="Tweet" />,
      },
      {
        path: "/Home/videos",
        element: <TagPage tag="Video" />,
      },
      {
        path: "/Home/documents",
        element: <TagPage tag="Document" />,
      },
      {
        path: "/Home/links",
        element: <TagPage tag="Link" />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={appRouting} />;
};

export default App;

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPageComponent from "./components/landingPage/LandingPage";
import SignInPageComponent from "./components/(auth)/SignIn";
import SignUpPageComponent from "./components/(auth)/SignUp";
import HomePageComponent from "./components/Dashboard/HomePage";
import SharedPageComponent from "./components/sharablePage/page";
import TagPage from "./components/ui/filteredTagComponent";
import PricingPage from "./components/(navbarpages)/Pricing";
import BlogPage from "./components/(navbarpages)/Blog";
import UpcomingAIPage from "./components/(navbarpages)/Upcoming";
import FeaturesPage from "./components/(navbarpages)/Feature";
import Layout from "./config/layout";
import SearchResultComponent from "./components/search/SearchResultComponent";

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
        index: true,
        element: <HomePageComponent />,
      },
      {
        path: "tweets",
        element: <TagPage tag="Tweet" />,
      },
      {
        path: "videos",
        element: <TagPage tag="Video" />,
      },
      {
        path: "documents",
        element: <TagPage tag="Document" />,
      },
      {
        path: "links",
        element: <TagPage tag="Link" />,
      },
      {
        path: "searchresults",
        element: <SearchResultComponent />,
      },
      {
        path: "*", // Debugging fallback route
        element: <div>Route Not Found</div>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={appRouting} />;
};

export default App;

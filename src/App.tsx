import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LandingPageComponent from "./components/landingPage/LandingPage";
import SignInPageComponent from "./components/(auth)/SignIn";
import SignUpPageComponent from "./components/(auth)/SignUp";
import HomePageComponent from "./components/Dashboard/HomePage";

import Sidebar from "./lib/utils";
import TagPage from "./components/ui/filteredTagComponent";

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

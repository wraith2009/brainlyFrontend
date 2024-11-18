import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LandingPageComponent from "./components/landingPage/LandingPage";
import SignInPageComponent from "./components/(auth)/SignIn";
import SignUpPageComponent from "./components/(auth)/SignUp";
import HomePageComponent from "./components/Dashboard/HomePage";

import Sidebar from "./lib/utils";
import TweetPageComponent from "./components/Dashboard/TweetPage";
import VideoPageComponent from "./components/Dashboard/VideoPage";
import DocumentPageComponent from "./components/Dashboard/DocumentPage";
import LinkPageComponent from "./components/Dashboard/LinkPage";

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
        element: <TweetPageComponent />,
      },
      {
        path: "/Home/videos",
        element: <VideoPageComponent />,
      },
      {
        path: "/Home/documents",
        element: <DocumentPageComponent />,
      },
      {
        path: "/Home/links",
        element: <LinkPageComponent />,
      },
    ],
  },
]);
const App = () => {
  return <RouterProvider router={appRouting} />;
};

export default App;

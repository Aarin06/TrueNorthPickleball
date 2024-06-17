import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./input.css";
import Landing from "./pages/Landing/Landing";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import mainTheme from "./Themes/mainTheme";
import Join from "./pages/Join/Join";
import Header from "./components/Header/Header";
import Teams from "./pages/Teams/Teams";
import Team from "./pages/Team";
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderMobile from "./components/Header/HeaderMobile";

const root = ReactDOM.createRoot(document.getElementById("root"));


const Layout = ({ children }) => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      {isMobile ? <HeaderMobile /> : <Header />}
      {children}
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Landing />
      </Layout>
    ),
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/signin",
    element: (
      <Layout>
        <Signin />
      </Layout>
    ),
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/aboutus",
    element: <div>test</div>,
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/teams",
    element: (
      <Layout>
        <Teams />
      </Layout>
    ),
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/teams/:teamId",
    element: (
      <Layout>
        <Team />
      </Layout>
    ),
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/schedule",
    element: <div>test</div>,
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/join",
    element: (
      <Layout>
        <Join />
      </Layout>
    ),
    errorElement: <div>404 not found</div>,
  },
]);

root.render(
  <React.StrictMode>
    <>
      <ThemeProvider theme={mainTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  </React.StrictMode>,
);

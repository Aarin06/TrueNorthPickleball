import React from "react";
import { useEffect,useState } from "react";
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
import AboutUs from "./pages/AboutUs";
import Schedule from "./pages/Schedule";
import { getMe } from "./api/userService";
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

const loggedInRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Team />
      </Layout>
    ),
    errorElement: <div>404 not found</div>,
  },
  {
    path: "/aboutus",
    element: (
      <Layout>
        <AboutUs />
      </Layout>
    ),
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
    path: "/schedule",
    element: (
      <Layout>
        <Schedule />
      </Layout>
    ),
    errorElement: <div>404 not found</div>,
  },
]);


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
    element: (
      <Layout>
        <AboutUs />
      </Layout>
    ),
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
    element: (
      <Layout>
        <Schedule />
      </Layout>
    ),
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // getMe().then((res) =>{
    //   if (res){
    //     setIsLoggedIn(true);
    //   }
    //   else{
    //     setIsLoggedIn(false);
    //   }
    // })
  }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      {/* <RouterProvider router={isLoggedIn ? loggedInRouter : router} /> */}
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
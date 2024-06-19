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
import { getUserId } from "./api/userService";
import Waiver from "./pages/Waiver";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import Error from "./pages/Error";

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
        <Landing />
      </Layout>
    ),
    errorElement: 
    <Layout>
      <Error />
    </Layout>,
  },
  {
    path: "/aboutus",
    element: (
      <Layout>
        <AboutUs />
      </Layout>
    )
  },
  {
    path: "/teams",
    element: (
      <Layout>
        <Teams />
      </Layout>
    )
  },
  {
    path: "/teams/:teamId",
    element: (
      <Layout>
        <Team />
      </Layout>
    )
  },
  {
    path: "/schedule",
    element: (
      <Layout>
        <Schedule />
      </Layout>
    )
  },
  {
    path: "/waiver",
    element: (
      <Layout>
        <Waiver />
      </Layout>
    )
  },
  {
    path: "/success",
    element: (
      <Layout>
        <PaymentSuccess />
      </Layout>
    )
  },
  {
    path: "/failure",
    element: (
      <Layout>
        <PaymentFailure />
      </Layout>
    )
  }
]);


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Landing />
      </Layout>
    ),
    errorElement: 
    <Layout>
      <Error />
    </Layout>,
  },
  {
    path: "/signup",
    element: (
      <Layout>
        <Signup />
      </Layout>
    )
  },
  {
    path: "/signin",
    element: (
      <Layout>
        <Signin />
      </Layout>
    )
  },
  {
    path: "/aboutus",
    element: (
      <Layout>
        <AboutUs />
      </Layout>
    )
  },
  {
    path: "/teams",
    element: (
      <Layout>
        <Teams />
      </Layout>
    )
  },
  {
    path: "/teams/:teamId",
    element: (
      <Layout>
        <Team />
      </Layout>
    )
  },
  {
    path: "/schedule",
    element: (
      <Layout>
        <Schedule />
      </Layout>
    )
  },
  {
    path: "/join",
    element: (
      <Layout>
        <Join />
      </Layout>
    )
  }
]);

const App = () => {
  const userId = getUserId();

  // useEffect(() => {
  //   getMe().then((res) =>{
  //     if (res){
  //       setIsLoggedIn(res);
  //     }
  //     else{
  //       setIsLoggedIn(false);
  //     }
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }, []);

  return (
    <ThemeProvider theme={mainTheme}>
      <RouterProvider router={userId ? loggedInRouter : router} />
      {/* <RouterProvider router={router} /> */}
    </ThemeProvider>
  );
};

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
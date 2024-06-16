import { createTheme } from "@mui/material";

const mainTheme = createTheme({
  palette: {
    primary: {
      light: "#ff332c",
      main: "#ac1121",
      dark: "#ac1121",
      contrastText: "#fff",
    },
    secondary: {
      light: "#3b4a67", // Light navy
      main: "#091f37", // Main navy
      dark: "#000a1a", // Dark navy
      contrastText: "#fff",
    },
    // secondary: {
    //   light: '#ff7961',
    //   main: '#ff332c',
    //   dark: '#ba000d',
    //   contrastText: '#000',
    // },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          // Custom styles for the Button component'
          // borderRadius:'5px',
          // backgroundColor: '#ac1121', // Change background color
          // color: 'white', // Change text color
          // padding: '10px 20px', // Adjust padding
          "&:hover": {
            backgroundColor: "#ff332c", // Change background color on hover
          },
          minWidth: "120px",
          minHeight: "40px",
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          backgroundColor: "#ffffff", // Change background color
          width: "400px",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          borderRadius: "5px",
          // backgroundColor: '#dcdcdc', // Change background color
          height: "100vh",
          width: "100%",
        },
      },
    },
  },
});

export default mainTheme;

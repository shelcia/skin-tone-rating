import {
  Box,
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material";
import "./styles/style.css";
import { customTheme } from "./theme";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  const allPages = useRoutes(routes);

  // const [darkTheme] = useContext(ThemeContext);

  const appTheme = customTheme({
    // theme: darkTheme ? "dark" : "light",
    theme: "light",
    direction: "ltr",
  });

  const toasterOptions = {
    style: {
      fontWeight: 500,
      fontFamily: "'Figtree Variable', sans-serif",
    },
  };
  return (
    <>
      <Box
      // className={darkTheme ? `dark-theme` : `light-theme`}
      >
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={appTheme}>
            <CssBaseline />
            <Toaster toastOptions={toasterOptions} />
            {allPages}
          </ThemeProvider>
        </StyledEngineProvider>
      </Box>
    </>
  );
};

export default App;

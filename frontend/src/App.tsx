import React from "react";
import { Layout } from "./layout";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;

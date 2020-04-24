import React from "react";
import { Provider } from "react-redux";
import { Layout } from "./layout";
import { createMuiTheme, ThemeProvider, CssBaseline } from "@material-ui/core";
import { store } from "./store";

function App() {
  const theme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

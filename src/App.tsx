import React from "react";

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import { QuotesExplorerPage } from "./pages/QuotesExplorerPage";

import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/700.css";

const theme = createTheme({
    typography: {
        fontFamily: "Poppins, Arial",
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <QuotesExplorerPage />
        </ThemeProvider>
    );
}

export default App;

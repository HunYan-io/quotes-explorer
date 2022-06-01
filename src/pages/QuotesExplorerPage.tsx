import React, { useEffect, useState } from "react";

import { Grid, CircularProgress, Typography } from "@mui/material";

import { fetchQuotes, Quote } from "../services/quotesService";
import { QuotesExplorer } from "../components/QuotesExplorer";

export const QuotesExplorerPage = () => {
    const [loading, setLoading] = useState(true);
    const [finished, setFinished] = useState(false);
    const [quotes, setQuotes] = useState<Quote[] | null>(null);
    useEffect(() => {
        fetchQuotes()
            .then((quotes) => {
                setQuotes(quotes);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <LoadingScreen />;
    } else if (finished) {
        return <FinishedScreen />;
    } else if (quotes) {
        return (
            <QuotesExplorer
                quotes={quotes}
                onFinished={() => setFinished(true)}
            />
        );
    } else {
        return <ErrorScreen />;
    }
};

const LoadingScreen = () => (
    <Grid container sx={{ minHeight: "100vh", placeContent: "center" }}>
        <CircularProgress />
    </Grid>
);

const FinishedScreen = () => (
    <Grid container sx={{ minHeight: "100vh", placeContent: "center" }}>
        <Typography variant="h2">Welcome</Typography>
    </Grid>
);

const ErrorScreen = () => (
    <Grid container sx={{ minHeight: "100vh", placeContent: "center" }}>
        Unexpected Error
    </Grid>
);

import React, { useState } from "react";

import { Grid, Container } from "@mui/material";

import { QuotesProgressIndicator } from "../components/QuotesProgressIndicator";
import { Quote } from "../services/quotesService";
import { QuoteBox } from "./QuoteBox";
import QuotesNavigation from "./QuotesNavigation";

const wordsPerMinute = 160;

export const resolveQuoteReadingDuration = (quote: Quote) => {
    return (
        (quote.content.split(" ").length / wordsPerMinute) * 60 * 1000 + 1000
    );
};

export const QuotesExplorer = ({
    quotes,
    onFinished,
}: {
    quotes: Quote[];
    onFinished: () => void;
}) => {
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const currentQuote = quotes[currentQuoteIndex];

    return (
        <Container sx={{ minHeight: "100vh", py: 5, display: "flex" }}>
            <Grid container direction="column">
                <Grid item xs="auto">
                    <QuotesProgressIndicator
                        count={quotes.length}
                        currentIndex={currentQuoteIndex}
                        duration={resolveQuoteReadingDuration(currentQuote)}
                        isPaused={isPaused}
                        onReadingFinished={() => {
                            if (currentQuoteIndex < quotes.length - 1) {
                                setCurrentQuoteIndex((i) => i + 1);
                            } else {
                                onFinished();
                            }
                        }}
                    />
                </Grid>
                <Grid item xs={true} container>
                    <QuoteBox
                        quote={currentQuote}
                        animationKey={currentQuoteIndex}
                        onPaused={
                            isPaused ? undefined : () => setIsPaused(true)
                        }
                        onResumed={
                            isPaused ? () => setIsPaused(false) : undefined
                        }
                    />
                </Grid>
                <Grid item xs="auto">
                    <QuotesNavigation
                        onNext={
                            currentQuoteIndex < quotes.length - 1
                                ? () => setCurrentQuoteIndex((i) => i + 1)
                                : onFinished
                        }
                        onPrev={() => setCurrentQuoteIndex((i) => i - 1)}
                        onPauseToggled={() => setIsPaused((p) => !p)}
                        isPaused={isPaused}
                        onSkipped={onFinished}
                        hasPrev={currentQuoteIndex > 0}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

import { Box, Grid, Slide, Typography } from "@mui/material";
import React, { useRef } from "react";
import { Quote } from "../services/quotesService";

type Props = {
    quote: Quote;
    animationKey: React.Key;
    onPaused?: () => void;
    onResumed?: () => void;
};

export const QuoteBox = ({
    quote,
    animationKey,
    onPaused,
    onResumed,
}: Props) => {
    const quoteContainerRef = useRef<HTMLDivElement | null>(null);

    return (
        <Grid
            container
            sx={{ py: 5 }}
            justifyContent="center"
            alignContent="center"
            ref={quoteContainerRef}
            onMouseDown={onPaused}
            onMouseUp={onResumed}
            onMouseLeave={onResumed}
            onTouchStart={onPaused}
            onTouchEnd={onResumed}
            onTouchCancel={onResumed}
        >
            <Box>
                <Slide
                    key={animationKey}
                    direction="up"
                    in={true}
                    timeout={500}
                    container={quoteContainerRef.current}
                    mountOnEnter
                    unmountOnExit
                >
                    <Typography variant="h5" textAlign="center">
                        {quote.content}
                    </Typography>
                </Slide>
            </Box>
        </Grid>
    );
};

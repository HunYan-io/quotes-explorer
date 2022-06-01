import React from "react";
import { Button, Grid, IconButton } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Pause from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

type Props = {
    onSkipped: () => void;
    onPauseToggled: () => void;
    onNext: () => void;
    onPrev: () => void;
    isPaused: boolean;
    hasPrev: boolean;
};

export const QuotesNavigation = ({
    onSkipped,
    onPauseToggled,
    onNext,
    onPrev,
    isPaused,
    hasPrev,
}: Props) => {
    return (
        <Grid container justifyContent="space-between">
            <Grid item xs="auto">
                <Button variant="text" onClick={onSkipped}>
                    Skip
                </Button>
            </Grid>
            <Grid item xs="auto" container spacing={2}>
                <Grid xs="auto" item>
                    <IconButton
                        onClick={onPauseToggled}
                        color="primary"
                        aria-label="pause"
                    >
                        {isPaused ? <PlayArrowIcon /> : <Pause />}
                    </IconButton>
                </Grid>
                <Grid xs="auto" item>
                    <IconButton
                        color="primary"
                        onClick={onPrev}
                        disabled={!hasPrev}
                        aria-label="previous"
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                </Grid>
                <Grid xs="auto" item>
                    <IconButton
                        color="primary"
                        onClick={onNext}
                        aria-label="next"
                    >
                        <ChevronRightIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default QuotesNavigation;

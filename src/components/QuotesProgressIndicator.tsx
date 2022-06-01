import { Grid, LinearProgress } from "@mui/material";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

type Props = {
    count: number;
    currentIndex: number;
    duration: number;
    isPaused: boolean;
    onReadingFinished: () => void;
};

const resolveProgress = (
    index: number,
    currentIndex: number,
    currentProgress: number
) => {
    if (index < currentIndex) {
        return 100;
    } else if (index > currentIndex) {
        return 0;
    } else {
        return currentProgress;
    }
};

export const QuotesProgressIndicator = ({
    count,
    currentIndex,
    duration,
    isPaused,
    onReadingFinished,
}: Props) => {
    const [currentProgress, setCurrentProgress] = useState(0);
    const finishedReading = useRef<boolean>(false);

    useLayoutEffect(() => {
        setCurrentProgress(0);
    }, [currentIndex]);

    useEffect(() => {
        if (isPaused) return;
        let startTime = new Date().getTime();
        let cleanup = false;
        let initialProgress: number | null = null;
        const f = () => {
            if (cleanup) return;
            setCurrentProgress((progress) => {
                if (initialProgress === null) {
                    initialProgress = progress;
                }
                const newProgress = Math.min(
                    initialProgress +
                        ((new Date().getTime() - startTime) * 100) / duration,
                    100
                );
                return newProgress;
            });
            requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
        return () => {
            cleanup = true;
        };
    }, [currentIndex, duration, isPaused]);

    useEffect(() => {
        if (currentProgress < 100 && finishedReading.current) {
            finishedReading.current = false;
        } else if (currentProgress >= 100) {
            if (!finishedReading.current) {
                onReadingFinished();
                finishedReading.current = true;
            }
        }
    }, [currentProgress, onReadingFinished]);

    const indicators: JSX.Element[] = [];
    for (let i = 0; i < count; i++) {
        indicators.push(
            <Grid item key={i} xs={3}>
                <LinearProgress
                    variant="determinate"
                    value={resolveProgress(i, currentIndex, currentProgress)}
                    sx={{
                        "& .MuiLinearProgress-bar": {
                            transition: "none",
                        },
                    }}
                />
            </Grid>
        );
    }
    return (
        <Grid container spacing={2}>
            {indicators}
        </Grid>
    );
};

import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { QuotesExplorer, resolveQuoteReadingDuration } from "./QuotesExplorer";
import { Quote } from "../services/quotesService";

const quotes: Quote[] = [
    {
        id: 5,
        content: "Miracles come in moments. Be ready and willing.",
    },
    { id: 11, content: "Each day provides its own gifts." },
    {
        id: 0,
        content: "Mountains cannot be surmounted except by winding paths.",
    },
    {
        id: 3,
        content:
            "Every time you smile at someone, it is an action of love, a gift to that person, a beautiful thing.",
    },
];

describe("QuotesExplorer", () => {
    it("initially renders the first quote", () => {
        render(<QuotesExplorer quotes={quotes} onFinished={() => {}} />);

        expect(screen.getByText(quotes[0].content)).toBeInTheDocument();
    });

    describe("Manual navigation", () => {
        it("advances when the right arrow button is clicked", () => {
            let finishedCalled = false;
            const onFinished = () => (finishedCalled = true);

            render(<QuotesExplorer quotes={quotes} onFinished={onFinished} />);

            const nextBtn = screen.getByRole("button", { name: /next/i });

            for (const quote of quotes) {
                expect(screen.getByText(quote.content)).toBeInTheDocument();
                fireEvent.click(nextBtn);
            }

            expect(finishedCalled).toEqual(true);
        });

        it("goes back when the left button is clicked", () => {
            render(<QuotesExplorer quotes={quotes} onFinished={() => {}} />);

            const nextBtn = screen.getByRole("button", { name: /next/i });
            const prevBtn = screen.getByRole("button", { name: /previous/i });

            expect(prevBtn).toBeDisabled();

            fireEvent.click(nextBtn);
            expect(prevBtn).toBeEnabled();

            fireEvent.click(prevBtn);
            expect(prevBtn).toBeDisabled();
            expect(screen.getByText(quotes[0].content)).toBeInTheDocument();
        });
    });

    describe("Auto-advancement", () => {
        const timeout = setTimeout;
        const waitForAnimationFrame = () =>
            act(
                () =>
                    new Promise((resolve, reject) => {
                        window.requestAnimationFrame(() => {
                            window.requestAnimationFrame(() => {
                                resolve();
                            });
                        });
                    })
            );
        beforeEach(() => {
            jest.useFakeTimers();
            jest.spyOn(window, "requestAnimationFrame").mockImplementation(
                (cb) => timeout(cb, 5)
            );
        });
        it("auto-advances after an amount of time", async () => {
            render(<QuotesExplorer quotes={quotes} onFinished={() => {}} />);

            const now = new Date().getTime();
            const duration = resolveQuoteReadingDuration(quotes[0]) + 1000;

            act(() => {
                jest.advanceTimersByTime(duration);
                jest.setSystemTime(now + duration);
            });

            await waitForAnimationFrame();

            expect(screen.getByText(quotes[1].content)).toBeInTheDocument();
        });
        it("does not auto-advance when paused", async () => {
            render(<QuotesExplorer quotes={quotes} onFinished={() => {}} />);

            const now = new Date().getTime();
            const duration = resolveQuoteReadingDuration(quotes[0]) + 1000;

            const pauseBtn = screen.getByRole("button", { name: /pause/i });
            fireEvent.click(pauseBtn);

            act(() => {
                jest.advanceTimersByTime(duration);
                jest.setSystemTime(now + duration);
            });

            await waitForAnimationFrame();

            expect(screen.getByText(quotes[0].content)).toBeInTheDocument();
        });
    });
});

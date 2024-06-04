import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "../ErrorFallback";
import { act, render, screen } from "@testing-library/react";
import { Bomb } from "./Bomb";

test('Catch error and show in ErrorFallback', async () => {
    const orgError = console.error;
    try {
        console.error = () => { }
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(() => {
            render(
                <div>
                    <ErrorBoundary FallbackComponent={ErrorFallback}>
                        <Bomb />
                    </ErrorBoundary>
                </div>
            );
        })
    } finally {
        console.error = orgError;
    }
    const linkElement = screen.getAllByText(/CABOOM/i);
    expect(linkElement[0]).toBeInTheDocument();
});
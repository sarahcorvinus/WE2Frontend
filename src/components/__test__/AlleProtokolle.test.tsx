import { render, waitFor, screen } from "@testing-library/react";
import { AlleProtokolle } from "../AlleProtokolle";
import { protokolle } from "../../backend/testdata";

test("render AlleProtokolle", async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve(protokolle)
        } as Response)
    );

    // Provide a mock function for setSelectedProtokoll
    const setSelectedProtokollMock = jest.fn();

    render(<AlleProtokolle protokoll={null} setSelectedProtokoll={setSelectedProtokollMock} />);

    await waitFor(() => {
        const titleTest = screen.getByText(/Alle Protokolle/i);
        expect(titleTest).toBeInTheDocument();
    }, { timeout: 1000 });

    await waitFor(() => {
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
});


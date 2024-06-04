import { render, screen, waitFor } from "@testing-library/react";
import { eintraege, protokolle } from "../../backend/testdata";
import { Protokoll } from "../Protokoll";

protokolle.forEach((protokoll, index) => {
    test('renders Protokoll component with test data', async () => {    
        // Mock the getAlleEintraege function to return the test data
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(eintraege)
            } as Response)
        );
    
        // Provide a mock function for setSelectedProtokoll
        const setSelectedProtokollMock = jest.fn();
    
        render(<Protokoll protokoll={protokoll} setSelectedProtokoll={setSelectedProtokollMock} />);
    

        await waitFor(() => {
            expect(screen.getByText(`Trinkprotokoll für ${protokoll.patient}`)).toBeInTheDocument();
        }, { timeout: 1000 });

        await waitFor(() => {
            expect(screen.getByText(`Erstellt am ${protokoll.datum} von ${protokoll.erstellerName}`)).toBeInTheDocument();
        }, { timeout: 1000 });


        await waitFor(() => {
            expect(screen.getByText(`Bearbeitet am ${protokoll.updatedAt}`)).toBeInTheDocument();
        }, { timeout: 1000 });

        await waitFor(() => {
            expect(screen.getByText(`Gesamtmenge: ${protokoll.gesamtMenge} ml`)).toBeInTheDocument();
        }, { timeout: 1000 });

        await waitFor(() => {
            expect(screen.getByText(`Öffentliches Protokoll: ${JSON.stringify(protokoll.public)}`)).toBeInTheDocument();
        }, { timeout: 1000 });

        await waitFor(() => {
            expect(screen.getByText(`Geschlossenes Protokoll: ${JSON.stringify(protokoll.closed)}`)).toBeInTheDocument();
        }, { timeout: 1000 });

        // Wait for the LoadingIndicator to disappear
        await waitFor(() => {
            expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
        });
    
        // Check if each Eintrag is rendered
        eintraege.forEach((eintrag) => {
            const drinkElements = screen.getAllByText(eintrag.getraenk);
            drinkElements.forEach(element => expect(element).toBeInTheDocument());
        
            const amountElements = screen.getAllByText(`${eintrag.menge} ml`);
            amountElements.forEach(element => expect(element).toBeInTheDocument());
        
            const commentElements = screen.getAllByText(eintrag.kommentar || '');
            commentElements.forEach(element => expect(element).toBeInTheDocument());
        
            const createdAtElements = screen.getAllByText(eintrag.createdAt || '');
            createdAtElements.forEach(element => expect(element).toBeInTheDocument());
        
            const creatorElements = screen.getAllByText(eintrag.erstellerName || '');
            creatorElements.forEach(element => expect(element).toBeInTheDocument());
        });
    
        // Check if the fetch function was called
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    test('checks if non-existing text is not in document', () => {
        // Provide a mock function for setSelectedProtokoll
        const setSelectedProtokollMock = jest.fn();
        render(<Protokoll protokoll={protokoll} setSelectedProtokoll={setSelectedProtokollMock} />);
        expect(screen.queryByText('Text that should not be in the document')).not.toBeInTheDocument();
    });
});
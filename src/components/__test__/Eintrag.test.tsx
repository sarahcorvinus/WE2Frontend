import { render, screen } from "@testing-library/react";
import { Eintrag } from "../Eintrag";
import { eintraege } from "../../backend/testdata";

eintraege.forEach((eintrag, index) => {
    test(`renders Eintrag ${index} correctly`, () => {
        render(<Eintrag eintrag={eintrag} />);
    
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
    
    
    test('checks if non-existing text is not in document', () => {
        render(<Eintrag eintrag={eintrag} />);
        expect(screen.queryByText('Text that should not be in the document')).not.toBeInTheDocument();
    });
});
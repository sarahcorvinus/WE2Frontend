import { render, screen } from '@testing-library/react';
import { protokolle }  from '../../backend/testdata';
import { ProtokollDescription } from '../ProtokollDescription';

protokolle.forEach((protokoll) => {
    test('renders ProtokollDescription component with test data', () => {
        // Provide a mock function for setSelectedProtokoll
        const setSelectedProtokollMock = jest.fn();

        render(<ProtokollDescription protokoll={protokoll} setSelectedProtokoll={setSelectedProtokollMock} />);

        expect(screen.getByText(`Trinkprotokoll für ${protokoll.patient}`)).toBeInTheDocument();
        expect(screen.getByText(`Erstellt am ${protokoll.datum} von ${protokoll.erstellerName}`)).toBeInTheDocument();
        expect(screen.getByText(`Bearbeitet am ${protokoll.updatedAt}`)).toBeInTheDocument();
        expect(screen.getByText(`Gesamtmenge: ${protokoll.gesamtMenge} ml`)).toBeInTheDocument();
        expect(screen.getByText(`Öffentliches Protokoll: ${JSON.stringify(protokoll.public)}`)).toBeInTheDocument();
        expect(screen.getByText(`Geschlossenes Protokoll: ${JSON.stringify(protokoll.closed)}`)).toBeInTheDocument();
    });

    test('checks if non-existing text is not in document', () => {
        // Provide a mock function for setSelectedProtokoll
        const setSelectedProtokollMock = jest.fn();

        render(<ProtokollDescription protokoll={protokoll} setSelectedProtokoll={setSelectedProtokollMock} />);
        expect(screen.queryByText('Text that should not be in the document')).not.toBeInTheDocument();
    });
});
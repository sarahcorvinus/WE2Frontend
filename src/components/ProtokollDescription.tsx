import { Container } from "react-bootstrap";
import { ProtokollResource } from "../Resources";
export function ProtokollDescription({ protokoll }: { protokoll: ProtokollResource }) {
    return (
        <Container>
        <div className="mt-4">
          <h2>Trinkprotokoll für {protokoll.patient}</h2>
          <p>Erstellt am {protokoll.datum} von {protokoll.erstellerName}</p>
          <p>Bearbeitet am {protokoll.updatedAt}</p>
          <p>Gesamtmenge: {protokoll.gesamtMenge} ml</p>
          <p>Öffentliches Protokoll: {JSON.stringify(protokoll.public)}</p>
          <p>Geschlossenes Protokoll: {JSON.stringify(protokoll.closed)}</p>
        </div>
      </Container>
    );
}
import { ProtokollResource } from "../Resources";

export function ProtokollDescription({ protokoll, setSelectedProtokoll }
    : { protokoll: ProtokollResource, setSelectedProtokoll: (prot: ProtokollResource | null) => void }) {

    return (<div>
        <h2>Trinkprotokoll für {protokoll.patient}</h2>
        <p>Erstellt am {protokoll.datum} von {protokoll.erstellerName}</p>
        <p>Bearbeitet am {protokoll.updatedAt}</p>
        <p>Gesamtmenge: {protokoll.gesamtMenge} ml</p>
        <p>Öffentliches Protokoll: {JSON.stringify(protokoll.public)}</p>
        <p>Geschlossenes Protokoll: {JSON.stringify(protokoll.closed)}</p>
        <button onClick={() => setSelectedProtokoll(protokoll)}>
            Protokoll auswählen
        </button>
    </div>
    );
}
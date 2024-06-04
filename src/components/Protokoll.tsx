import { useEffect, useState } from "react";
import { EintragResource, ProtokollResource } from "../Resources";
import { Eintrag } from "./Eintrag";
import { getAlleEintraege } from "../backend/api";
import LoadingIndicator from "./LoadingIndicator";

export function Protokoll({protokoll, setSelectedProtokoll} : { protokoll: ProtokollResource, setSelectedProtokoll : (prot : ProtokollResource | null) => void }) {    
    const [eintraege, setEintraege] = useState<EintragResource[]>([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAlleEintraege(String(protokoll.id));
                setEintraege(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [protokoll]);

    if (loading) {
        return <LoadingIndicator />;
    }
    
    return (
        <div>
            <button onClick={() => setSelectedProtokoll(null)}>
                Zurück zur Liste
            </button>
            <h2>Trinkprotokoll für {protokoll.patient}</h2>
            <p>Erstellt am {protokoll.datum} von {protokoll.erstellerName}</p>
            <p>Bearbeitet am {protokoll.updatedAt}</p>
            <hr></hr>
            <p>Gesamtmenge: {protokoll.gesamtMenge} ml</p>
            <p>Öffentliches Protokoll: {JSON.stringify(protokoll.public)}</p>
            <p>Geschlossenes Protokoll: {JSON.stringify(protokoll.closed)}</p>
            <h3>Einträge</h3>
            {eintraege.map((eintrag) => (
                <Eintrag key={eintrag.id} eintrag={eintrag}></Eintrag>
            ))}
        </div>
    )
}
import { useEffect, useState } from "react";
import { getAlleProtokolle } from "../backend/api";
import LoadingIndicator from "./LoadingIndicator";
import { ProtokollDescription } from "./ProtokollDescription";
import { ProtokollResource } from "../Resources";

export function AlleProtokolle({protokoll, setSelectedProtokoll} : { protokoll: ProtokollResource | null, setSelectedProtokoll : (prot : ProtokollResource | null) => void }) {
    const [protokolle, setProtokolle] = useState<ProtokollResource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAlleProtokolle();
                setProtokolle(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <div>
            <h2>Alle Protokolle</h2>
            {protokolle.map(protokoll => (
                <div key={protokoll.id}>
                    <ProtokollDescription protokoll={protokoll} setSelectedProtokoll={setSelectedProtokoll}/>
                </div>
            ))}
        </div>
    );
};
import { useEffect, useState } from "react";
import { EintragResource, ProtokollResource } from "../Resources";
import { LoadingIndicator } from "./LoadingIndicator";
import { useParams } from "react-router-dom";
import { Eintrag } from "./Eintrag";
import { getAlleEintraege, getProtokoll } from "../backend/api";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function PageProtokoll() {
    const params = useParams();
    const protokollId = params.protokollId;

    const [protokoll, setProtokoll] = useState<ProtokollResource | null>(null);
    const [eintraege, setEintraege] = useState<EintragResource[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const protokollData = await getProtokoll(String(protokollId));
                setProtokoll(protokollData);

                const eintraegeData = await getAlleEintraege(String(protokollId));
                setEintraege(eintraegeData);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [protokollId]);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Container>
                <h2 className="mt-4">Trinkprotokoll für {protokoll?.patient}</h2>
                <p>Erstellt am {protokoll?.datum} von {protokoll?.erstellerName}</p>
                <p>Bearbeitet am {protokoll?.updatedAt}</p>
                <hr></hr>
                <p>Gesamtmenge: {protokoll?.gesamtMenge} ml</p>
                <p>Öffentliches Protokoll: {JSON.stringify(protokoll?.public)}</p>
                <p>Geschlossenes Protokoll: {JSON.stringify(protokoll?.closed)}</p>
                <h3>Einträge</h3>
                <Row>
                    {eintraege.map((eintrag) => (
                        <Col key={eintrag.id} md={4} className="mb-4">
                            <Card className="card bg-light mb-3">
                                <Card.Body>
                                    <Eintrag eintrag={eintrag} />
                                    <LinkContainer to={`/eintrag/${eintrag.id}`}>
                                        <Button variant="primary">Eintrag anzeigen</Button>
                                    </LinkContainer>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <LinkContainer to={`/`}>
                    <Button variant="secondary">Zurück zur Übersicht</Button>
                </LinkContainer>
            </Container>
        </ErrorBoundary>
    )
}
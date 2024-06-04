import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EintragResource } from "../Resources";
import { LoadingIndicator } from "./LoadingIndicator";
import { getEintrag } from "../backend/api";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./ErrorFallback";
import { Button, Container, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function PageEintrag() {
    const { eintragId } = useParams();
    const [eintrag, setEintrag] = useState<EintragResource | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const eintragData = await getEintrag(String(eintragId));
                setEintrag(eintragData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [eintragId]);

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Container>
                <div className="mt-4">
                    <h2>Eintragverwaltung</h2>
                    <Table className="table table-hover">
                        <tbody>
                            <tr className="table-primary">
                                <th>Getränk</th>
                                <td>{eintrag?.getraenk}</td>
                            </tr>
                            <tr className="table-primary">
                                <th>Menge</th>
                                <td>{eintrag?.menge} ml</td>
                            </tr>
                            <tr>
                                <th>Kommentar</th>
                                <td>{eintrag?.kommentar}</td>
                            </tr>
                            <tr>
                                <th>Erstellt am</th>
                                <td>{eintrag?.createdAt}</td>
                            </tr>
                            <tr>
                                <th>Erstellt von</th>
                                <td>{eintrag?.erstellerName}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <LinkContainer to={`/`}>
                    <Button variant="secondary">Zurück zur Übersicht</Button>
                </LinkContainer>
            </Container>
        </ErrorBoundary>
    );
}
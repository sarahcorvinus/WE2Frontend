import { useEffect, useState } from "react";
import { getAlleProtokolle } from "../backend/api";
import { ProtokollResource } from "../Resources";
import { LoadingIndicator } from "./LoadingIndicator";
import { ProtokollDescription } from "./ProtokollDescription";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function PageIndex() {
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
        <Container>
        <h2 className="mt-4 mb-4">Protokollübersicht</h2>
        <Row>
          {protokolle.map((protokoll) => (
            <Col key={protokoll.id} md={4} className="mb-4">
              <Card className="card bg-light mb-3">
                <Card.Body>
                  <ProtokollDescription protokoll={protokoll} />
                  <LinkContainer to={`/protokoll/${protokoll.id}`}>
                    <Button variant="primary">Protokoll anzeigen</Button>
                  </LinkContainer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    )
}
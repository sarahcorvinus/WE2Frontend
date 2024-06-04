// import './App.css';
import { useState } from 'react';
import { ProtokollResource } from './Resources';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './components/ErrorFallback';
import { AlleProtokolle } from './components/AlleProtokolle';
import { Protokoll } from './components/Protokoll';

function App() {
  const [selectedProtokoll, setSelectedProtokoll] = useState<ProtokollResource | null>(null);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <h1>Trinkprotokolle</h1>
      {selectedProtokoll ? (
        <Protokoll protokoll={selectedProtokoll} setSelectedProtokoll={setSelectedProtokoll} />
      ) : (
        <AlleProtokolle protokoll={null} setSelectedProtokoll={setSelectedProtokoll} />
      )}
    </ErrorBoundary>
  );

}

export default App;

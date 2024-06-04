// import './App.css';

import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback";
import { Route, Routes } from "react-router-dom";
import { PageIndex } from "./components/PageIndex";
import { PageProtokoll } from "./components/PageProtokoll";
import { PageEintrag } from "./components/PageEintrag";
import { PageAdmin } from "./components/PageAdmin";
import { PagePrefs } from "./components/PagePrefs";

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
    <Routes>
      <Route path="*" element={<PageIndex />} />
      <Route path="/" element={<PageIndex />} />
      <Route path="/protokoll/:protokollId" element={<PageProtokoll/>} />
      <Route path="/eintrag/:eintragId" element={<PageEintrag/>} />
      <Route path="/admin" element={<PageAdmin />} />
      <Route path="/prefs" element={<PagePrefs />} />
    </Routes>
    </ErrorBoundary>
  );
}

export default App;

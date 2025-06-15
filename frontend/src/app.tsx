import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import StartPage from "./pages/StartPage";
import CallbackPage from "./pages/CallbackPage";

import { ApiProvider } from "./providers/api_provider";
import TanStackQueryProvider from "./providers/query_provider";

function App() {
  return (
    <TanStackQueryProvider>
      <ApiProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/start" element={<StartPage />} />
            <Route path="/auth/sso/callback" element={<CallbackPage />} />
          </Routes>
        </Router>
      </ApiProvider>
    </TanStackQueryProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);

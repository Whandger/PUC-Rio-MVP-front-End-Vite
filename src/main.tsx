import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { TrainingProvider } from "./context/TrainingContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <AuthProvider>
      <TrainingProvider>
        <App />
      </TrainingProvider>
    </AuthProvider>
  </HashRouter>,
);

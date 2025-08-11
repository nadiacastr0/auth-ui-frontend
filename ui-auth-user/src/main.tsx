import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import React from "react";
import { AuthProvider } from "./context/auth/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <React.StrictMode>
      <AuthProvider>
        <App />
      </AuthProvider>
    </React.StrictMode>
  </StrictMode>
);

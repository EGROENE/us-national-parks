import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MainContentContextProvider } from "./Contexts/mainContentContext.tsx";

// Wrap App in any providers
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainContentContextProvider>
      <App />
    </MainContentContextProvider>
  </React.StrictMode>
);

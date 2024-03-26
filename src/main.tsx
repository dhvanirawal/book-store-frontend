import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider
      theme={{
        fontFamily: "M PLUS Code Latin, sans-serif",
        fontFamilyMonospace: "Monaco, Courier, monospace",
        headings: { fontFamily: "M PLUS Code Latin, sans-serif" },
      }}
    >
      <Notifications position="top-right" zIndex={9999} />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>
);

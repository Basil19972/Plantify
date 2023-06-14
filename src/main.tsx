// Importing required dependencies and styles
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { NotificationsProvider } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";

// Rendering the application root component
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // Wrapping the application with necessary providers and strict mode
  <React.StrictMode>
    <MantineProvider>
      <ModalsProvider>
        <BrowserRouter>
          <NotificationsProvider position="top-right">
            <App />
          </NotificationsProvider>
        </BrowserRouter>
      </ModalsProvider>
    </MantineProvider>
  </React.StrictMode>
);

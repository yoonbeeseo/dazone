import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./contextApi/provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>
);

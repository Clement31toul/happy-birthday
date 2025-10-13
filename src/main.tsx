import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import AssetLoader from "@/game/AssetLoader";

createRoot(document.getElementById("root")!).render(
  <AssetLoader>
    <App />
  </AssetLoader>
);

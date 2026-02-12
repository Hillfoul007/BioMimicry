import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleBiomimicryAnalysis,
  handleOrganismSearch,
  handleGetOrganisms,
  handleGetOrganism,
} from "./routes/biomimicry";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Biomimicry Architect API routes
  app.post("/api/biomimicry/analyze", handleBiomimicryAnalysis);
  app.get("/api/organisms/search", handleOrganismSearch);
  app.get("/api/organisms", handleGetOrganisms);
  app.get("/api/organisms/:id", handleGetOrganism);

  return app;
}

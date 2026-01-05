import express from "express";
import cors from "cors";
import { mainRoute } from "./routes/main.route";
import { startStoreStatusJob } from "./utils/store-status.job";

export const app = express();

app.use(cors());
app.use(express.json()); // 🚨 OBRIGATÓRIO
app.use(express.urlencoded({ extended: true }));
app.use(mainRoute);
startStoreStatusJob();


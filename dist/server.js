"use strict";
// import express from "express";
// import cors from "cors";
// import { mainRoute } from "./routes/main.route";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// const server = express();
// server.use(cors());
// server.use(express.json());
// server.use(express.urlencoded({ extended: true }));
// server.use(mainRoute);
// const port = process.env.PORT || 5000;
// server.listen(port, () => {
//   console.log(`BACKEND INICIALIZADO EM http://localhost:${port}`);
// });
// export {server}import { app } from "./app";
const port = process.env.PORT || 8080;
app_1.app.listen(port, () => {
    console.log(`BACKEND INICIALIZADO EM http://localhost:${port}`);
});

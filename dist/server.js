"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const main_route_1 = require("./routes/main.route");
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
console.log("SERVER FILE EXECUTED");
server.use(main_route_1.mainRoute);
const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`BACKEND INICIALIZADO EM http://localhost:${port}`);
});

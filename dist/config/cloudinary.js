"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cloudinary_1 = require("cloudinary");
; // garante que .env é carregado ANTES de configurar
cloudinary_1.v2.config({
    cloud_url: process.env.CLOUDINARY_URL,
});
exports.default = cloudinary_1.v2;

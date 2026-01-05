"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocodeAddress = geocodeAddress;
const axios_1 = __importDefault(require("axios"));
const error_1 = require("../shared/err/error");
async function geocodeAddress(address) {
    try {
        const response = await axios_1.default.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: address,
                format: "json",
                limit: 1,
                countrycodes: "br",
            },
            headers: {
                "User-Agent": "hoodFood/1.0 (admin@hoodfood.com)", // 🔥 OBRIGATÓRIO
            },
        });
        if (!response.data || response.data.length === 0) {
            throw new error_1.AppError("Erro ao localizar endereço. Tente ser mais específico.", 400);
        }
        return {
            lat: Number(response.data[0].lat),
            lng: Number(response.data[0].lon),
        };
    }
    catch (err) {
        throw new error_1.AppError("Erro ao localizar endereço", 400);
    }
}

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const { combine, timestamp, errors, json, printf, colorize } = winston_1.format;
// formatação legível para development
const devFormat = combine(colorize(), timestamp(), errors({ stack: true }), printf(({ timestamp, level, message, stack, ...meta }) => {
    const base = `[${timestamp}] ${level}: ${message}`;
    const metaStr = Object.keys(meta).length ? `${JSON.stringify(meta)}` : "";
    return stack ? `${base}\n${stack}${metaStr}` : `${base}${metaStr}`;
}));
// formatação JSON para produção (mais fácil de indexar)
const prodFormat = combine(timestamp(), errors({ stack: true }), json());
//paths para logs
const logDir = path_1.default.resolve(process.cwd(), "logs");
const errorLogFile = path_1.default.join(logDir, "error-%DATE%.log");
const allLogFile = path_1.default.join(logDir, "app-%DATE%.log");
const dailyRotateTransport = new winston_daily_rotate_file_1.default({
    filename: "app-%DATE%.log",
    dirname: logDir,
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "14d", //manter 14dias
});
//loger principal;
exports.logger = (0, winston_1.createLogger)({
    level: process.env.LOG_LEVEL || "info",
    format: process.env.NODE_ENV === "production" ? prodFormat : devFormat,
    transports: [
        new winston_1.transports.Console({
            stderrLevels: ["error"],
        }),
        //arquivos rotativos diarios
        dailyRotateTransport,
        //arquivo somene para erros(manterHistorico separado)
        new winston_1.transports.File({
            filename: path_1.default.join(logDir, "error.log"),
            level: "error",
            handleExceptions: true,
            maxsize: 5 * 1024 * 1024, //5MB
            maxFiles: 5,
        }),
    ],
    exitOnError: false,
});

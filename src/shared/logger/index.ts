import path from "path";
import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, errors, json, printf, colorize } = format;

// formatação legível para development
const devFormat = combine(
  colorize(),
  timestamp(),
  errors({ stack: true }),
  printf(({ timestamp, level, message, stack, ...meta }) => {
    const base = `[${timestamp}] ${level}: ${message}`;
    const metaStr = Object.keys(meta).length ? `${JSON.stringify(meta)}` : "";
    return stack ? `${base}\n${stack}${metaStr}` : `${base}${metaStr}`;
  })
);

// formatação JSON para produção (mais fácil de indexar)

const prodFormat = combine(timestamp(), errors({ stack: true }), json());

//paths para logs
const logDir = path.resolve(process.cwd(), "logs");
const errorLogFile = path.join(logDir, "error-%DATE%.log");
const allLogFile = path.join(logDir, "app-%DATE%.log");

const dailyRotateTransport = new DailyRotateFile({
  filename: "app-%DATE%.log",
  dirname: logDir,
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "20m",
  maxFiles: "14d", //manter 14dias
});

//loger principal;
export const logger = createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: process.env.NODE_ENV === "production" ? prodFormat : devFormat,
  transports: [
    new transports.Console({
      stderrLevels: ["error"],
    }),

    //arquivos rotativos diarios
    dailyRotateTransport,

    //arquivo somene para erros(manterHistorico separado)
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      handleExceptions: true,
      maxsize: 5 * 1024 * 1024, //5MB
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

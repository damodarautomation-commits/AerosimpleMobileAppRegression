
import winston from 'winston';
import fs from 'fs';
import path from 'path';

const logDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(
            info => `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`
        )
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: path.join(logDir, 'execution.log')
        })
    ]
});

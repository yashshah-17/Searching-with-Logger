const winston = require('winston');

const {colorize, combine, timestamp, printf} = winston.format
let logFormat = printf(info => `${info.timestamp}: ${info.level} : ${info.message}`);

const logger = winston.createLogger({
    level: 'info',
    format: combine(timestamp(),colorize(),logFormat),
    transports: [
        new winston.transports.File({ filename: 'log.log' }),
        new winston.transports.Console({
            level:'debug'
        }),
    ]
});

module.exports = logger;
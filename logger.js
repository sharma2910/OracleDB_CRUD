const winston = require('winston')

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.align(),
        winston.format.printf((info) => {
          const {
            timestamp, level, message
          } = info
          return `${timestamp} ${level}: ${message}`
        })
      )
    }),
    new winston.transports.File({
      filename: 'error_log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => {
          const {
            timestamp, level, message
          } = info
          return `${timestamp} ${level} ${message}`
        })
      )
    }),
    new winston.transports.File({
      filename: 'info_log',
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize({ all: true }),
        winston.format.printf((info) => {
          const {
            timestamp, level, message
          } = info
          return `${timestamp} ${level} ${message}`
        })
      )
    })
  ]
})

module.exports = logger

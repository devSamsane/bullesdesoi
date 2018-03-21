import { Properties } from "../../interfaces/properties.interface";

export const DEVELOPMENT_PROPERTIES: Properties = {
  app: {
    title: 'Bulles de Soi',
    description: 'Site web de sophrologie et prise de rendez-vous en ligne',
    keywords: 'sophrologie, relaxation, gestion du stress, périnatalité, enfance, adolescence, senior, sommeil, troubles, maladie',
    version: '0.0.0'
  },
  server: {
    livereload: true,
    port: 3000,
    host: '127.0.0.1',
    domain: 'localhost',
    secure: {
      active: true,
      ssl: false,
      privateKey: '../sslcerts/key.pem',
      publicKey: '../sslcerts/cert.pem',
      caBundle: ''
    }
  },
  config: {
    db: {
      promise: global.Promise,
      uri: 'mongodb://localhost:27017/bullesdesoi-dev',
      options: {
        ssl: false,
        appname: 'bullesdesoi',
        autoReconnect: true
      }
    },
    helmet: {
      hsts: {
        expiration: 15778476000,
        includeSubdomains: true,
        force: true
      }
    },
    log: {
      fileLogger: {
        directoryPath: process.cwd(),
        filename: 'app-log.json',
        maxFiles: 2,
        maxsize: 10485760,
        json: true
      }
    }
  }
}

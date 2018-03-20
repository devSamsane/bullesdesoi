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
    domain: 'localhost'
  },
  config: {
    db: {
      promise: global.Promise,
      uri: 'http://localhost:27001/bullesdesoi'
    }
  }
}
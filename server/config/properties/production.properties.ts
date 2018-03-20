import { Properties } from "../../interfaces/properties.interface";

export const PRODUCTION_PROPERTIES: Properties = {
   app: {
    title: 'Bulles de Soi',
    description: 'Site web de sophrologie et prise de rendez-vous en ligne',
    keywords: 'sophrologie, relaxation, gestion du stress, périnatalité, enfance, adolescence, senior, sommeil, troubles, maladie',
    version: '0.0.0'
  },
  server: {
    livereload: false,
    port: Number(process.env.PORT),
    host: process.env.HOST,
    domain: process.env.DOMAIN
  },
  config: {
    db: {
      promise: global.Promise,
      uri: process.env.MONGODB_URI
    }
  }
}

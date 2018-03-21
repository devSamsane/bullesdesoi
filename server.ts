import * as chalk from 'chalk';
import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';

import { properties } from './server/config/index';
import { App } from './server/lib/app';

// Déclaration des variables
const port: number = properties.server.port;
const host: string = properties.server.host;
const secure: boolean = properties.server.secure.active;
let server;

const app = App.bootstrap().app;

if (secure) {
  server = https.createServer({
    key: fs.readFileSync('./server/config/sslcerts/key.pem'),
    cert: fs.readFileSync('./server/config/sslcerts/cert.pem')
  }, app);
  // Démarrage du server
  server.listen(port, host, () => {
    const serverType: string = `https://${host}:${port}`;

    console.log(chalk.white('----'));
    console.log(chalk.magenta(`Application:            ${properties.app.title}`));
    console.log(chalk.magenta(`Version:                ${properties.app.version}`));
    console.log();
    console.log(chalk.green(`Environnement:            ${process.env.NODE_ENV}`));
    console.log(chalk.green(`Serveur:                  ${serverType}`));
    console.log(chalk.green(`db:                       ${properties.config.db.uri}`));
    console.log(chalk.white('----'));
  });

} else {
  // Démarrage du server
  server = app.listen(port, host, () => {
    const serverType: string = `http://${host}:${port}`;

    console.log(chalk.white('----'));
    console.log(chalk.magenta(`Application:            ${properties.app.title}`));
    console.log(chalk.magenta(`Version:                ${properties.app.version}`));
    console.log();
    console.log(chalk.green(`Environnement:            ${process.env.NODE_ENV}`));
    console.log(chalk.green(`Serveur:                  ${serverType}`));
    console.log(chalk.green(`db:                       ${properties.config.db.uri}`));
    console.log(chalk.white('----'));
  });
}

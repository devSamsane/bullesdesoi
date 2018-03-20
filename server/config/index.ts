import * as _ from 'lodash';
import * as glob from 'glob';

import { Properties } from '../interfaces/properties.interface';
import { PRODUCTION_PROPERTIES } from './properties/production.properties';
import { DEVELOPMENT_PROPERTIES } from './properties/development.properties';
import { DEFAULT_PROPERTIES } from './properties/default.properties';
import { Assets } from '../interfaces/assets.interface';
import { DEFAULT_ASSETS } from './assets/default.assets';

class PropertiesConfiguration {
  private static env: string;
  private static propertiesEnv: Properties;

 /**
  * Renvoi des properties élargies des assets
  * @static
  * @returns {*} properties: Properties
  * @memberof PropertiesConfiguration
  */
 public static initGlobalProperties(): any {

    // Vérification du paramétrage de l'environnement
    new PropertiesConfiguration().validateEnvironnement();

    // Selection des properties DEFAULT & DEVELOPMENT ou PRODUCTION
    new PropertiesConfiguration().selectPropertiesEnv();

    // Merge des properties avec les properties par défaut
    // les properties par défaut sont écrasées par celles de l'environnement
    const properties: Properties = _.merge(DEFAULT_PROPERTIES, PropertiesConfiguration.propertiesEnv);

    // Récupération des assets
    const assets: Assets = DEFAULT_ASSETS;

    // Initialisation des assets
    new PropertiesConfiguration().initGlobalAssetsFile(properties, assets);

    return properties;
  }

  /**
   * Vérification du paramétrage de l'environnement
   * @private
   * @memberof PropertiesConfiguration
   */
  private validateEnvironnement(): void {
    if (!process.env.NODE_ENV) {
      console.warn(`Variable d'environnement non paramétrée`);
      console.warn(`Définition par défaut sur l'environnement de développement`);
      process.env.NODE_ENV = 'development';
    }

    // Déclaration de la variable env en fonction de NODE_ENV
    PropertiesConfiguration.env = process.env.NODE_ENV;
  }

  /**
   * Sélection des properties en fonction de l'environnement
   * @private
   * @returns {Properties}
   * @memberof PropertiesConfiguration
   */
  private selectPropertiesEnv(): Properties {
    switch (process.env.NODE_ENV) {
      case 'production':
        PropertiesConfiguration.propertiesEnv = PRODUCTION_PROPERTIES;
        break;
      case 'development':
        PropertiesConfiguration.propertiesEnv = DEVELOPMENT_PROPERTIES;
        break;
      default:
        PropertiesConfiguration.propertiesEnv = DEVELOPMENT_PROPERTIES;
        break;
    }

    return PropertiesConfiguration.propertiesEnv;
  }

  /**
   * Récupération des fichiers des assets
   * @private
   * @param {Properties} properties
   * @param {Assets} assets
   * @memberof PropertiesConfiguration
   */
  private initGlobalAssetsFile(properties: Properties, assets: Assets) {
    // Initialisation du noeud files/server des properties
    properties.files = {
      server: {}
    };

    // Récupération de la configuration Gulp
    properties.files.server.gulp = this.getGlobbedPaths(assets.gulpconfig);

    // Récupération de tous les fichiers ts du server
    properties.files.server.allTS = this.getGlobbedPaths(assets.allTS);
  }

  /**
   * Parcours des répertoires et récupération des fichiers correspondant
   * @private
   * @param {*} globPatterns
   * @param {*} [excludes]
   * @returns {string[]}
   * @memberof PropertiesConfiguration
   */
  private getGlobbedPaths(globPatterns: any, excludes?: any): string[] {
    // Définition du pattern de recherche
    const urlRegex: RegExp = new RegExp('^(?:[a-z]+:)?//', 'i');

    // Initialisation de la variable de retour
    let output: string[] = [];

    // Récupération des fichiers
    if (_.isArray(globPatterns)) {
      globPatterns.forEach(globPattern => {
        output = _.union(output, this.getGlobbedPaths(globPattern, excludes));
      });
    } else if (_.isString(globPatterns)) {
      if (urlRegex.test(globPatterns)) {
        output.push(globPatterns);
      } else {
        let files: any[] = glob.sync(globPatterns);
        if (excludes) {
          files = files.map(file => {
            if (_.isArray(excludes)) {
              let i: string;
              for (i in excludes) {
                if (excludes.hasOwnProperty(i)) {
                  file = file.replace(excludes[i], '');
                }
              }
            } else {
              file = file.replace(excludes, '');
            }
            return file;
          });
        }
        output = _.union(output, files);
      }
    }

    return output;
  }

}

export const properties: Properties = PropertiesConfiguration.initGlobalProperties();

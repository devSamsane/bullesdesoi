export interface Properties {
  app: ApplicationProperties;
  server: ServerProperties;
  config: ConfigProperties;
  files?: any;
  env?: string;
}

export interface ApplicationProperties {
  title: string;
  description: string;
  keywords: string;
  version: string;
  logo?: string;
  favicon?: string;
  googleAnalyticsTrackingID?: string;
}

export interface ServerProperties {
  port: number;
  host: string;
  domain: string;
  livereload: boolean;
  secure?: SecureProperties;
}

export interface SecureProperties {
  active: boolean;
  ssl: boolean;
  privateKey: string;
  publicKey: string;
  caBundle: string;
}

export interface ConfigProperties {
  helmet?: HelmetConfigProperties;
  log?: LogConfigProperties;
  db: DBConfigProperties;
}

export interface HelmetConfigProperties {
  hsts?: HSTSHelmetConfigProperties;
}

export interface HSTSHelmetConfigProperties {
  expiration: number;
  includeSubdomains: boolean;
  force: string;
}

export interface LogConfigProperties {
  fileLogger: FileLoggerLogConfigProperties;
  format?: string;
}

export interface FileLoggerLogConfigProperties {
  directoryPath: string;
  filename: string;
  maxsize: number;
  maxFiles: number;
  json: boolean;
}

export interface DBConfigProperties {
  promise: Function | string;
  uri: string;
  debug?: boolean;
  options?: OptionsDBConfigProperties;
}

export interface OptionsDBConfigProperties {
  ssl: boolean;
  sslValidate: boolean;
  checkServerIdentity: boolean;
  sslCA: string;
  privateKey: string;
  publicKey: string;
  sslPassphrase: string;
}
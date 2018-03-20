import { Assets } from '../../interfaces/assets.interface';
export const DEFAULT_ASSETS: Assets = {
  gulpconfig: ['gulpfile.ts'],
  allTS: ['server.ts', '/server/config/**/*.ts', '/server/interfaces/*.ts', '/server/lib/**/*.ts', '/server/modules/**/*.ts']
}
const gulp = require('gulp');
const del = require('del');
const runSequence = require('run-sequence');
const sourceMaps = require('source-map');
const tsc = require('gulp-typescript');

import { properties } from './server/config/index';

/**
 * Suppression du repertoire dist
 */
gulp.task('clean', (done: any) => {
  return del(['dist'], done);
});

/**
 * Copie du script de démarrage du server
 */
gulp.task('copy', () => {
  return gulp.src('./server.ts')
  .pipe(gulp.dest('dist/bin'));
});

/**
 * Build du server
 */
gulp.task('build:express', () => {
  const project = tsc.createProject('server/tsconfig.json');
  const result = gulp.src(properties.files.server.allTS)
    .pipe(sourceMaps.init())
    .pipe(project())
    return result.js
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('dist/server'));
});

/**
 * Build du projet
 */
gulp.task('default', (done: any) => {
  runSequence('clean', 'copy', 'build:express');
});

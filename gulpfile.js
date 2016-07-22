'use strict';

var gulp = require('gulp'),
  rollup = require('rollup'),
  buble = require('rollup-plugin-buble'),
  nodeResolve = require('rollup-plugin-node-resolve'),
  commonjs = require('rollup-plugin-commonjs'),
  browserSync = require('browser-sync').create();

gulp.task('build', function() {
  rollup.rollup({
    entry: 'test.js',
    plugins: [
      nodeResolve({
        main: true
      }),
      commonjs(),
      buble()
    ]
  }).then(function(bundle) {
    bundle.write({
      format: 'umd',
      moduleName: 'test',
      dest: './dist/test.umd.js'
    });
  }).catch(function(err) {
    console.log('rollup err: ' + err);
  });
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: ['.'],
            directory: true
        }
    });
});

gulp.task('default', ['build', 'browser-sync']);

/*
#
 * Starts here
 * @desc : All tasks
 * @author: Nilaf Talapady
 * @company: Moonraft Innovation Pvt Ltd
#
 */

const path = require( 'path' );
const conf = require( './config' );
const del = require('del');


//(function() {
  var copy, globals, gulp, gulpGrunt, preprocessor, runSequence, server;

  gulp = require('gulp');

  copy = require('gulp-copy');

  globals = require('./globals.js');

  preprocessor = require('./preprocess.js');

  gulpGrunt = require('./grunt.js');

  server = require('./server.js');

  runSequence = require('run-sequence');

  gulp.task('clean', function(cb) {
    return del(conf.paths.build);
  });

  /*gulp.task('serve', function() {
    return runSequence('clean', ['markups', 'scripts', 'styles', 'CopyAssets', 'CopyBower'], function() {
      return runSequence('browserSync');
    });
  });*/

  /*gulp.task( 'serve:dev', [ 'watch'], function() {
    return runSequence('browserSync');
  });*/

  gulp.task( 'serve:dev', [ 'copy' ], function() {
    return runSequence('browserSync');
  });

  /*gulp.task( 'serve', [ 'clean' ], function() {
    gulp.start( 'serve:dev' );
  } );*/

  gulp.task( 'serve:inject', [ 'inject' ], function() {
    gulp.start( 'serve:dev' );
  });
  
  gulp.task( 'serve', [ 'clean' ], function() {
    gulp.start( 'serve:inject' );
  } );

  /*gulp.task( 'serve:dev', [ 'copy'], function() {
    return runSequence('browserSync');
  });

  
  gulp.task( 'serve', [ 'clean' ], function() {
    gulp.start( 'serve:dev' );
  } );*/



  /*gulp.task('copy', ['markups', 'scripts', 'styles'], function() {
    gulp.start( 'CopyAssets' );
    gulp.start( 'CopyBower' );
  });*/

  gulp.task('copy', ['markups', 'scripts', 'styles'], function() {
    gulp.start( 'CopyAssets' );
    gulp.start( 'CopyBower' );
  });

  gulp.task('basic', function(callback) {
    return runSequence(['markups', 'scripts', 'styles', 'CopyAssets', 'CopyBower'], callback);
  });

  gulp.task('release', [], function(cb) {
    conf.DEST_FOLDER = CONFIG.RELEASE_FOLDER;
    return runSequence('basic', 'browserSync');
  });

//}).call(this);
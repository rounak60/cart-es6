/*
#
 * Analyse
 * @desc : code,project analysers  
 * @author: Nilaf Talapady
 * @company: Moonraft Innovation Pvt Ltd
#
 */

//(function() {
  var config, stylestats;
  var gulp = require( 'gulp' );

  config = require('./config.js');

  stylestats = require('gulp-stylestats');

  gulp.task("cssAnalyse", function() {
    gulp.src(config.SOURCE_FOLDER + "/styles/*.css").pipe(stylestats());
  });

//}).call(this);
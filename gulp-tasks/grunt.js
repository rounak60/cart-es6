/*
#
 * GRUNT
 * @desc : Run grunt tasks from gulp
 * @authors: Nilaf Talapady, Sunil Fernandes
 * @company: Moonraft Innovation Pvt Ltd
#
 */

//(function() {
  var config, gulp_grunt, tasks;

  config = require('./config.js');

  gulp_grunt = require('gulp-grunt');

  tasks = gulp_grunt.tasks({
    base: null,
    prefix: 'grunt-'
  });

//}).call(this);
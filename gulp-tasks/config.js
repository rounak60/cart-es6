/*
#
 * CONFIGURATION
 * @desc : config
 * @author: Nilaf Talapady
 * @company: Moonraft Innovation Pvt Ltd
#
 */



/**
 *  This file contains the variables used in other gulp files
 *  which defines tasks
 *  By design, we only put there very generic config values
 *  which are used in several places to keep good readability
 *  of the tasks
 */

var gutil = require('gulp-util');

/**
 *  The main paths of your project handle these with care
 */
/*exports.paths = {
  src: './src',
  dist: 'dist',
  build: './build'
};*/






//(function() {
  //var CONFIG;

  var config = {};

  config.paths = {
    'src': './src',
    'dist': 'dist',
    'build': './build'
  };

  config.DEST_FOLDER = "./build";

  config.SOURCE_FOLDER = "./src";

  config.RELEASE_FOLDER = "./release";

  config.autoprefixerSupport = {
    browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12.1', 'ie 9']
  };

  config.jadeData = {
    'name': 'Grant Elliot'
  };

  module.exports = config;

//}).call(this);
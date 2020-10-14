/*
#
 * SERVER
 * @desc : run a server
 * @author: Nilaf Talapady
 * @company: Moonraft Innovation Pvt Ltd
#
 */

//(function() {
var config;

config = require( './config.js' );
var gulp = require( 'gulp' );

gulp.task( "browserSync", function() {
    browserSync( {
        server: {
            baseDir: config.DEST_FOLDER,
            //index: "markup/index.html"
            //index: "markup/pages/landing/landing.html"
            index: "index.html"
        },
        browser: "chrome"
    } );
} );

//}).call(this);
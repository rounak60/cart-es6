//require('coffee-script/register');

/*base file with handpicked tasks*/
//require('./gulp-tasks/bootstrap.coffee');

'use strict';

var gulp = require( 'gulp' );
var wrench = require( 'wrench' );
// var yml = require('gulp-yml');

/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive( './gulp-tasks' ).filter( function( file ) {
    return ( /\.(js|coffee)$/i ).test( file );
} ).map( function( file ) {
    require( './gulp-tasks/' + file );
} );

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task( 'default', [ 'clean' ], function() {
    gulp.start( 'serve' );

});
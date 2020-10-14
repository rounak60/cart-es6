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


// gulp.task('data', function () {
//     return gulp.src('src/data/**/*')
//         .pipe(yml().on('error', gutil.log))
//         .pipe(gulp.dest(config.dest + '/data'));
// });
// gulp.watch('src/**/*.{html,md,json,yml}', ['assemble', 'data']).on('change', reload);

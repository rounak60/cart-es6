

const path = require( 'path' );
const browserSync  = require('browser-sync');
const sourcemaps   = require('gulp-sourcemaps');
const conf = require( './config' );

// gulp.task('watch', ['inject', 'copy'], function () {
//     console.log('----------In watch Main----------------------');
//     gulp.watch(path.join( conf.paths.src, '/app/**/*.js' ), ['scripts']);
//     gulp.watch(path.join( conf.paths.src, '/app/**/*.less' ), ['styles']);
//     gulp.watch(path.join( conf.paths.src, '/app/**/*.pug' ), ['markups']);
//     //const srcFolder = [`${CONFIG.SOURCE_FOLDER}/app/**/*.pug`];
//     //gulp.watch( srcFolder, function( event ) {
//         console.log('--------------------Watching------------------------');
//         /*if ( isOnlyChange( event ) ) {
//             gulp.start( 'scripts-reload' );
//         } else {
//             gulp.start( 'inject-reload' );
//         }*/
//     //} );
// });

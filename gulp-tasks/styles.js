const browserSync = require( 'browser-sync' );
const cssbeautify = require( 'gulp-cssbeautify' )
const less = require( 'gulp-less' )
const postcss = require( 'gulp-postcss' );
const px2rem = require( 'gulp-pixrem' );
const autoprefixer = require( 'autoprefixer-core' );
const path = require( 'path' );
const conf = require( './config' );



gulp.task( "styles", function() {
    //const srcFolder = path.join( conf.paths.src, '/**/app.less' );
    //const srcFolder = path.join( conf.paths.src, '/styles/*.less' );
    const srcFolder = path.join( conf.paths.src, '/**/*.less' );

    watch( srcFolder, {
        ignoreInitial: false
    }, batch( ( events, done ) =>
        gulp.src( [ srcFolder ] )
        //return gulp.src([srcFolder])
        .pipe( less() )
        .pipe( filter( '**/*.css' ) ) // Filtering stream to only css files
        .pipe( px2rem() )
        .pipe( postcss( [ autoprefixer( CONFIG.autoprefixerSupport ) ] ) )
        .pipe( cssbeautify( {
            indent: '    ' // number of spaces for indenting
        } ) )
        .pipe( gulp.dest( conf.DEST_FOLDER ) )
        .pipe( browserSync.reload( {
            stream: true
        } ) )
    ) );
} );
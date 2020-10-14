const path = require( 'path' );
const conf = require( './config' );

const inject = require( 'gulp-inject' );

const bowerFiles = require( 'main-bower-files' );
//const stylus = require('gulp-stylus');
const es = require( 'event-stream' );





gulp.task( 'inject-scripts', function() {

    var injectOptions = {
        transform: function( filePath ) {
            filePath = filePath.replace( '/src/', '../../../' );
            return 'script(type="text/javascript" src="' + filePath + '")';
        }
    };

    var target = gulp.src( path.join( conf.paths.src, '/markup/includes/_script-sources.pug' ) );

    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src( './src/**/*.js', {
        read: false
    } );
    return target.pipe( inject( gulp.src( bowerFiles(), {
            read: false
        } ), {
            name: 'bower'
        } ) )
        .pipe( inject( es.merge(
            sources
        ), injectOptions ) )
        .pipe( gulp.dest( './src/markup/includes' ) );
} );


gulp.task( 'inject-less', function() {


    var injectFiles = gulp.src( [
        path.join( conf.paths.src, '/**/*.less' ),
        path.join( '!' + conf.paths.src, '/styles/app.less' )
    ], {
        read: false
    } );

    var injectOptions = {
        transform: function( filePath ) {
            //console.log('------------------------filePath-----------------');
            //console.log(filePath);
            //filePath = filePath.replace( '/src', '' );
            //filePath = filePath.replace( '.less', '.css' );
            //console.log('link(rel="stylesheet" type="text/css" href="'+filePath+'")');
            //return 'link(rel="stylesheet" type="text/css" href="'+filePath+'")';
            //filePath = filePath.replace( 'src', '');
            return '@import "' + filePath + '";';
        },
        starttag: '// injector',
        endtag: '// endinjector',
        addRootSlash: false
    };

    //var target = gulp.src(path.join(conf.paths.src, '/markup/includes/_style-sources.pug'));
    var target = gulp.src( path.join( conf.paths.src, '/styles/app.less' ) );


    // It's not necessary to read the files (will speed up things), we're only after their paths:
    //var sources = gulp.src('./src/**/*.less', {read: false});
    return target.pipe( inject(
            //sources, injectOptions))
            injectFiles, injectOptions ) )
        // .pipe(gulp.dest('./src/markup/includes'));
        .pipe( gulp.dest( './src/styles' ) );

} );


gulp.task( 'inject-app-less', function() {

    var injectOptions = {
        transform: function( filePath ) {
            console.log( '------------------------filePath-----------------' );
            console.log( filePath );
            filePath = filePath.replace( '/src/', '../../../' );
            filePath = filePath.replace( '.less', '.css' );
            console.log( 'link(rel="stylesheet" type="text/css" href="' + filePath + '")' );
            return 'link(rel="stylesheet" type="text/css" href="' + filePath + '")';
        }
    };

    var target = gulp.src( path.join( conf.paths.src, '/markup/includes/_style-sources.pug' ) );
    //var target = gulp.src(path.join( conf.paths.src, '/styles/app.less' ));


    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src( './src/**/*.less', {
        read: false
    } );
    // var sources = gulp.src( './src/styles/app.less', {
    //     read: false
    // } );
    return target.pipe( inject(
            sources, injectOptions ) )
        //injectFiles, injectOptions))
        .pipe( gulp.dest( './src/markup/includes' ) );
    //.pipe(gulp.dest('./src/styles'));

} );



gulp.task( 'inject', function() {
    gulp.start( 'inject-scripts' );
    //gulp.start('inject-less');
    gulp.start( 'inject-app-less' );
} );
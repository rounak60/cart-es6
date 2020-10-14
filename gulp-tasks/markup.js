const browserSync  = require('browser-sync');
const htmlbeautify = require('gulp-html-beautify')
const less         = require('gulp-less')
const pug          = require('pug');
const gulpPug      = require('gulp-pug');
const path = require( 'path' );
const conf = require( './config' );


// For jade compile
gulp.task("markups", function() {

    // Pass data to jade files (from a json)
    const data = conf.jadeData;

    const srcFolder = path.join( conf.paths.src, '/**/*.pug' );

    watch(srcFolder,{ignoreInitial: false},batch( (events, done)=>
        gulp.src(srcFolder)
        //return gulp.src(srcFolder)
            .pipe(filter(['**/*','!**/_*.pug']))
            .pipe(gulpPug({data:data,pug:pug,basedir:'/src/'}))
            .on('error', function(err){
                gutil.log(`Pug Error:${err.message}`);
                return notify().write(`Pug Error: ${err.message}`);
            })
            .pipe(htmlbeautify({
                indentSize:4
            }))
            //.pipe(gulp.dest(CONFIG.DEST_FOLDER))
            .pipe(gulp.dest(conf.DEST_FOLDER))
            .pipe(browserSync.reload({stream:true}))
    ));

});
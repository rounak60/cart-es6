

const path = require( 'path' );
const conf = require( './config' );
const browserSync  = require('browser-sync');
const sourcemaps   = require('gulp-sourcemaps');


gulp.task("scripts", function() {
    const srcFolder = path.join( conf.paths.src, '/**/*.js' );
    watch(srcFolder,{verbose:true,ignoreInitial: false},batch( (events, done)=>
        gulp.src(srcFolder)
        //return gulp.src(path.join( conf.paths.src, '/app/**/*.js' ))
            .pipe(sourcemaps.init())
            .on('error', function(err){
                    gutil.log(`JS Error: ${err.message}`);
                    notify().write(`JS Error: ${err.message}`);
                    done();
            })
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(conf.paths.build))
            .pipe(browserSync.reload({stream:true}))
    ));
});

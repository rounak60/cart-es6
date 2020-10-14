/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
/*
 *
 * Preprocessor
 * @desc : Compile stuff
 * @author: Nilaf Talapady
 * @company: Moonraft Innovation Pvt Ltd
 *
 */

const path = require( 'path' );
const conf = require( './config' );


const pug          = require('pug');
const gulpPug      = require('gulp-pug');
const typeset      = require('gulp-typeset');
const htmlbeautify = require('gulp-html-beautify')
const cssbeautify  = require('gulp-cssbeautify')

const less         = require('gulp-less')
const browserSync  = require('browser-sync');
const autoprefixer = require('autoprefixer-core');
const sourcemaps   = require('gulp-sourcemaps');
const postcss      = require('gulp-postcss');
const px2rem       = require('gulp-pixrem');
const react        = require('gulp-react');
const copy         = require('gulp-copy');

const usemin       = require("gulp-usemin");
const minifyCss    = require('gulp-minify-css');
const uglify       = require('gulp-uglify');
const wait         = require('gulp-wait');

const inject = require('gulp-inject');

const bowerFiles = require('main-bower-files');
const stylus = require('gulp-stylus');
const es = require('event-stream');


// Copy images, fonts
gulp.task("CopyAssets", function () {
    return gulp.src(["assets/images/**/*", "styles/lib/**/*", "assets/fonts/**/*", "scripts/**/*.js", "scripts/**/*.json"], {
      cwd: conf.paths.src
    }).pipe(copy(conf.paths.build));
  });

// Copy bower
gulp.task("CopyBower", function() {
    const srcFolder = ["bower_components/**/*"];
    gulp.src(srcFolder)
        .pipe(plumber())
        .pipe(watch(srcFolder))
        .pipe(copy(conf.paths.build));

});


// minify css, js etc...
gulp.task("usemin", function() {
    const pathToIndexHtml = `${CONFIG.DEST_FOLDER}/index.html`;
    gulp.src([pathToIndexHtml])
        .pipe(wait(1000))
        .pipe(usemin({
            css: [
                minifyCss()
            ],
            js:[
                uglify(),
                "concat"
            ]
        }))
        .pipe(wait(1000))
        .pipe(gulp.dest(CONFIG.DEST_FOLDER));
});
//Task for SONAR
gulp.task('sonar', function () {
    var options = {
        sonar: {
            host: {
                url: 'http://localhost:9000'
            },

            projectKey: 'sonar:my-project:1.0.0',
            projectName: 'Taj Hotel',
            projectVersion: '1.0.0',
            // comma-delimited string of source directories
            sources: 'src/app/components/**/*.js',
            language: 'js',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: 'test/sonar_report/lcov.info'
                }
            },
            exec: {
                // All these properties will be send to the child_process.exec method (see: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback )
                // Increase the amount of data allowed on stdout or stderr (if this value is exceeded then the child process is killed, and the gulp-sonar will fail).
                maxBuffer : 1024*1024
            }
        }
    };

    // gulp source doesn't matter, all files are referenced in options object above
    return gulp.src('thisFileDoesNotExist.js', { read: false })
        .pipe(sonar(options))
        .on('error', util.log);
});
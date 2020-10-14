// const path = require( 'path' );
// const conf = require( './config' );
// const imagemin = require('gulp-imagemin');

// gulp.task('progresive-jpeg', function () {
//     path.join(conf.paths.src, '/assets/images/*');
//     console.log('--------------------ddddddddddddd---------------ddddddddd---------------');
//     return gulp.src([path.join(conf.paths.src, '/assets/images/*')])
//         .pipe(imagemin([
//             //imagemin.gifsicle({interlaced: true}),
//             imagemin.jpegtran({progressive: true}),
//             imagemin.optipng({optimizationLevel: 5})
//             /*imagemin.svgo({
//                 plugins: [
//                     {removeViewBox: true},
//                     {cleanupIDs: false}
//                 ]
//             })*/
//         ]))

//         .pipe(gulp.dest('./build/assets/images'));       
// });
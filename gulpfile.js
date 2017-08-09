const gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    webserver = require('gulp-webserver');


/////////
// PUG //
/////////
gulp.task('pug', function() {
    return gulp.src('./src/pug/*.pug')
        .pipe(pug({
            pretty: true,
        }))
        .pipe(gulp.dest('./src/'));
});
gulp.task('pug-watch', ['pug'], function() {
    gulp.watch('./src/pug/**/*.pug', ['pug'])
});

//////////
// SASS //
//////////
gulp.task('sass', function() {
    return gulp.src(['./src/sass/main.scss', './src/sass/pages/*.scss'])
        .pipe(sass())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', '> 5%', 'Firefox ESR']
        }))
        .pipe(gulp.dest('./src/css'));
});
gulp.task('sass-watch', ['sass'], function() {
    gulp.watch('./src/sass/**/*.scss', ['sass'])
});

////////////
// SERVER //
////////////
gulp.task('server', function() {
    return gulp.src('./')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: 'http://localhost:8000/src/index.html'
        }));
});

// Default task
gulp.task('default', ['pug-watch', 'sass-watch', 'server']);

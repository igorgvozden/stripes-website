var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var iconfont = require('gulp-iconfont');
var iconfontCss = require('gulp-iconfont-css');
var sassLint = require('gulp-sass-lint');

//sass lint
gulp.task('sass-lint', function() {
    return gulp.src('app/scss/*.s+(a|c)ss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

//delete dist
gulp.task('del', function() {
    return del.sync('dist');
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});
 // ovo je test task
gulp.task('hello', function() {
    console.log('hello Zell');
});

// kopiranje html
gulp.task('copy-html', function() {
    return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
});

// fontovi
gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// kompajliranje scss
gulp.task('sass', function() {
    return gulp.src('app/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/css'))
});

//js
gulp.task("copy-js", function() {
    gulp.src('app/js/*.js')
    .pipe(gulp.dest('dist/js'));
});

// cisti dist pre nego sto krene u pisanje
gulp.task('clean:dist', function() {
    return del.sync('dist');
});

// optimizacija slika
gulp.task('copyimage', function() {
    gulp.src('app/images/*.png')
    .pipe(gulp.dest('dist/images'))
});

//iconfonts
gulp.task('iconfont', function() {
    return gulp.src(['app/icons/*.svg'], {base: 'app'})
    .pipe(iconfontCss({
        fontName: 'myfont',
        path: 'app/config/_iconfont.scss',
        targetPath: '../../app/scss/_iconfont.scss',
        fontPath: '../../fonts/'
    }))
    .pipe(iconfont({
        fontName: 'myfont',
        formats: ['ttf', 'woff', 'woff2']
    }))
    .on('glyphs', function(glyphs, options) {
        console.log(glyphs, options);
    })
    .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('default', ['browserSync', 'copy-html', 'copyimage', 'fonts', 'iconfont','sass', 'copy-js', 'sass-lint'], function() {
    gulp.watch('app/scss/*.scss', ['sass', 'sass-lint']);
    gulp.watch('app/*.html', ['copy-html']);
    gulp.watch('app/js/*.js', ['copy-js']);
});



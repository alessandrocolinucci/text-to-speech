const gulp = require('gulp');
const minifyimg = require('gulp-image');
const broswerSync = require('browser-sync');
const sass = require('gulp-sass');
const minifycss = require('gulp-clean-css');
const uglify = require('gulp-uglify');

// Watch and Serve
gulp.task('serve', ['copyhtml', 'sass', 'minifyjs', 'imageminify'], () => {

    broswerSync.init({
        server: './src'
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/*.html']).on('change', broswerSync.reload);
})

// Copy All HTML files
gulp.task('copyhtml', () => {
    return gulp.src('src/*.html')
               .pipe(gulp.dest('dist'));
});

// Compile Sass and minify
gulp.task('sass', () => {
    return gulp.src(['src/scss/*.scss'])
               .pipe(sass().on('error', sass.logError))
               .pipe(minifycss())
               .pipe(gulp.dest('dist/css'));
});

// Minify JS
gulp.task('minifyjs', () => {
    return gulp.src('src/js/*.js')
               .pipe(uglify())
               .pipe(gulp.dest('dist/js'))
})

// Optimize images
gulp.task('imageminify', () => {
    return gulp.src('src/images/*')
               .pipe(minifyimg())
               .pipe(gulp.dest('dist/images'))
})

// Default task
gulp.task('default', ['serve']);
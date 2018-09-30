const gulp = require('gulp');
const minifyimg = require('gulp-image');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const minifycss = require('gulp-clean-css');
const uglify = require('gulp-uglify');

// Serve
gulp.task('serve', () => {

    browserSync.init({
        server: './src'
    });

    gulp.watch(['src/scss/*.scss'], ['sass']);
    gulp.watch(['src/*.html']).on('change', browserSync.reload);
})

// Copy All HTML files
gulp.task('copyhtml', () => {
    return gulp.src('src/*.html')
               .pipe(gulp.dest('dist'));
});

// Copy all fonts - requires to be .woff2
gulp.task('copyfonts', () => {
    return gulp.src('src/fonts/*.woff2')
               .pipe(gulp.dest('dist/fonts'));
});


// Compile Sass and minify

// Compile sass
gulp.task('sass', () => {
    return gulp.src(['src/scss/*.scss'])
               .pipe(sass().on('error', sass.logError))
               .pipe(gulp.dest("src/css"))
               .pipe(browserSync.stream());
});

// Minify CSS
gulp.task('minifycss', () => {
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

// Minify task
gulp.task('minify', ['copyhtml', 'copyfonts', 'minifycss', 'minifyjs', 'imageminify']);

// Default task
gulp.task('default', ['serve']);


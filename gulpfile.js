const browserSync = require('browser-sync');  // To live reload application
const gulp = require('gulp'); // To use gulp
const rename = require('gulp-rename');  // To rename minified files
const minifyimg = require('gulp-image'); // To minify images
const sass = require('gulp-sass'); // To compile sass
const minifycss = require('gulp-clean-css'); // To minify css
const uglify = require('gulp-uglifyes'); // To minify js ES6

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
               .pipe(rename((path) => {
                    path.extname = '.min.css';
                }))
               .pipe(gulp.dest('dist/css'));
});

// Minify JS
gulp.task('minifyjs', () => {
    return gulp.src(['src/js/*.js'])
                .pipe(uglify({ 
                    mangle: false, 
                    ecma: 6 
                }))
                .pipe(rename((path) => {
                    path.extname = '.min.js';
                }))
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


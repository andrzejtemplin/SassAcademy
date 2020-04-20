const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const open = require('gulp-open');
const flatten = require('gulp-flatten');

sass.compiler = require('sass');

function convertToSass() {
    return src('./src/sass/*.scss')
        .pipe(sass({ errLogToConsole: true, overwrite: true }))
        .pipe(dest('./src'));
}

function build() {
    return src(['./src/css/*', './src/assets/*', './src/index.html', './src/main.css'])
        .pipe(flatten())
        .pipe(dest('./dist', { overwrite: true }))
        .pipe(connect.reload());
}

function watchForSassChanges() {
    return watch('./src/sass/**/*.scss', convertToSass);
}

function watchForChanges() {
    return watch(['./src/assets/*', './src/index.html', './src/main.css'], build);
}

function startServer() {
    connect.server({
        root: './dist',
        port: 8080,
        livereload: true
    })
}

function openBrowser() {
    return src('./dist/index.html', { allowEmpty: true })
        .pipe(open({ uri: 'http://localhost:8080/' }));
}

exports.default = parallel(build, startServer, watchForSassChanges, watchForChanges, openBrowser);
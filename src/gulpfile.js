const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const flatten = require('gulp-flatten');

sass.compiler = require('sass');

function convertToSass() {
    return src('./sass/*.scss')
        .pipe(sass({ errLogToConsole: true, overwrite: true }))
        .pipe(dest('.'));
}

function build() {
    return src(['./css/*', './assets/*', './index.html', './main.css'])
        .pipe(flatten())
        .pipe(dest('../dist', { overwrite: true }))
        .pipe(connect.reload());
}

function watchForSassChanges() {
    return watch('./sass/**/*.scss', convertToSass);
}

function watchForChanges() {
    return watch(['./assets/*', './index.html', './main.css'], build);
}

function startServer() {
    connect.server({
        root: '../dist',
        livereload: true
    })
}

exports.default = parallel(build, startServer, watchForSassChanges, watchForChanges);
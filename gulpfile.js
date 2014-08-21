'use strict';

var gulp = require('gulp');
var onejsCompiler = require('gulp-onejs-compiler');
var tsc = require('gulp-tsc');
var clean = require('gulp-clean');
var flatten = require('gulp-flatten');
var uglify = require('gulp-uglifyjs');
var add = require('gulp-add-src');
var less = require('gulp-less');
var cssMinify = require('gulp-minify-css');
var csstojs = require('gulp-csstojs');
var filter = require('gulp-filter');
var size = require('gulp-size');
var rjs = require('requirejs');

var paths = {
    tempPath: 'temp',
    appPath: 'app',
    appMinPath: 'app-min',
    staticFiles: [ 'bower_components/requirejs/require.js' ]
};

gulp.task('clean', function() {
    return gulp.src([paths.tempPath, paths.appPath, paths.appMinPath])
        .pipe(clean());
});

gulp.task('tsc-preprocess', ['clean'], function() {
    var lessFilter = filter('**/*.less');

    return gulp.src(['node_modules/onejs-compiler/src/**/*', 'node_modules/onejs/src/**/*', 'src/**/*' ])
        .pipe(lessFilter)
        .pipe(less())
        .pipe(cssMinify())
        .pipe(csstojs({
            typeScript: true
        }))
        .pipe(lessFilter.restore())
        .pipe(flatten())
        .pipe(onejsCompiler())
        .pipe(gulp.dest(paths.tempPath + '/ts'));
});

gulp.task('tsc', ['tsc-preprocess'], function() {
    return gulp.src(paths.tempPath + '/ts/**/*.ts')
        .pipe(tsc({
            module: 'amd'
        }))
        .pipe(gulp.dest(paths.appPath));
});

gulp.task('rjs', ['tsc'], function(cb) {
    rjs.optimize({
        baseUrl: paths.appPath,
        dir: paths.tempPath + '/rjs',
        optimize: 'uglify2',
        modules: [
        {
            name: 'main'
        }]
    }, function(buildResponse) {
        console.log(buildResponse);
        cb();
    }, cb);
});

gulp.task('minify', ['rjs'], function() {
    return gulp.src([paths.tempPath + '/rjs/main.js' ])
        .pipe(size({gzip: true }))
        .pipe(gulp.dest(paths.appMinPath ));
});

gulp.task('copy-static-files', ['clean', 'tsc'], function() {
    return gulp.src(paths.staticFiles)
        .pipe(gulp.dest(paths.appPath))
        .pipe(uglify())
        .pipe(gulp.dest(paths.appMinPath));
});

gulp.task('copy-images', ['clean'], function() {
    return gulp.src(['src/**/*.png'])
        .pipe(flatten())
        .pipe(gulp.dest(paths.appPath));
});

gulp.task('serve', ['default'], function() {

});

gulp.task('watch', function() {
    gulp.watch('src/**/*', ['default']);
});

gulp.task('default', ['tsc', 'minify', 'copy-static-files', 'copy-images']);


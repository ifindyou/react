var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    react = require('gulp-react'),
    browserify=require('gulp-browserify'),
    jshint=require('gulp-jshint'),
    concat=require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    css = require('gulp-minify-css'),
    f5 = require('browser-sync'),
    header = require('gulp-header'),
    bundle = require('gulp-browserify'),
    autoprefixer = require('gulp-autoprefixer');

var paths={
    	stylus:['app/pre/stylus/**/*.styl'],
    	jsx:['app/pre/jsx/**/*.jsx'],
        index:['app/src/index.js'],
        bin:'app/bin/',
        srcJs:['app/src/**/*.js'],
        view_js:'app/src/view/js/',
        init:'init.js',
        binJS:'app/bin/*.js',
        public:'app/public/',
        init_min:'init.min.js'
    },
	author='wanghongxin',
	banner=['/**',
			  ' * @Author:<%= pkg.name1 %> and <%= pkg.name2 %>',
			  ' * @Time:<%= new Date().toString().replace(/[\u4e00-\u9fa5]+/,"modified by wanghongxin") %>',
			  ' */',
			  ''
			].join('\n');

gulp.task('binF5', ['scripts'],function() {
    var files = [
        'app/*.html',
        'app/bin/**/*.*',
        // '!app/public/**/*.*',
        // '!app/public'
    ];
    f5.init(files, {
        server: {
            baseDir: './app'
        }
    });
});

gulp.task('preWatch',function(){
    gulp.watch(paths.jsx,['jsx']);
});

gulp.task('srcWatch',function(){
    gulp.watch(paths.srcJs,['scripts']);
});

gulp.task('binWatch',function(){
    gulp.watch(paths.binJS,['minifyjs']);
});

gulp.task('minifyjs',function(){
    gulp.src(paths.binJS)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('init.min.js'))
        .pipe(header(banner,{pkg:{name1:'wanghongxin',name2:'fuwei'}}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.public));
});

gulp.task('jsx',function(){
	return gulp.src(paths.jsx)
        .pipe(sourcemaps.init())
        .pipe(react())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.view_js)); 
});

gulp.task('scripts',['jsx'],function(){
    gulp.src(paths.index)
        .pipe(sourcemaps.init())
        .pipe(bundle())
        .pipe(rename(paths.init))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.bin));
});

gulp.task('default',['binF5','preWatch','srcWatch','binWatch'],function(){});
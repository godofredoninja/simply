/**
 * Module dependencies
 */

const del = require('del')
const gulp = require('gulp')
const cssnano = require('cssnano')
const mqpacker = require('css-mqpacker')
const autoprefixer = require('autoprefixer')
const gulpLoadPlugins = require('gulp-load-plugins')

const rename = require('gulp-rename')

const pxtorem = require('postcss-pxtorem')

const browserify = require('browserify')
// const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
//
const merge = require('merge-stream')

const { name, version, author, license, repository } = require('./package')

// loade all gulp plugins
const $ = gulpLoadPlugins()

// environment
const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production'

// build comments
const comments = `/*!
 * ${name} v${version}
 * Copyright ${new Date().getFullYear()} ${author.name} <${author.email}> (${repository.url})
 * Licensed under ${license}
 */`

/**
 * Private tasks
 */

const clean = () => {
  return del([
    'assets',
    'partials/styles.hbs',
    // 'partials/amp/amp-styles.hbs',
    `${name}-v${version}.zip`
  ])
}

const style = () => {
  return gulp.src('src/scss/*.scss')
    .pipe($.plumber())
    .pipe($.if(!isProduction, $.sourcemaps.init()))
    .pipe($.sass({ outputStyle: 'expanded' }).on('error', $.sass.logError))
    .pipe($.if(isProduction, $.postcss([autoprefixer(), pxtorem(), mqpacker(), cssnano()])))
    .pipe($.if(isProduction, $.header(comments)))
    .pipe($.if(!isProduction, $.sourcemaps.write('./map')))
    .pipe(gulp.dest('assets/styles'))
    .pipe($.livereload())
}

const styleTheme = () => {
  return gulp.src('src/scss/theme/*.scss')
    .pipe($.plumber())
    .pipe($.sass({ outputStyle: 'expanded' }).on('error', $.sass.logError))
    .pipe($.postcss([autoprefixer(), mqpacker(), cssnano()]))
    .pipe(gulp.dest('assets/styles/theme'))
}

const script = () => {
  const files = ['main', 'search', 'pagination', 'prismjs']

  return merge(files.map(function (file) {
    return browserify({
      basedir: '.',
      debug: true,
      entries: `./src/js/${file}.js`,
      cache: {},
      packageCache: {}
    }).transform('babelify', {
      presets: ['@babel/env'],
      plugins: ['@babel/plugin-transform-runtime']
    })
      .bundle()
      .pipe(source(`${file}.js`))
      .pipe($.plumber())
      .pipe(buffer())
      .pipe($.if(!isProduction, $.sourcemaps.init({ loadMaps: true })))
      .pipe($.if(isProduction, $.uglify()))
      .pipe($.if(isProduction, $.header(comments)))
      .pipe($.if(!isProduction, $.sourcemaps.write('./map')))
      .pipe(gulp.dest('assets/scripts'))
      .pipe($.livereload())
  }))
}

const image = () => {
  return gulp.src('src/img/**/*.*')
    .pipe($.plumber())
    .pipe($.if(isProduction, $.imagemin()))
    .pipe(gulp.dest('assets/images'))
    .pipe($.livereload())
}

const archive = () => {
  const source = [
    'assets/**',
    'locales/*.json',
    '**/*.hbs',
    '!node_modules', '!node_modules/**',
    '!src', '!src/**',
    '!documentation', '!documentation/**',
    'LICENSE',
    'package.json',
    'README.md'
  ]

  return gulp.src(source, { base: '.' })
    .pipe($.plumber())
    .pipe($.zip(`${name}-v${version}.zip`))
    .pipe(gulp.dest('.'))
}

const copyPrismJs = () => {
  return gulp.src('node_modules/prismjs/components/*.min.js')
    .pipe($.plumber())
    .pipe(gulp.dest('assets/scripts/components'))
}

const copyMainStyle = () => {
  return gulp.src('assets/styles/main.css')
    .pipe($.plumber())
    .pipe(rename('styles.hbs'))
    .pipe(gulp.dest('partials'))
}

const copyAmpStyle = () => {
  return gulp.src('assets/styles/amp.css')
    .pipe($.plumber())
    .pipe(rename('amp-styles.hbs'))
    .pipe(gulp.dest('partials/amp'))
}

const watch = () => {
  $.livereload.listen()
  gulp.watch('src/scss/**', style)
  // gulp.watch('src/scss/theme/**', styleTheme)
  gulp.watch('src/js/**', script)
  gulp.watch('src/img/**/*.*', image)
  gulp.watch('**/*.hbs').on('change', p => $.livereload.changed(p))
}

const compile = gulp.parallel(style, script, image)

/**
 * Public tasks
 */

const build = gulp.series(clean, compile)

const release = gulp.series(build, styleTheme, copyMainStyle, copyAmpStyle, copyPrismJs, archive)

const develop = gulp.series(build, watch)

module.exports = { build, release, develop }

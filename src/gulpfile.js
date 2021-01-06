const { series, watch, src, dest, parallel } = require('gulp')
const pump = require('pump')
const del = require('del')

const rename = require('gulp-rename')
const replace = require('gulp-replace')

// gulp plugins and utils
const livereload = require('gulp-livereload')
const beeper = require('beeper')
const postcss = require('gulp-postcss')
const zip = require('gulp-zip')
const gulpif = require('gulp-if')
const sourcemaps = require('gulp-sourcemaps')
const header = require('gulp-header')

// Babel
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const uglify = require('gulp-uglify')
//
const merge = require('merge-stream')

// postcss plugins
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const comments = require('postcss-discard-comments')
const tailwindcss = require('tailwindcss')

// sass
const sass = require('gulp-sass')

// environment
const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production'

// Path Base
const pathBase = '../'

// Data collection on the theme
const { name, version, author, license, repository } = require(`${pathBase}package.json`)

// Build Comments
const BuildComments = `/*!
 * ${name} v${version}
 * Copyright ${new Date().getFullYear()} ${author.name} <${author.email}> (${repository.url})
 * Licensed under ${license}
 */`

// clean assets
const clean = () => {
  return del([
    `${pathBase}assets`,
    `${pathBase}partials/styles`,
    `${pathBase}dist`
  ], { force: true })
}

function serve (done) {
  livereload.listen()
  done()
}

const handleError = done => {
  return function (err) {
    if (err) {
      beeper()
    }
    return done(err)
  }
}

// hbs
function hbs (done) {
  pump([
    // src([`${pathBase}*.hbs`, `${pathBase}partials/**/*.hbs`]),
    src([`${pathBase}**/*.hbs`]),
    livereload()
  ], handleError(done))
}

// style
function styles (done) {
  pump([
    src('sass/*.sass'),
    gulpif(!isProduction, sourcemaps.init()),
    sass({ outputStyle: 'expanded' }).on('error', sass.logError),
    gulpif(!isProduction, postcss([tailwindcss()])),
    gulpif(isProduction, postcss([tailwindcss(), autoprefixer(), cssnano(), comments({ removeAll: true })])),
    gulpif(isProduction, header(BuildComments)),
    gulpif(!isProduction, sourcemaps.write('./map')),
    dest(`${pathBase}assets/styles`),
    livereload()
  ], handleError(done))
}

// Scripts
function scripts (done) {
  const files = ['main', 'prismjs', 'kusi-doc-post', 'pagination', 'search']

  merge(files.map(function (file) {
    return pump([
      browserify({
        basedir: '.',
        debug: true,
        entries: `./js/${file}.js`,
        cache: {},
        packageCache: {}
      }).transform('babelify', {
        presets: ['@babel/env'],
        plugins: ['@babel/plugin-transform-runtime']
      }).bundle(),
      source(`${file}.js`),
      buffer(),
      gulpif(!isProduction, sourcemaps.init()),
      gulpif(isProduction, uglify()),
      gulpif(isProduction, header(BuildComments)),
      gulpif(!isProduction, sourcemaps.write('./map')),
      dest(`${pathBase}assets/scripts`),
      livereload()
    ], handleError(done))
  }))
}

// Image
function images (done) {
  pump([
    src('img/**/*.*'),
    dest(`${pathBase}assets/images`),
    livereload()
  ], handleError(done))
}

function copyAmpStyle (done) {
  pump([
    src(`${pathBase}assets/styles/amp.css`),
    replace('@charset "UTF-8";', ''),
    postcss([cssnano(), comments({ removeAll: true })]),
    rename('amp-styles.hbs'),
    dest(`${pathBase}/partials/amp`)
  ], handleError(done))
}

function copyMainStyle (done) {
  pump([
    src(`${pathBase}assets/styles/main.css`),
    replace('@charset "UTF-8";', ''),
    postcss([cssnano(), comments({ removeAll: true })]),
    rename('main-styles.hbs'),
    dest(`${pathBase}/partials`)
  ], handleError(done))
}

// ZIP
function zipper (done) {
  const filename = `${name}-v${version}.zip`

  pump([
    src([
      `${pathBase}assets/**`,
      `${pathBase}locales/*.json`,
      `${pathBase}**/*.hbs`,
      `${pathBase}LICENSE`,
      `${pathBase}package.json`,
      `${pathBase}README.md`,
      `!${pathBase}node_modules`, `!${pathBase}node_modules/**`,
      `!${pathBase}dist`, `!${pathBase}dist/**`,
      `!${pathBase}src`, `!${pathBase}src/**`
    ], { base: pathBase }),
    zip(filename),
    dest(`${pathBase}dist`)
  ], handleError(done))
}

const cssWatcher = () => watch('sass/**', styles)
const jsWatcher = () => watch(['js/**', '*.js'], scripts)
const imgWatcher = () => watch('img/**', images)
// const hbsWatcher = () => watch([`${pathBase}*.hbs`, `${pathBase}partials/**/*.hbs`], hbs)
const hbsWatcher = () => watch([`${pathBase}*.hbs`, `${pathBase}partials/**/*.hbs`], hbs)

const compile = parallel(styles, scripts, images)
const watcher = parallel(cssWatcher, jsWatcher, imgWatcher, hbsWatcher)

const build = series(clean, compile)
const production = series(build, copyAmpStyle, copyMainStyle, zipper)
const development = series(build, serve, watcher)

module.exports = { build, development, production }

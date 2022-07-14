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
const simpleExtend = require('postcss-extend')
const tailwindcss = require('tailwindcss')
// const lol = require('postcss-advanced-variables')
const postImport = require('postcss-import')
const precss = require('precss')
const postNesting = require('tailwindcss/nesting') // postcss-nested

// sass
// const sass = require('gulp-sass')(require('sass'))

// environment
const isProduction = process.argv.includes('--production') || process.env.NODE_ENV === 'production'

// Data collection on the theme
const { name, version, author, license, repository } = require('./package.json')

// Build Comments
const BuildComments = `/*!
 * ${name} v${version}
 * Copyright ${new Date().getFullYear()} ${author.name} <${author.email}> (${repository.url})
 * Licensed under ${license}
 */`

// clean assets
const clean = () => {
  return del([
    'assets',
    'partials/styles',
    'dis'
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
// function hbs (done) {
//   pump([
//     src(['*.hbs', 'partials/**/*.hbs']),
//     livereload()
//   ], handleError(done))
// }

const postcssPluginsDev = [
  postImport(),
  simpleExtend(),
  precss(),
  postNesting(),
  tailwindcss()
]

const postcssPluginsPro = [
  autoprefixer(),
  cssnano(),
  comments({ removeAll: true })
]

// style
function styles (done) {
  pump([
    src('src/css/*.css'),
    gulpif(!isProduction, sourcemaps.init()),
    // sass({ outputStyle: 'expanded' }).on('error', sass.logError),
    gulpif(!isProduction, postcss(postcssPluginsDev)),
    gulpif(isProduction, postcss(postcssPluginsDev.concat(postcssPluginsPro))),
    gulpif(isProduction, header(BuildComments)),
    gulpif(!isProduction, sourcemaps.write('./map')),
    dest('assets/styles'),
    livereload()
  ], handleError(done))
}

// Scripts
function scripts (done) {
  const files = ['main', 'post', 'prismjs', 'kusi-doc-post', 'pagination']

  merge(files.map(function (file) {
    return pump([
      browserify({
        basedir: '.',
        debug: true,
        entries: `./src/js/${file}.js`,
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
      dest('assets/scripts'),
      livereload()
    ], handleError(done))
  }))
}

// Image
function images (done) {
  pump([
    src('src/img/**/*.*'),
    dest('assets/images'),
    livereload()
  ], handleError(done))
}

function copyAmpStyle (done) {
  pump([
    src('assets/styles/amp.css'),
    replace('@charset "UTF-8";', ''),
    postcss([cssnano(), comments({ removeAll: true })]),
    rename('amp-styles.hbs'),
    dest('partials/amp')
  ], handleError(done))
}

function copyMainStyle (done) {
  pump([
    src('assets/styles/main.css'),
    replace('@charset "UTF-8";', ''),
    postcss([cssnano(), comments({ removeAll: true })]),
    rename('main-styles.hbs'),
    dest('partials')
  ], handleError(done))
}

// ZIP
function zipper (done) {
  const filename = `${name}-v${version}.zip`

  pump([
    src([
      'assets/**',
      'locales/*.json',
      '*.hbs',
      'partials/**',
      'LICENSE',
      'package.json',
      'README.md',
      '!node_modules', '!node_modules/**',
      '!dist', '!dist/**',
      '!src', '!src/**'
    ], { base: '.' }),
    zip(filename),
    dest('dist')
  ], handleError(done))
}

const cssWatcher = () => watch('src/css/**', styles)
const jsWatcher = () => watch(['src/js/**', '*.js'], scripts)
const imgWatcher = () => watch('src/img/**', images)
// const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], hbs)
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], styles)

const compile = parallel(styles, scripts, images)
const watcher = parallel(cssWatcher, jsWatcher, imgWatcher, hbsWatcher)

const build = series(clean, compile)
const production = series(build, copyAmpStyle, copyMainStyle, zipper)
// const production = series(build)
const development = series(build, serve, watcher)

module.exports = { build, development, production }

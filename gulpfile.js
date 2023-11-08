const { src, dest, watch, series } = require('gulp');

//CSS Y SASS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');

//Imagenes
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

function css(done) {
  // compilar sass
  //pasos: 1 - indentificar archivo, 2- Compilarla, 3- Guardar el .css

  src('src/scss/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/css'));

  done();
}

// function imagenes() {
//   return src('src/img/**/*')
//     .pipe(imagemin({ optimizationLevel: 3 }))
//     .pipe(dest('build/img'));
// }

// function versionWebp() {
//   const opciones = {
//     quality: 50,
//   };
//   return src('src/img/**/*.{png,jpg,jpeg}')
//     .pipe(webp(opciones))
//     .pipe(dest('build/img'));
// }

// function versionAvif() {
//   const opciones = {
//     quality: 50,
//   };
//   return src('src/img/**/*.{png,jpg,jpeg}')
//     .pipe(avif(opciones))
//     .pipe(dest('build/img'));
// }

function dev() {
  watch('src/scss/**/*.scss', css);
  //watch('src/img/**/*', imagenes);
}

exports.css = css;
exports.dev = dev;
//exports.imagenes = imagenes;
//exports.versionWebp = versionWebp;

exports.default = series(css, dev);

//series - se inicia una tarea, y hasta que finaliza, inicia la siguiente tarea

// parallel - todas las tareas inician al mismo tiempo

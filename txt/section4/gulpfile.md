Gulpfile
========
Gulpfile es el archivo o fichero de configuración que Gulp necesita
para saber que tareas realizará y ejecutará.


>- #### primary::Estructura del fichero

> **Plugins:**

> Cualquier plugin que haya sido instalado y que sea necesario para ejecutar una tarea 
> determinada se incluirá en el inicio del gulpfile como dependencia:
> 
```js
var gulp = require('gulp');
var "nombre_asignado_plugin" = require("nombre_plugin_instalado");
```

> **Tasks:**

> Una vez incluidas los plugins de gulp necesarios para configurar las tareas,
> creamos los tasks. Como primer parámetro aceptarán un nombre identificativo de la tarea
> y como segundo la función a ejecutar cuando se invoque:

> 
```js
gulp.task("nombre_tarea",function(){
});
```

> **Default task:**

> Representa aquella tarea que puede ser invocada desde línea de comandos
> simplemente introduciendo "gulp", sin llamar a ningún task en particular:
>
```bash
    $ gulp
```

> Definición y sintaxis:
```js
gulp.task('default', function()
{
});
```
> Podemos configurar la *Default task* a modo de que ejecute automáticamente
algunas subtareas configuradas en el gulpfile.js:
> 
```js
    gulp.task('default', ['subtarea']);
```

<hr />

>- #### primary::Ejemplo:
>
```js
var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var paths = {
  scripts: ['client/js/**/*.coffee', '!client/external/**/*.coffee'],
  images: 'client/img/**/*'
};
// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
  // You can use multiple globbing patterns as you would with `gulp.src`
  return del(['build']);
});
gulp.task('scripts', ['clean'], function() {
  // Minify and copy all JavaScript (except vendor scripts)
  // with sourcemaps all the way down
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
      .pipe(coffee())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'));
});
// Copy all static images
gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    // Pass in options to the task
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('build/img'));
});
// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.images, ['images']);
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images']);
```

<hr />

>- #### primary::Videotutorial explicativo sobre el uso de Gulp.js (instalación, plugins,...)
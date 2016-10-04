// var gulp = require('gulp');
// var shell = require('gulp-shell');
// var watch = require('gulp-watch');


// gulp.task('construir_gitbook', function()
// {
//     return gulp.src('./scripts')
//         .pipe(shell([
//             "gitbook install"
//         ]))        
//         .pipe(shell([
//           "./scripts/losh generate-gitbook" 
//         ]))
//         .pipe(shell([
//           "./scripts/losh generate-wiki"
//         ]))
//         .pipe(shell([
//             "./scripts/losh deploy-gitbook"
//         ]))
//         .pipe(shell([
//             "./scripts/losh deploy-wiki"    
//         ]))
// });


// // gulp.task('gitbook-pdf', function(){
// //     return gulp.src('')
// //         .pipe(shell(["gitbook pdf ../tareas-iniciales-josue-nayra ./mybook.pdf"])
// //         )
// // });

// // gulp.task('subir_repo', function(){
// //     return gulp.src('').pipe(shell([
// //         'git add . '+
// //         'git commit -m "Probando task en gulpfile" '+
// //         'git push origin master'
// //     ]))
// // });



var gulp  = require('gulp');
var shell = require('gulp-shell');

var deploygh = function() {
  "use strict";
  let gh = require('gh-pages');

  //process.env.CMDDESC="Deploy GitBook on Github";

  let json = require('./package.json');
  let REPO = json.repository.url;
  console.log(REPO);

  gh.publish('./gh-pages', { repo: REPO, logger: function(m) { console.error(m); } });
  
  gulp.src('').pipe(shell([
     "./scripts/losh generate-wiki",
     "./scripts/losh deploy-wiki"
   ]))
}

gulp.task('construir_gitbook', function()
{
  return gulp.src('./scripts/')
        .pipe(shell(['./scripts/generate-gitbook']))
        .pipe(shell([
          "git add ."+
          ";"+
          "git commit -m 'Actualizando gitbook'"+
          ";"+
          "git push origin master"
        ]))
});

gulp.task('plugins', function()
{
    return gulp.src('').pipe(shell(['gitbook install']))
});

//  "deploy-gitbook": "./scripts/losh deploy-gitbook",
gulp.task('deploy', ['plugins','construir_gitbook'], deploygh);

//  "deploy-togbsio": "./scripts/losh deploy-togbsio",
// gulp.task('push',
//   shell.task(
//     "git add ."+
//     ";"+
//     "git commmit -m 'deploy to github'"+
//     ";"+
//     "git push origin master",
//     { verbose: true }
//   )
// );

// npm install -g http-server
//  "generate-gitbook": "./scripts/generate-gitbook",
// gulp.task('build', function() {
//   return gulp.src('').pipe(shell(['./scripts/generate-gitbook']));
// });

gulp.task('default', function(){
    gulp.watch(['scripts/*', 'txt/**/*.md', 'book.json'], ['construir_gitbook']); 
});
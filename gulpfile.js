var gulp  = require('gulp');
var shell = require('gulp-shell');
var Q = require('q');
var gitbook = require('gitbook');
var install = require('gulp-install');
var git = require('gulp-git');

var deploygh = function() {
  "use strict";
  let gh = require('gh-pages');

  let json = require('./package.json');
  let REPO = json.repository.url;
  console.log(REPO);

  gh.publish('./gh-pages', { repo: REPO, logger: function(m) { console.error(m); } });
  
  gulp.src('').pipe(shell([
     "./scripts/losh generate-wiki",
     "./scripts/losh deploy-wiki"
   ]))
}

//Actualizar repositorio
gulp.task('git-add', function(){
    return gulp.src('')
               .pipe(git.add());
});

gulp.task('git-commit', function(){
    return gulp.src('')
               .pipe(git.commit('Actualizando Gitbook'));
});

gulp.task('push', ['git-add','git-commit'], function(){
    git.push('origin', 'master', function(err){
       if(err) throw err; 
    });
});


//  "deploy-gitbook": "./scripts/losh deploy-gitbook",
gulp.task('deploy', ['build','push'], deploygh);

gulp.task('build',function()
{
    var book = new gitbook.Book('./txt/', {
        config: {
            output: './gh-pages/'
        }
    });

    return Q.all(book.parse())
        .then(function () {
            return book.generate('website');
    });
})

gulp.task('instalar_recursos',['instalar_dependencias','instalar_plugins']);

gulp.task('instalar_dependencias', function()
{
    gulp.src(['./package.json']).pipe(install())
});

gulp.task('instalar_plugins', function()
{
    return gulp.src('').pipe(shell([
        'gitbook install'    
    ])) 
});

gulp.task('default', function(){
    gulp.watch(['scripts/*', 'txt/**/*.md', 'book.json'], ['construir_gitbook']); 
});

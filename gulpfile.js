var gulp  = require('gulp');
var shell = require('gulp-shell');
var Q = require('q');
var gitbook = require('gitbook');

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

gulp.task('push', function()
{
  return gulp.src('./scripts/')
        // .pipe(shell(['./scripts/generate-gitbook']))
        .pipe(shell([
          "git add ."+
          ";"+
          "git commit -m 'Actualizando gitbook'"+
          ";"+
          "git push origin master"
        ]))
});



//  "deploy-gitbook": "./scripts/losh deploy-gitbook",
gulp.task('deploy', ['plugins','build','push'], deploygh);

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

gulp.task('plugins', function()
{
    return gulp.src('').pipe(shell(['gitbook install']))
});


    
    
    

gulp.task('default', function(){
    gulp.watch(['scripts/*', 'txt/**/*.md', 'book.json'], ['construir_gitbook']); 
});

var gulp = require('gulp');
var log = require('gulp-util').log;
var chalk = require('chalk');
var domain = require('domain').create();

var i = 0;

var errorBeep = '\007';

domain.on('error', function(err){
  log('Errored due to', chalk.bgRed.bold(err.message), errorBeep);
  gulp.run('default');
});

gulp.task('default', function(){
  domain.run(function(){
    if(2 > i++) throw new Error('Increment too low');
  });
});

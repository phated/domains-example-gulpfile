var gulp = require('gulp');
var log = require('gulp-util').log;
var chalk = require('chalk');
var domain = require('domain').create();

var map = require('event-stream').map;

var i = 0;
var x = 5;

var errorBeep = '\007';

domain.on('error', function(err){
  log('Errored due to', chalk.bgRed.bold(err.message), errorBeep);
  gulp.run('default');
});

function errorStream(file, cb){
  if(2 < x--) return cb(new Error('Increment too high'));
  cb(null, file);
}

function streamError(){
  domain.run(function(){
    var err = map(errorStream);
    gulp.src('*.json')
      .pipe(err);
  });
}

gulp.task('streamError', ['throw'], streamError);

gulp.task('throw', function(){
  domain.run(function(){
    if(2 > i++) throw new Error('Increment too low');
    // on successful run, remove the dependency on this
    gulp.task('streamError', streamError);
  });
});

gulp.task('default', ['streamError']);

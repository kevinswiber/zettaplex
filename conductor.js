var fork = require('child_process').fork;
var path = require('path');
var mkdirp = require('mkdirp');

var N = process.env.N || 1;
var port = 4000;
var children = [];

for (var i = 0; i < N; i++) {
  var dir = path.join('.', '/data', '/server' + i);
  var name = 'server' + i;
  start(dir, name, port++);
}

function start(dir, name, port) {
  mkdirp(dir, function(err) {
    if (err) {
      throw err;
    }

    var env = process.env;
    env.NAME = name;
    env.PORT = port;

    var opts = { env: env, cwd: dir };
    var child = fork('../../server.js', opts);
    children.push(child);
  });
}

process.on('exit', function() {
  children.forEach(function(child) {
    child.kill();
  });
});

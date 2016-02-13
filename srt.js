var parser = require('subtitles-parser');
var fs = require('fs');

var fileList = fs.readdir('./subs', function(err, files) {
  files.forEach(function(file) {

    var srt = fs.readFileSync('./subs/' + file, "utf8");
    var subs = parser.fromSrt(srt);

    subs.forEach(function(sub) {
      sub.episode = file;
      var filename = './json/' + file + '.' + sub.id + '.json';
      console.log(filename);

      // Need to be synchronous here to avoid "Too many open files" error
      fs.writeFileSync(filename, JSON.stringify(sub));
    });
  });
});

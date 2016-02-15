"use strict";

const parser = require('subtitles-parser');
const fs = require('fs');
const htmlStrip = require('htmlstrip-native');

const fileList = fs.readdir('./subs', function(err, files) {
  files.forEach(function(file) {

    const srt = fs.readFileSync('./subs/' + file, "utf8");
    let subs = parser.fromSrt(srt);

    subs.forEach(function(sub) {
      sub.episode = file;
      sub.seconds = (Number(sub.startTime.slice(3, 5)) * 60) + Number(sub.startTime.slice(6, 8));
      sub.srtId = sub.id;
      delete sub.id;
      sub.text = htmlStrip.html_strip(sub.text);

      const filename = './json/' + file + '.' + sub.srtId;
      console.log('Writing: ' + filename);

      // Need to be synchronous here to avoid "Too many open files" error
      fs.writeFileSync(filename, JSON.stringify(sub));
    });
  });
});

# jerryatric
Search across subtitle files to find relevant screenshots

# Requirements
* Node
* vagrant
* ffmpeg
* mkvtoolnix
* Python (or any simple HTTP server) for serving images

# Usage
* Clone this repo with --recursive and run `npm install`
* Place .srt files into `./subs`
* Run `node srt.js` to write subtitles as JSON into `./json`
* Start the Elasticsearch vagrant box in `./elasticsearch` with `vagrant up`
* From the `./json` folder, post the converted subtitles to Elasticsearch using `find . -not -name .gitignore -exec curl -XPOST 'http://localhost:9200/jerryatric/screen/{}' -d @{} \;`. While this is running, you can open another terminal and run `curl 'localhost:9200/_cat/count?v'` to check the document count. If all goes well it should index 1 document for every file in `./json` (excluding the .gitignore)
* Create 1 screenshot per second from your video files with something like `ffmpeg -i Video.mkv -vf fps=1 %d.png`. Each video file should have it's screenshots saved into a separate folder, and serve the root folder with `python -m SimpleHTTPServer`

* Set up the web application in `./webapp` with `npm install`
* Start it with `npm start`. Your browser should launch with The Jerryatric!

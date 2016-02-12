# jerryatric
Search across subtitle files to find relevant screenshots

# Requirements
* Node
* ffmpeg
* Python (or any simple HTTP server) for serving images

# Usage
* Clone this repo and run `npm install`
* Place .srt files into `./subs`
* Run `node srt.js` to write subtitles as JSON into `./json`
* Start the Elasticsearch vagrant box in `./elasticsearch` with `vagrant up`
* Load the extracted JSON subtitles using commands like...
`curl -XPOST 'http://localhost:9200/seinfeld/external' -d @json/filename.json`. I used `find` with `-exec` to help with this.
* Create 1 screenshot per second from your video files with something like `ffmpeg -i Video.mkv -vf fps=1 %d.png`. Each video file should have it's screenshots saved into a separate folder, and serve the root folder with `python -m SimpleHTTPServer`
* To allow the web app to communicate with Elasticsearch, change the CORS permissions with...

```
vagrant ssh
vi /etc/elasticsearch/es-01/elasticsearch.yml

# Add these lines...

http.cors.enabled : true
http.cors.allow-origin : "*"
http.cors.allow-methods : OPTIONS, HEAD, GET, POST, PUT, DELETE
http.cors.allow-headers : X-Requested-With,X-Auth-Token,Content-Type, Content-Length
```

* Set up the web application in `./webapp` with `npm install`
* Start it with `npm start`. Your browser should launch with The Jerryatric!

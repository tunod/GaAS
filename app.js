var express = require('express')
    var http = require('http')
    var sys = require('sys');
    var twilio = require('twilio')
var app = express();
var client = new twilio.RestClient('C7c5ccbe028b2bc3f2731f960e6e1a0b9','0a2ac30b128b59d2ed47c0ff55051645')


 app.set('port', (process.env.PORT || 5000))
 app.use(express.static(__dirname + '/public'))

 app.get('/', function(request, response) {
   response.send('Hello World LOLBro!')
 });


app.post('/incoming', function(request, response) {
    var message = request.body.Body;
    var from = request.body.From;
    var processedMessage = function(message){
        return message;
    }
    sys.log('From: ' + from + ', Message: ' + message);
    var twiml = '<?xml version="1.0" encoding="UTF-8" ?>n<Response>n<Message>'+ processedMessage +'</Message>n</Response>';
       response.send(twiml, {'Content-Type':'text/xml'}, 200);
});
http.createServer(app).listen(app.get('port'), function() {    console.log("Node app is running at localhost:" + app.get('port'))  })
//var rapgeniusClient = require("rapgenius-js");

//var lyricsSearchCb = function(err, lyricsAndExplanations){
    //if(err){
      //console.log("Error: " + err);
    //}else{
      ////Printing lyrics with section names
      //var lyrics = lyricsAndExplanations.lyrics;
      //var explanations = lyricsAndExplanations.explanations;
      //console.log("Found lyrics for song [title=%s, main-artist=%s, featuring-artists=%s, producing-artists=%s]",
        //lyrics.songTitle, lyrics.mainArtist, lyrics.featuringArtists, lyrics.producingArtists);
      //console.log("**** LYRICS *****\n%s", lyrics.getFullLyrics(true));

      ////Now we can embed the explanations within the verses
      //// lyrics.addExplanations(explanations);
      //// var firstVerses = lyrics.sections[0].verses[0];
      //// console.log("\nVerses:\n %s \n\n *** This means ***\n%s", firstVerses.content, firstVerses.explanation);
    //}
//};

//var searchCallback = function(err, songs){
  //if(err){
    //console.log("Error: " + err);
  //}else{
    //if(songs.length > 0){
      ////We have some songs
      //rapgeniusClient.searchLyricsAndExplanations(songs[0].link, "rap", lyricsSearchCb);
    //}
  //}
//};

//rapgeniusClient.searchSong("Rap God", "rap", searchCallback);

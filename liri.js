require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios");
var moment = require("moment");
console.log("API KEYS", keys);
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
//////////////////////////////////
//Dowhatitsaysfunction - reading command from the file
var fs = require("fs");
var dataArr;
////command into process afgv
var command = process.argv[2];
/////////////////////////////////
//process the additonal arguments with a space e.g. post malone
var arguments = [];
for (var i = 3; i < process.argv.length; i++) {
  arguments.push(process.argv[i]);
}

var argString = arguments.join(" ");
///////////////////////////////////////////////////////////////////////////////////////////
///Change order and command name and arg string and spotifythissong
if (command === "spotify-") {
  spotifyThisSong(argString);
} else if (command === "concert-") {
  concertThis(argString);
} else if (command === "movie-this") {
  movieThis(argString);
} else if (command === "do-what-it-says") {
  doWhatItSays();
} else {
  console.log("Invalid Input");
}

function spotifyThisSong(arg) {
  if (arguments.length < 1) {
    /////////////default tracks
    spotify.search({ type: "track", query: "All the small things" }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error occurred: " + err);
      }
      console.log("No song - default track");
      console.log("Song:", data.tracks.items[0].name);
      console.log("Artist(s):", data.tracks.items[0].artists[0].name);
      if (data.tracks.items[i].preview_url === null) {
        console.log("No Preview URL");
      } else {
        console.log("Preview URL:", data.tracks.items[0].preview_url);
      }
      console.log("Album:", data.tracks.items[0].album.name);
    });
  } else {
    spotify.search({ type: "track", limit: 1, query: arg }, function(
      err,
      data
    ) {
      if (err) {
        return console.log("Error: " + err);
      }
      ////////////requested tracks
      for (var i = 0; i < data.tracks.items.length; i++) {
        console.log(data.tracks.items[i].artists[0].name);
        console.log("Song:", data.tracks.items[i].name);
        console.log("Artist(s):", data.tracks.items[i].artists[0].name);
        if (data.tracks.items[i].preview_url === null) {
          console.log("No Preview URL");
        } else {
          console.log("Preview URL:", data.tracks.items[i].preview_url);
        }
        console.log("Album:", data.tracks.items[i].album.name);
      }
    });
  }
}
///////////////////////Concert This

function concertThis(arguments) {
  if (arguments.length < 1) {
    return console.log("No artist, Try Again.");
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        argString.toString() +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log("Here are the events for " + argString);
      response.data.forEach(function(event) {
        console.log(argString);
        console.log("Venue:", event.venue.name);
        console.log("Location:", event.venue.city + " " + event.venue.region);
        console.log(
          "Time: ",
          moment(event.datetime).format("MM/DD/YYYY, h:mm a")
        );
      });
    });
}
///////////////////////////////////////////////////////////

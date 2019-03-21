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
var inputs = process.argv[2];
/////////////////////////////////
//process the additonal arguments with a space e.g. post malone
var arguments = [];
for (var i = 3; i < process.argv.length; i++) {
  arguments.push(process.argv[i]);
}

var Str = arguments.join(" ");
///////////////////////////////////////////////////////////////////////////////////////////
///Change order and command name and arg string and spotifythissong
if (inputs === "spotify-") {
  spotifySong(Str);
} else if (inputs === "concert-") {
  concert(Str);
} else if (inputs === "movie-") {
  movie(Str);
} else if (inputs === "do-what-it-says") {
  doWhatItSays();
} else {
  console.log("Invalid Input");
}
////////////////////////////////////Spotify
function spotifySong(arg) {
  spotify.search({ type: "track", limit: 1, query: arg }, function(err, data) {
    if (err) {
      return console.log("Error: " + err);
    }
    ////////////requested tracks
    for (var i = 0; i < data.tracks.items.length; i++) {
      console.log(data.tracks.items[i].artists[0].name);
      console.log("Song:", data.tracks.items[i].name);
      console.log("Artist(s):", data.tracks.items[i].artists[0].name);
      if (data.tracks.items[i].preview_url === null) {
        console.log("No Preview Found");
      } else {
        console.log("Preview URL:", data.tracks.items[i].preview_url);
      }
      console.log("Album:", data.tracks.items[i].album.name);
    }
  });
}

///////////////////////Concert This

function concert(arguments) {
  if (arguments.length < 1) {
    return console.log("No artist, Try Again.");
  }
  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        Str.toString() +
        "/events?app_id=codingbootcamp"
    )
    .then(function(response) {
      console.log("Here are the events for " + Str);
      response.data.forEach(function(event) {
        console.log(Str);
        console.log("Venue:", event.venue.name);
        console.log("Location:", event.venue.city + " " + event.venue.region);
        console.log(
          "Time: ",
          moment(event.datetime).format("MM/DD/YYYY, h:mm a")
        );
      });
    });
}
///////////////////////////////////////////////////////////////////
//Movie This funciton
function movie(arguments) {
  if (arguments === undefined || arguments.length < 1) {
    return console.log(
      "Deafult Movie: 'Mr. Nobody,' - http://www.imdb.com/title/tt0485947/"
    );
  }
  axios
    .get(
      "http://www.omdbapi.com/?t=" + arguments + "&y=&plot=short&apikey=trilogy"
    )
    .then(function(response) {
      console.log("Title:", response.data.Title);
      console.log("Year:", response.data.Year);
      console.log("IMDB Rating:", response.data.imdbRating);
      console.log("Metascore Rating:", response.data.Metascore + "%");
      console.log("Country:", response.data.Country);
      console.log("Language(s):", response.data.Language);
      console.log("Plot:", response.data.Plot);
      console.log("Actors:", response.data.Actors);
    });
}

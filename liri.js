require("dotenv").config();
var keys = require("./keys.js");
console.log("API KEYS", keys);
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

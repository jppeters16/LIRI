require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var moment = require('moment');
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var commands = process.argv[2];
//allows spaces in the users input
var input = process.argv.slice(3).join("+");

switch (commands) {
  case "concert-this":
    concertThis(input);
    break;

  case "spotify-this-song":
    spotifyThisSong(input);
    break;

  case "movie-this":
    movieThis(input);
    break;

  case "do-what-it-says":
    doWhatItSays(input);
    break;
}

function concertThis(artist) {
  var query =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
    request(query, function(err, res) {
        if (err) {
          console.log("Error occurred: " + err);
          return err;
        } else {

          const object1 = JSON.parse(res.body);
          // console.log(object1[0].venue.name);
          // console.log(body.body);


  console.log(
    "\nNext Venue: " +
      object1[0].venue.name +
      " at " +
      object1[0].venue.city +
      ", " +
      object1[0].venue.region
  );
  console.log("\nDate of Event: " + moment(object1[0].datetime).format("MMM Do YYYY"));
}
    });
}

function spotifyThisSong(song) {
  if (song === "") {
    song = "The Sign";
  }
  spotify.search({ type: "track", query: song}, function(
    err,
    data
  ) {
    if (err) {
      console.log("Error occurred: " + err);
    } else {
      console.log("\nSong Name: " + data.tracks.items[0].name);
      console.log("\nArtist(s) " + data.tracks.items[0].artists[0].name);
      console.log("\nPreview URL: " + data.tracks.items[0].preview_url);
      console.log("\nAlbum: " + data.tracks.items[0].album.name);
    }
  });
}
function movieThis(movie) {
    console.log(movie);
  if (movie === "") {
    console.log("\nSince you didn't submit a movie, we'll recommend one!");
    console.log(
      "\nIf you haven't watched Mr. Nobody, then you should: <http://www.imdb.com/title/tt0485947/>"
    );
    console.log("\nIt's on Netflix!");
    movie = "Mr. Nobody";
  }

  var movieURL =
    "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
  request(movieURL, function(err, res) {
    if (err) {
      console.log("Error occurred: " + err);
      return err;
    } else {
      const data2 = JSON.parse(res.body);
      console.log(data2);
      console.log("\nThe movie title is: " + data2.Title);
      console.log("\nThe year the movie came out is " + data2.Year);
      console.log(
        "\nThe IMDB Rating of the movie is " + data2.imdbRating
      );
      Object.entries(data2.Ratings[1]).forEach(([key, value]) => {
        console.log(`${key} ${value}`);
      });
      console.log(
        "\nThe Rotten Tomatoes Rating of the movie is " +
          data2.Ratings[1]
      );
      console.log(
        "\nThe country/countries where the movie was produced is/are: " +
          data2.Country
      );
      console.log(
        "\nThe language(s) of the movie is/are: " + data2.Language
      );
      console.log("\nThe plot is: " + data2.Plot);
      console.log("\nThe actors are: " + data2.Actors);
      return;
    }
  });
}

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function (err, data) {
      if (err) {
        console.log("Error occurred: " + err);
      return err;
    } else {
      var dataArray = data.split(",");

      if (dataArray[0] === "spotify-this-song") {
        var songName = dataArray.slice(1).join("+");
        spotifyThisSong(songName);
      }
      if (dataArray[0] === "movie-this") {
        var movieName = dataArray.slice(1).join("+");
        movieThis(movieName);
      }
      if (dataArray[0] === "concert-this") {
        var artistName = dataArray.slice(1).join("+");
        concertThis(artistName);
      }
    }
  });
}

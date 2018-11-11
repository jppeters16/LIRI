require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var commands = process.argv[2];

//allows spaces in the users input
var input = "";
for (i = 3; i < process.argv.length; i++) {
  input += process.argv[i] + " ";
}

switch (commands) {
  case "concert-this":
    concertThis();
    break;

  case "spotify-this-song":
    spotifyThisSong();
    break;

  case "movie-this":
    movieThis();
    break;

  case "do-what-it-says":
    doWhatItSays();
    break;
}

function concertThis(artist) {
  var query =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";
  console.log(
    "\nNext Venue: " +
      body.venue.name +
      "at " +
      body.venue.city +
      ", " +
      body.venue.region
  );
  console.log("\nDate of Event: " + moment(body.datetime).format("MM DD YYYY"));
}

function spotifyThisSong(song) {
  if (song === "") {
    search = "The Sign";
  }
  spotify.search({ type: "track", query: song, limit: 1 }, function(
    err,
    data,
    response
  ) {
    if (err) {
      console.log(err);
    } else {
      console.log("\nArtist(s) " + data.tracks.items[0].artists[0].name);
      console.log("\nSong Name: " + data.tracks.items[0].name);
      console.log("\nPreview URL: " + data.tracks.items[0].preview_url);
      console.log("\nAlbum: " + data.tracks.items[0].album.name);
    }
  });
}
function movieThis(movie) {
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
  request(movieURL, function(err, response, body) {
    if (err) {
      console.log(err);
      return err;
    } else {
      console.log("\nThe movie title is: " + JSON.parse(body).Title);
      console.log("\nThe year the movie came out is " + JSON.parse(body).Year);
      console.log(
        "\nThe IMDB Rating of the movie is " + JSON.parse(body).imdbRating
      );
      console.log(
        "\nThe Rotten Tomatoes Rating of the movie is " +
          JSON.parse(body).Ratings[1]
      );
      console.log(
        "\nThe country/countries where the movie was produced is: " +
          JSON.parse(body).Country
      );
      console.log(
        "\nThe language(s) of the movie is/are: " + JSON.parse(body).Language
      );
      console.log("\nThe plot is: " + JSON.parse(body).Plot);
      console.log("\nThe actors are: " + JSON.parse(body).Actors);
      return;
    }
  });
}

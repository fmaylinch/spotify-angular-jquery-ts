
// Adds AngularJS types
/// <reference path="../typings/angular.d.ts" />

console.log("Setting up angular module!");

let app = angular.module('spotifyApp', []);

app.controller('MainController', function($scope, $http) {

  console.log("Configuring MainController!");

  let settings = {
    method: "GET",
    url: "https://api.spotify.com/v1/search",
    params: {
      q: "dark",
      type: "artist",
      offset: 0,
      limit: 10
    }
  };

  console.log("Sending AJAX call!")

  let promise = $http(settings)

  console.log("Waiting for the promise value...");

  promise.then(function successCallback(response) {

    console.log("Received a successful response!")
    console.log("Response:", response);

    let artists = response.data.artists.items;

    $scope.artists = artists.map(toSimpleArtist);

    /* Two equivalent forms using anonymous functions:

    // Using classic anonymous function
    $scope.artists = artists.map(function(artist) {
      return {
        name: artist.name,
        image: artist.images[0].url
      };
    });

    // Or using the equivalent arrow function
    $scope.artists = artists.map(artist => ({
      name: artist.name,
      image: artist.images[0].url
    }));
    */

  }, function errorCallback(response) {

    console.error("Call failed:", response);
  });
});


// Takes a full artist object (from Spotify)
// and returns a simpler object with just the data we need.
function toSimpleArtist(artist) {
  return {
    name: artist.name,
    imageUrl: artist.images[0].url
  };
}

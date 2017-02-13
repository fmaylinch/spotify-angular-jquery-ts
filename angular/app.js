console.log("Setting up angular module!");
var app = angular.module('spotifyApp', []);
app.controller('MainController', function ($scope, $http) {
    console.log("Configuring MainController!");
    var settings = {
        method: "GET",
        url: "https://api.spotify.com/v1/search",
        params: {
            q: "dark",
            type: "artist",
            offset: 0,
            limit: 10
        }
    };
    console.log("Sending AJAX call!");
    var promise = $http(settings);
    console.log("Waiting for the promise value...");
    promise.then(function successCallback(response) {
        console.log("Received a successful response!");
        console.log("Response:", response);
        var artists = response.data.artists.items;
        $scope.artists = artists.map(toSimpleArtist);
    }, function errorCallback(response) {
        console.error("Call failed:", response);
    });
});
function toSimpleArtist(artist) {
    return {
        name: artist.name,
        imageUrl: artist.images[0].url
    };
}

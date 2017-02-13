
// Adds jQuery types
/// <reference path="../typings/jquery.d.ts" />

console.log("Setting up jQuery things!");

let resultDiv = $("#results");

let settings = {
    method: "GET",
    url: "https://api.spotify.com/v1/search",
    data: {
        q: "dark",
        type: "artist",
        offset: 0,
        limit: 10
    }
};

console.log("Sending AJAX call!")

let result = $.ajax(settings);

console.log("Waiting for the promise value...");

result.done(function (data) {

    console.log("Received a successful response!")
    console.log(data);

    let artists = data.artists.items;

    for (let artist of artists) {
        var artistDiv = createArtistDiv(artist);
        resultDiv.append(artistDiv);
    }
});

result.fail(function(jqXHR, textStatus, errorThrown) {
  console.error("Call failed:", jqXHR);
});

// Creates a JQuery div from the artist
function createArtistDiv(artist: any) : JQuery {

    var name = artist.name;
    var imageUrl = artist.images[0].url;

    var imageElem = $('<img>').addClass("artist-image").attr("src", imageUrl);
    var spanElem = $('<span>').text(name);

    var artistDiv = $('<div>');
    artistDiv.append(imageElem);
    artistDiv.append(spanElem);
    return artistDiv;
}

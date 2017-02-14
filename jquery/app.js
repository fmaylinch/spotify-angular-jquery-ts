console.log("Setting up jQuery things!");
var resultDiv = $("#results");
var settings = {
    method: "GET",
    url: "https://api.spotify.com/v1/search",
    data: {
        q: "dark",
        type: "artist",
        offset: 0,
        limit: 10
    }
};
console.log("Sending AJAX call!");
var promise = $.ajax(settings);
console.log("Setting up callback to get notified when the promise value is resolved");
promise.done(function (data) {
    console.log("Received a successful response!");
    console.log(data);
    var artists = data.artists.items;
    for (var _i = 0, artists_1 = artists; _i < artists_1.length; _i++) {
        var artist = artists_1[_i];
        var artistDiv = createArtistDiv(artist);
        resultDiv.append(artistDiv);
    }
});
promise.fail(function (jqXHR, textStatus, errorThrown) {
    console.error("Call failed:", jqXHR);
});
function createArtistDiv(artist) {
    var name = artist.name;
    var imageUrl = artist.images[0].url;
    var imageElem = $('<img>').addClass("artist-image").attr("src", imageUrl);
    var spanElem = $('<span>').text(name);
    var artistDiv = $('<div>');
    artistDiv.append(imageElem);
    artistDiv.append(spanElem);
    return artistDiv;
}

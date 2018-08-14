$(function() {
    displayShows(searchArray, "searchButton", "#buttonsArea");
})
var searchArray = ["The Office", "Arrested Development", "Seinfeld", "Parks and Recreation", "Friends", "TheFresh Prince of Bel-Air"];
// Change all searchArray to topics

function displayShows(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i=0; i<searchArray.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on("click", ".searchButton", function() {
    $("#shows").empty();
    var show = $(this).data("type");
    // var show = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=viY2ZvKbfUqJapQzLLEj13V9sSxgXKYJ&limit=10";
    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function(response) {
        console.log(response);

        // Performs this function when the request is recieved back from the API
        var results = response.data;
            
            for (var i=0; i<results.length; i++) {
                var searchDiv = $('<div class="search-item">');
                // topicsDiv change on all lines

                // Rating
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);

                // Create variable to animate images 
                var animate = results[i].images.fixed_height.url;
                // images.original.url;

                // Variable for still images
                var still = results[i].images.fixed_height_still.url;
                // images.original_still.url

                // Image tags
                var image = $("<img>");
                image.attr("src", still);
                image.attr("data-still", still);
                image.attr("data-animate", animate);
                image.attr("data-state", "still");
                image.addClass("searchImage");

                // Add images and rating to html div
                searchDiv.append(p);
                searchDiv.append(image);
                
                $("#searches").append(searchDiv);
            }

        })

})

// Add shows that are searched into buttons array
$("#addSearch").on("click", function() {
    var newSearch = $("input").val();
    console.log(newSearch);

    searchArray.push(newSearch);
    displayShows(searchArray, "searchButton", "#buttonsArea");
    return false;
})

$(document).on("click", ".searchImage", function() {
    var state = $(this).data("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})





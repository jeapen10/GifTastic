var topics = ["The Office", "Arrested Development", "Seinfeld", "Parks and Recreation", "Friends", "TheFresh Prince of Bel-Air"];


function displayShows() {

    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=viY2ZvKbfUqJapQzLLEj13V9sSxgXKYJ&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        // Performs this function when the request is recieved back from the API
        var results = response.data;
        console.log(response);

        for (var i = 0; i < 10; i++) {
            var topicDiv = $("<div class='topic'>");

            // Create variables for the rating of gifs
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            // Displaying the rating 
            topicDiv.append(p);

            // Variable for still images
            var imgURL = results[i].images.original_still.url;

            var image = $("<img>").attr("src", imgURL);

            image.addClass("gif");

            image.attr("data-still", imgURL);

            // Create variable to animate images 
            var animate = results[i].images.original.url;

            image.attr("data-animate", animate);

            image.attr("data-state", "still");

            // Append the image to the corresponding topic
            topicDiv.prepend(image);

            $(".gif").on("click", function () {
                // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
                var state = $(this).attr("data-state");

                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });

        }
    })




    function renderButtons() {

        // Empty the shows the div so that new selections will get added to an empty div
        $("#shows").empty();

        // Create a for loop to grab the gifs and information for each button clicked
        for (var i = 0; i < topics.length; i++) {

            var showsDiv = $("<button>");

            showsDiv.addClass("show-btn");

            showsDiv.attr("data-name", topics[i]);

            showsDiv.text(topics[i]);

            $("#shows").append(showsDiv);

        }
    }

    $("#add-show.btn.btn-primary").on("click", function(event) {
        event.preventDefault();

        // Grab the input from the textbox
        var show = $("show-input").val().trim();

        // Adding the TV show from the textbox to our array
        topics.push(show);

        // Call the renderButtons function
        renderButtons();
    });

    // Adding a click event to all elements with a class of "show-btn" 
    $(document).on("click", ".show-btn.btn.btn-info", displayShows);

    // Call the renderButtons function to display the initial buttons
    renderButtons();




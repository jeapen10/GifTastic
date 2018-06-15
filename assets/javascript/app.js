var topics = ["The Office", "Arrested Development", "Seinfeld", "Parks and Recreation", "Friends", "TheFresh Prince of Bel-Air"];


function displayShows() {

    var show = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&api_key=viY2ZvKbfUqJapQzLLEj13V9sSxgXKYJ&limit=10";
    
    $.ajax({
        url: queryURL,
        method: "GET"

    }).done(function(response) {
        // Performs this function when the request is recieved back from the API
            var results = response.data;
            console.log(response);
    
        // Create variables for the rating of gifs
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
    
        // Creates a variable for each image
        var showImage = $("<img>");

        // Create variables for static and animated gifs
        var still = results[i].images.fixed_height_still.url;
        var animate = results[i].images.fixed_height.url;

    
        });        
    }

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

        };

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




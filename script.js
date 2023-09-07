















































































var searchbutton = document.getElementById('search-button')
var movieReview = document.getElementById("")
var search = document.getElementById("search")
var requestUrl = "https://www.omdbapi.com/?apikey=35da7c46&=";
var Release = document.getElementById("release-date")
var genre = document.getElementById("genre")
var cast = document.getElementById("cast")
var plot = document.getElementById("plot")
var reviews = document.getElementById("rotten-tomatoes")
var image = document.getElementById("img")
var title = document.getElementById("movie-title")



var formSubmitHandler = function (event) {
    event.preventDefault();
}

//function getting information from api to display the data to the console and web page
function getApi() {
    var searchText = search.value
    var requestUrl = "https://www.omdbapi.com/?apikey=35da7c46&t=";

    if (searchText.includes(" ")){
        searchText = searchText.replace(" " , "+")
    }
    console.log(requestUrl + searchText)
    //Fetches the URL and request value so the the .then function will respond
    fetch(requestUrl + searchText)
    //.then will return the response json
    .then(function (response) {
        return response.json();
    }) 
    // .then gets its data console.logged
    .then(function (data) {
        console.log(data)
        // Variables recieve the data from the api to display the specific movie information
        Release.textContent = data.Released
        genre.textContent = data.Genre
        cast.textContent = data.Actors
        plot.textContent =data.Plot
        // image.src gets the Poster data
        image.src = data.Poster
        //this line will make the image poster unhidden from css and use the Poster image
        image.style.display = "block"
        //title variable recieves the Title
        title.textContent = data.Title
        //getApi calls the data from the api to match the variables
        getApi1(data)
    })
}

// searchbutton is listening for a click to call the function above
searchbutton.addEventListener('click', function() {
    getApi();
})
// create a new function for recieving the ratings of the movie
function getApi1(data) {
    console.log(reviews.children)
    while(reviews.children[1]) {
        reviews.removeChild(reviews.lastChild)
    }
    // for loop for getting data
    for( var i = 0; i<data.Ratings.length;i++){
        // variables for generating the div containing the title and score of the Review guides
        var element = document.createElement("div");
        var title = document.createElement("h3");
        var score = document.createElement("p");

        title.textContent = data.Ratings[i].Source + ": ";
        score.textContent = data.Ratings[i].Value;
        element.appendChild (title)
        element.appendChild(score)
        reviews.appendChild(element)
    }

}



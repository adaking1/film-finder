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
    }}
var searchText = document.querySelector("#search");
var searchButton = document.querySelector("#search-button");
var ytPlayer = document.querySelector("#player");
var historyList = document.querySelector("#history-list");
var videoId;
var player;

// this function uses youtube's data api to search for the video id of the movie title that was searched
// it then starts the youtube player api call
function searchVideos(video) {
  if (video.includes(" ")) {
    video = video.replace(" ", "+");
  }
    video = video.toLowerCase();
    var key = "&key=AIzaSyDefjXnp5D479WhFVN5_4WXCEdQ79NLuRU";
    var ytUrlPrefix = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=";
    var videoName = video + "+movie+trailer"

    setHistory(video);


    fetch (ytUrlPrefix + videoName + key)
    .then (function(response){
      return response.json();
    })
    .then(function(data){
      videoId = data.items[0].id.videoId;
      if (player){
        player.destroy();
        onYouTubeIframeAPIReady();
      }
      else {
        iFrameAPIcall();
      }
    })
    
    
}

// The next two functions were sourced from youtube's api documentation

// this function loads the youtube iframe api code
function iFrameAPIcall(){
  var tag = document.createElement('script');
  var firstScriptTag = document.getElementsByTagName('script')[0];

  tag.src = "https://www.youtube.com/iframe_api?key=AIzaSyDefjXnp5D479WhFVN5_4WXCEdQ79NLuRU";
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}


// this function is triggered when the youtube iframe api call is complete
// It creates the youtube player in the iframe using the video id retreived from the data api call
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '300',
    width: '540',
    videoId: videoId,
    playerVars: {
      'playsinline': 1
    },
  });
}

function setHistory(data) {
  var storageList = JSON.parse(localStorage.getItem("history"));

  if (storageList === null){
    localStorage.setItem("history", JSON.stringify(searchText.value));
  }
  else {
    storageList = storageList.split(",");
    if (storageList.length > 8){
        storageList.shift();
        localStorage.setItem("history", JSON.stringify(storageList + ", " + searchText.value));
    }
    else {
        localStorage.setItem("history", JSON.stringify(storageList + ", " + searchText.value));
    }
  }
}

function getHistory(){
  if (localStorage.getItem("history") !== null) {
    var storage = JSON.parse(localStorage.getItem("history"));
    var storageList = storage.split(",");
       
    for (var i=0; i<storageList.length; i++) {
        var history = document.createElement("li");
        var currentTitle = storageList[i];
        history.classList.add("history");
        history.textContent = currentTitle;
        historyList.appendChild(history);
        history.addEventListener("click", function(event){
            searchText.value = event.target.textContent;
            searchVideos(event.target.textContent);
        });
    }   
  }
}















getHistory();


searchButton.addEventListener("click", function(){
  searchVideos(searchText.value);
});

document.addEventListener("keypress", function(event){
  if (event.key === "Enter"){
    searchVideos(searchText.value);
  }
});

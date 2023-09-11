var searchButton = document.getElementById('search-button')
var search = document.getElementById("search")
var requestUrl = "https://www.omdbapi.com/?apikey=35da7c46&=";
var release = document.getElementById("release-date")
var genre = document.getElementById("genre")
var cast = document.getElementById("cast")
var plot = document.getElementById("plot")
var reviews = document.getElementById("reviews")
var image = document.getElementById("img")
var title = document.getElementById("movie-title")
var videoId;
var player;
var historyList = document.querySelector("#history-list");
var ytPlayer = document.querySelector("#player");
var sections = document.querySelector(".info-section");
var opening = document.querySelector("#opening-page");
var trailer = document.querySelector("#youtube-trailer");
var details = document.querySelector("#movie-details");
var titleCard = document.querySelector("#title-card");
var openingTitle = document.querySelector("#opening-title");
var openingText = document.querySelector("#opening-text");
var aside = document.querySelector("#aside");


//function getting information from api to display the data to the console and web page
function getApi() {
    var searchText = search.value
    var requestUrl = "https://www.omdbapi.com/?apikey=35da7c46&t=";

    if (searchText.includes(" ")){
        searchText = searchText.replace(" " , "+")
    }
    //Fetches the URL and request value so the the .then function will respond
    fetch(requestUrl + searchText)
    //.then will return the response json
    .then(function (response) {
        return response.json();
    }) 

    .then(function (data) {
      if (data.Error) {
        if (details.style.display === "block"){
          details.style.display = "none";
          reviews.style.display = "none";
          titleCard.style.display = "none";
          trailer.style.display = "none";
          opening.style.display = "block";
        }
        openingTitle.textContent = data.Error;
        openingText.style.display = "none";
      }
      else {
        opening.style.display = "none";
        details.style.display = "block";
        reviews.style.display = "block";
        titleCard.style.display = "grid";
      
        // Variables recieve the data from the api to display the specific movie information
        
        release.textContent = data.Released;
        genre.textContent = data.Genre;
        cast.textContent = data.Actors;
        plot.textContent = data.Plot;
          // image.src gets the Poster data
        image.src = data.Poster;
          //this line will make the image poster unhidden from css and use the Poster image
        image.style.display = "block"
          //title variable recieves the Title
        title.textContent = data.Title;

        setHistory(data);
        searchVideos(data.Title + "+" + data.Year);
          
        getApi1(data)
      }
    })
}


// create a new function for recieving the ratings of the movie
function getApi1(data) {
    while(reviews.children[1]) {
        reviews.removeChild(reviews.lastChild)
    }
    // for loop for getting data
    for( var i = 0; i<data.Ratings.length;i++){
        // variables for generating the div containing the title and score of the Review guides
        var element = document.createElement("div");
        var title = document.createElement("h4");
        var score = document.createElement("p");

        title.textContent = data.Ratings[i].Source + ": ";
        score.textContent = data.Ratings[i].Value;
        element.appendChild (title)
        element.appendChild(score)
        reviews.appendChild(element)
    }}


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
  
  tag.src = "https://www.youtube.com/iframe_api?key=AIzaSyDefjXnp5D479WhFVN5_4WXCEdQ79NLuRU";
  var firstScriptTag = document.getElementsByTagName('script')[0];
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
    localStorage.setItem("history", JSON.stringify(data.Title));
  }
  else {
    storageList = storageList.split(",");
    if (storageList.length > 7){
        storageList.shift();
        localStorage.setItem("history", JSON.stringify(storageList + "," + data.Title));
    }
    else {
        localStorage.setItem("history", JSON.stringify(storageList + "," + data.Title));
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
          search.value = event.target.textContent;
          getApi();
        });
    }   
  }
  else {
    aside.style.display = "none";
  }
}


getHistory();

// searchbutton is listening for a click to call the function above
searchButton.addEventListener('click', function() {
  getApi();
});

document.addEventListener("keypress", function(event){
  if (event.key === "Enter"){
    getApi();
  }
});

var searchText = document.querySelector("#search");
var searchButton = document.querySelector("#search-button");
var ytPlayer = document.querySelector("#player");
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
    height: '390',
    width: '640',
    videoId: videoId,
    playerVars: {
      'playsinline': 1
    },
  });
}


searchButton.addEventListener("click", function(){
  searchVideos(searchText.value);
});

document.addEventListener("keypress", function(event){
  if (event.key === "Enter"){
    searchVideos(searchText.value);
  }
});
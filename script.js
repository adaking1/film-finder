var searchText = document.querySelector("#search");
var searchButton = document.querySelector("#search-button");
var ytPlayer = document.querySelector("#player");
var videoId

function searchVideos(video) {
  if (video.includes(" ")) {
    video = video.replace(" ", "+");
  }
    video = video.toLowerCase();
    var key = "&key=AIzaSyDefjXnp5D479WhFVN5_4WXCEdQ79NLuRU";
    var ytUrlPrefix = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=";
    var videoName = video + "+trailer"

    console.log(video);
    console.log(ytUrlPrefix + videoName );

    fetch (ytUrlPrefix + videoName + key)
    .then (function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.items[0].id.videoId);
        videoId = data.items[0].id.videoId;
        console.log(videoId);
        if (player){
          player.destroy();
          console.log("DESTROY");
          videoPlay(videoId);
        }
        else {
          iFrameAPIcall();
        }
    })
    
    
}

function iFrameAPIcall(){
// 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement('script');
  var firstScriptTag = document.getElementsByTagName('script')[0];

  tag.src = "https://www.youtube.com/iframe_api?key=AIzaSyDefjXnp5D479WhFVN5_4WXCEdQ79NLuRU";
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

}

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
  console.log("Ready");
  console.log(videoId);
  videoPlay(videoId);
}

function onPlayerReady(event) {
  event.target.playVideo();
}

  var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}


var player;
function videoPlay(id){
  console.log(player);
  console.log(id);
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: id,
    playerVars: {
      'playsinline': 1
    },
    events: {
      // 'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}


searchButton.addEventListener("click", function(){
  searchVideos(searchText.value);
});
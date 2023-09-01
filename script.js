var searchText = document.querySelector("#search");

function searchVideos(video) {
    // var key = "AIzaSyDefjXnp5D479WhFVN5_4WXCEdQ79NLuRU";
    var ytUrlPrefix = "";
    var videoName = video + "+trailer"

    console.log(ytUrlPrefix + videoName );

    fetch ("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=dio&key=AIzaSyDefjXnp5D479WhFVN5_4WXCEdQ79NLuRU")
    .then (function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    
// //     var results = YouTube.Search.list('id,snippet', {q: video + " trailer", maxResults:1});

// //     .then 

// //     for(var i in results.items) {
// //         var item = results.items[i];
// //         Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
// //       }
}


// function authenticate() {
//     return gapi.auth2.getAuthInstance()
//         .signIn({scope: "https://www.googleapis.com/auth/youtube.force-ssl"})
//         .then(function() { console.log("Sign-in successful"); },
//               function(err) { console.error("Error signing in", err); });
//   }
//   function loadClient() {
//     gapi.client.setApiKey("YOUR_API_KEY");
//     return gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
//         .then(function() { console.log("GAPI client loaded for API"); },
//               function(err) { console.error("Error loading GAPI client for API", err); });
//   }
//   // Make sure the client is loaded and sign-in is complete before calling this method.
//   function execute() {
//     return gapi.client.youtube.search.list({
//       "part": [
//         "snippet"
//       ],
//       "order": "viewCount",
//       "q": "Superman trailer",
//       "type": [
//         "video"
//       ],
//       "videoDefinition": "high"
//     })
//         .then(function(response) {
//                 // Handle the results here (response.result has the parsed body).
//                 console.log("Response", response);
//               },
//               function(err) { console.error("Execute error", err); });
//   }
//   gapi.load("client:auth2", function() {
//     gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
//     });




// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api?key=AIzaSyDefjXnp5D479WhFVN5_4WXCEdQ79NLuRU";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '76WeEuR0qk4',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
    event.target.playVideo();
  }

var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

searchVideos("Superman");
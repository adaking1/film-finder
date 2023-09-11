# weather-dashboard

## Link

[https://adaking1.github.io/weather-dashboard/](https://adaking1.github.io/film-finder/)

## Description

This application was created for movie enthusiasts to search for any movie and find its trailer, movie poster, reviews, information about the cast, genre, synopsis, and release date. This project makes use of Foundation Framework, YouTube's Player API and Data API, and OMDb's API.


## Usage

Enter the name of a movie into the search bar at the top right of the screen. When the search button is clicked, or enter is pressed, the movie poster and trailer are displayed on the page. Underneath that, the cast, genre, synopsis, and release date will be displayed. And underneath that, the reviews for the movie will be displayed. The user's search history will be saved to local storage and the last 10 searches in the history will be displayed on the screen.

## Citations

This project used references provided by Uconn's Web Development Bootcamp at this repo: https://git.bootcampcontent.com/University-of-Connecticut/CONN-VIRT-FSF-PT-07-2023-U-LOLC.git.
The functions for YouTube's video player were sourced from YouTubes player API documentation.
The YouTube Data API was used to get the video ID of the searched movie. That ID is input into the video player, and the correct video renders on the screen.
The OMDb API is used to get all of the information about the movie that is displayed on the screen. The movie title from this API is used to save to local storage, as well as used to search for video ID. This is done to make sure the movie information that OMDb is returning is for the same exact movie that will be rendered to the video player.
Foundation Framework was used to create a responsive header and search history container.

## License

This project is not protected under any license.

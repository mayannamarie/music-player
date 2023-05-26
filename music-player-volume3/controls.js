//MAIN IS OUR BACKEND JAVASCRIPT - PULL IN MODULES FROM NODE HERELIKE URL for finding file path 
//GET LIST OF FILES , extract info FROM THAT CREATE LIST OF DATA USING ARRAY with properties like (filename etc)
//use simple select element for now to have the (value aka file url) then load that into your audio element and play it
//theres helpers like - url path to file url
// I NEED TO DO AN ARRAY INSTEAD
//SEND THAT TO THE FRONT END 


let index_current_song = 0;
let progressBar = document.getElementById("progressBar");
let currentTime_label = document.getElementById("current-Time");
let musicArray;

function sendMusicArray(in_musicArray) {
    //accepting array and setting it to global variable
    musicArray = in_musicArray;
}

let currentlySelectedIndex;
//this function runs after we click a song
//accepts the tracks full metadata and index for song
function setDetails(selectedTrackMetadata, in_index) {
    currentlySelectedIndex = in_index;
    console.log(selectedTrackMetadata.title)
    //TODO set album cover
    let cover_photo = document.getElementById("cover-photo");
    cover_photo.src = "data:" + selectedTrackMetadata.pictureFormat + ";base64, " + selectedTrackMetadata.picture;

    //TODO set artist name
    let artist_name = document.getElementById("artist-name");
    artist_name.innerHTML = selectedTrackMetadata.artist;

    //TODO set song name
    let audio_name = document.getElementById("audio-name");
    audio_name.innerHTML = selectedTrackMetadata.title;

    //TODO  set album name
    let album_name = document.getElementById("album-name");
    album_name.innerHTML = selectedTrackMetadata.album;

    //TODO set duration
    //      TODO - set TOTAL duration and format it to --:--
    let total_duration = document.getElementById("song-durationTime");
    //      setting total durations value to be formatted 
    total_duration.innerHTML = formatDuration(selectedTrackMetadata.duration);

    //      TODO - set CURRENT duration as song plays & format it --:--
    let current_duration = document.getElementById("current-Time");
    current_duration.innerHTML = "00:00";

    //TODO play song
    playSong(selectedTrackMetadata.path);
}

let song, songRow;

//TODO play a song
// arg is accepting the fullpath
function playSong(in_fullpath) {
    if (song) { //if song exist pause it
        song.pause();
        song.removeEventListener('timeupdate', updateCurrentTime);
    }
    song = new Audio(in_fullpath);
    song.play();
    styleRowClicked();   //calling styling function
    //time update event triggering progressbar
    song.addEventListener('timeupdate', updateCurrentTime, false);
}
//TODO play previous song
function playPreviousSong() {
    if (song) {   //if song exists
        let maximumIndex = musicArray.length - 1;
        if (currentlySelectedIndex == 0) {
            console.log("running previous");
            //TODO decremenet the currently selected index then play it          
            currentlySelectedIndex = maximumIndex;        
        } else {
            currentlySelectedIndex--; 
        }
        console.log("previous selected index" + musicArray[currentlySelectedIndex].title);
        playSong(musicArray[currentlySelectedIndex].path);
    }
}

//TODO play next song 
function playNextSong() {
    console.log("running next");
    if (song) {  //if song exists
       let maximumIndex = musicArray.length - 1;  //set max-index to the last song 
        if (currentlySelectedIndex == maximumIndex) {
            //if we're on last song, go to first song
            currentlySelectedIndex = 0;
        } else { //otherwise increment 
            currentlySelectedIndex++;
        }

        //TODO increment the currently selected index then play it
        
        //reference to our music array
        console.log("next selected index" + musicArray[currentlySelectedIndex].title);
        //play song of te currently selected index's path
        playSong(musicArray[currentlySelectedIndex].path);
    }
}


//TODO pause song 
function playPause() {
    console.log("running pause");
    if (song) {  //if song exists
        if (song.paused) {
            song.play()
        } else {
            song.pause()
        }
    }
}

function styleRowClicked() {
    //TODO format TR 
    if (songRow) {
        songRow.style.backgroundColor = "";
    }
    songRow = document.getElementById(musicArray[currentlySelectedIndex].path);
    songRow.style.backgroundColor = "darkgrey";
}

function updateCurrentTime() {
    currentTime_label.innerHTML = formatDuration(song.currentTime);
    progressBar.value = (song.currentTime / song.duration) * 100;
}

//formating song length for minutes and seconds 
function formatDuration(value) {
    let minutes = Math.floor(value / 60);
    let seconds = value % 60;
    return String(minutes).padStart(2, '0') + ":" + String(~~seconds).padStart(2, '0');
}


// function playPreviousSong() {
//     if (song) {   //if song exists
//         let maximumIndex = musicArray.length - 1;
//         if (currentlySelectedIndex > 0) {
//             console.log("running previous");

            
//             //TODO decremenet the currently selected index then play it
//             currentlySelectedIndex--;
//             console.log("previous selected index" + musicArray[currentlySelectedIndex].title);
//             playSong(musicArray[currentlySelectedIndex].path);
//         }
//     }
// }
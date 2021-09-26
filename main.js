let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Floating Castle",
    artist: "Purrple Cat",
    image: "images/beat.jpg",
    path: "musics/floating-castle.mp3"
  },
  {
    name: "And So It Begins",
    artist: "Artificial.Music",
    image: "images/Beat.jpg",
    path: "musics/and-so-it-begins.mp3"
  },
  {
    name: "Herbal Tea",
    artist: "Artificial.Music",
    image: "images/Sad.jpg",
    path: "musics/herbal-tea.mp3",
  },
  {
    name: "Equinox",
    artist: "Purrple Cat",
    image: "images/Ambient.jpg",
    path: "musics/equinox.mp3",
  },
  {
    name: "Latte",
    artist: "Yoitrax",
    image: "images/Beat.jpg",
    path: "musics/latte.mp3",
  },
  {
    name: "Dreams Come True",
    artist: "Purrple Cat",
    image: "images/Beat.jpg",
    path: "musics/dreams-come-true.mp3",
  },
  {
    name: "On My Way",
    artist: "Lofi-Study-Music",
    image: "images/Jazz.jpg",
    path: "musics/on-my-way.mp3",
  },
  {
    name: "Calm Waters",
    artist: "Purrple Cat",
    image: "images/Ambient.jpg",
    path: "musics/calm-waters.mp3",
  },
  {
    name: "Morning Routine",
    artist: "Lofi Study Music",
    image: "images/Beat.jpg",
    path: "musics/morning-rountine.mp3",
  },
  {
    name: "Afternoon Nap",
    artist: "Lofi Study Music",
    image: "images/Jazz.jpg",
    path: "musics/afternoon-nap.mp3",
  },
  {
    name: "Midnight Stroll",
    artist: "Lofi Study Music",
    image: "images/Beat.jpg",
    path: "musics/midnight-stroll.mp3",
  },
  {
    name: "Merry Bay",
    artist: "Lofi Study Music",
    image: "images/Guitar.jpg",
    path: "musics/merry-bay.mp3",
  },
  {
    name: "Fragile",
    artist: "Keys of Moon",
    image: "images/Aesthetic.jpg",
    path: "musics/fragile.mp3",
  },
  {
    name: "Bedtime After A Coffee",
    artist: "Barradeen",
    image: "images/beat.jpg",
    path: "musics/bedtime-after-a-acoffe.mp3",
  },
  {
    name: "Stardust",
    artist: "JSH",
    image: "images/Beat.jpg",
    path: "musics/stardust.mp3",
  },
  {
    name: "Underwater",
    artist: "LiQWYD",
    image: "images/Dance.jpg",
    path: "musics/underwater.mp3",
  },
  {
    name: "Water Wood & Stone",
    artist: "Audionautix",
    image: "images/Beat.jpg",
    path: "musics/water-wood.mp3",
  },
  {
    name: "You Know Why",
    artist: "Loyalty Freak Music",
    image: "images/Beat.jpg",
    path: "musics/you-know-why.mp3",
  },
  {
    name: "TRIPPIN COFFEE",
    artist: "Audionautix",
    image: "images/Beat.jpg",
    path: "musics/tripping-coffe.mp3",
  },
  {
    name: "Still Awake",
    artist: "[Lofi Study Music]",
    image: "images/Aesthetic.jpg",
    path: "musics/still-awake.mp3",
  },

];

// function random_bg_color() {

//   // Get a number between 64 to 256 (for getting lighter colors)
//   let red = Math.floor(Math.random() * 256) + 64;
//   let green = Math.floor(Math.random() * 256) + 64;
//   let blue = Math.floor(Math.random() * 256) + 64;

//   // Construct a color withe the given values
//   let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

//   // Set the background to that color
//   document.body.style.background = bgColor;
// }

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  // random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

const audio = document.querySelector("audio");
const progressEl = document.querySelector('input[type="range"]');

const vinyl1 = document.querySelector(".vinyl1");
const vinyl2 = document.querySelector(".vinyl2");
const title = document.querySelector("#title");
const subTitle = document.querySelector("#subTitle");
const cover = document.querySelector("#cover");
const download = document.querySelector("#download");
const volumeSlider = document.querySelector(".volume");

const previousButton = document.querySelector("#previous");
const playPauseButton = document.querySelector("#play-pause");
const nextButton = document.querySelector("#next");

const songList = document.querySelector(".song-list");

let timer = document.querySelector("#timer");
let update = setInterval(function () {
  let mins = Math.floor(audio.currentTime / 60);
  let secs = Math.floor(audio.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  timer.innerHTML = mins + ":" + secs;
}, 10);

let songArray = [];
let songHeading = "";
let songIndex = "";
let isPlaying = false;
let mouseDownOnSlider = false;

let playlist = document.querySelector("#playlist");
let playlistAll = document.querySelector(".playlist");

if (!songIndex) {
  document.getElementsByClassName("player")[0].style.display = "none";
  playlistAll.classList.add("playlist-onload");
}

function init() {
  fetch("/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        let sound = data[i];

        playlist.innerHTML += `
        
           <li data-src="/data/sounds/${sound.title}.mp3" data-name="${sound.title}" data-artist="${sound.artist}" 
                        data-index="${sound.id}"><div> <div class="songName">${sound.title}</div><div class="artistName">${sound.artist}</div></div><div class="duration">${sound.duration} &thinsp; &thinsp;<div class="img-duration"><img src="/data/icons/play.svg" width="24px" alt="play"></div></div></li>`;
      }
      songList.addEventListener(
        "click",
        function (e) {
          document.getElementsByClassName("player")[0].style.display = "flex";
          playlistAll.classList.remove("playlist-onload");
          songIndex = e.target.closest("li").getAttribute("data-index");
          console.log(songIndex);
          loadAudio();
          playAudio();
        },
        false
      );
      function playAudio() {
        audio.play();
        playPauseButton.querySelector("#pause").classList.remove("hidden");
        playPauseButton.querySelector("#play").classList.add("hidden");
        isPlaying = true;
        vinyl1.classList.remove("vinyl1-paused");
        vinyl1.classList.add("vinyl1-animation");
        vinyl2.classList.remove("vinyl2-paused");
        vinyl2.classList.add("vinyl2-animation");
        animate();
        document.getElementById("equalizer").style.display = "block";
      }

      function pauseAudio() {
        audio.pause();
        playPauseButton.querySelector("#play").classList.remove("hidden");
        playPauseButton.querySelector("#pause").classList.add("hidden");
        isPlaying = false;
        vinyl1.classList.add("vinyl1-paused");
        vinyl2.classList.add("vinyl2-paused");
        document.getElementById("equalizer").style.display = "none";
      }

      function previousSong() {
        songIndex--;

        if (songIndex < 0) {
          songIndex = songArray.length - 1;
        }
        loadAudio();
        playAudio();
      }

      function nextSong() {
        songIndex++;

        if (songIndex > songArray.length - 1) {
          songIndex = 0;
        }
        loadAudio();
        playAudio();
      }

      playPauseButton.addEventListener(
        "click",
        function () {
          if (isPlaying) {
            pauseAudio();
            vinyl1.classList.add(".paused");
            vinyl2.classList.add(".paused");
          } else {
            playAudio();
            vinyl1.classList.remove(".paused");
            vinyl2.classList.remove(".paused");
          }
        },
        false
      );

      previousButton.addEventListener(
        "click",
        function () {
          previousSong();
        },
        false
      );

      nextButton.addEventListener(
        "click",
        function () {
          nextSong();
        },
        false
      );
      audio.addEventListener(
        "ended",
        function () {
          nextSong();
        },
        false
      );

      volumeSlider.addEventListener(
        "input",
        function () {
          audio.volume = volumeSlider.value / 100;
        },
        false
      );

      audio.addEventListener("timeupdate", () => {
        if (!mouseDownOnSlider) {
          progressEl.value = (audio.currentTime / audio.duration) * 100;
        }
      });

      progressEl.addEventListener("change", () => {
        const pct = progressEl.value / 100;
        audio.currentTime = (audio.duration || 0) * pct;
      });

      progressEl.addEventListener("mousedown", () => {
        mouseDownOnSlider = true;
      });

      progressEl.addEventListener("mouseup", () => {
        mouseDownOnSlider = false;
      });
      function loadAudio() {
        audio.src = songArray[songIndex];

        let songListItems = songList.getElementsByTagName("li");
        songHeading = songListItems[songIndex].getAttribute("data-name");
        songSubHeading = songListItems[songIndex].getAttribute("data-artist");

        title.innerText = songHeading;
        subTitle.innerHTML = `par ` + songSubHeading;
        cover.innerHTML = `<img src="/data/covers/${songIndex}.png" alt="${songHeading}" class="cover">`;
        download.innerHTML = `<a href="/data/sounds/${songHeading}.mp3" download>Télécharger ce titre! &#x1F4BF;</a>`;
        for (i = 0; i < songListItems.length; i++) {
          songListItems[i].classList.remove("active");
        }

        songList.getElementsByTagName("li")[songIndex].classList.add("active");
      }
      function loadSongs() {
        let songs = songList.getElementsByTagName("li");
        for (i = 0; i < songs.length; i++) {
          songArray.push(songs[i].getAttribute("data-src"));
        }

        loadAudio();
      }

      loadSongs();
    });
}
init();

// mode

let toggle = document.getElementById("theme-toggle");

let storedTheme = localStorage.getItem("theme") || "vintage";
if (storedTheme)
  document.documentElement.setAttribute("data-theme", storedTheme);

if (storedTheme === "modern") {
  toggle.innerHTML = `Thème actuel: moderne, changer pour: vintage`;
  document.getElementById("vinyl1").src = "/data/cd.png";
  document.getElementById("vinyl2").src = "/data/cd.png";
  document.getElementById("previousImg").src =
    "/data/icons/modern/previous.svg";
  document.getElementById("play").src = "/data/icons/modern/play.svg";
  document.getElementById("pause").src = "/data/icons/modern/pause.svg";
  document.getElementById("nextImg").src = "/data/icons/modern/next.svg";
  document.getElementById("volume1").src = "/data/icons/modern/volume.svg";
  document.getElementById("volume2").src = "/data/icons/modern/volume.svg";
  document.getElementById("gif").src = "/data/songs modern.gif";
}

toggle.onclick = function () {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let targetTheme = "vintage";

  if (currentTheme === "vintage") {
    targetTheme = "modern";
  }

  document.documentElement.setAttribute("data-theme", targetTheme);
  localStorage.setItem("theme", targetTheme);
  if (currentTheme === "vintage") {
    toggle.innerHTML = `Thème actuel: moderne, changer pour: vintage`;
    document.getElementById("vinyl1").src = "/data/cd.png";
    document.getElementById("vinyl2").src = "/data/cd.png";
    document.getElementById("previousImg").src =
      "/data/icons/modern/previous.svg";
    document.getElementById("play").src = "/data/icons/modern/play.svg";
    document.getElementById("pause").src = "/data/icons/modern/pause.svg";
    document.getElementById("nextImg").src = "/data/icons/modern/next.svg";
    document.getElementById("volume1").src = "/data/icons/modern/volume.svg";
    document.getElementById("volume2").src = "/data/icons/modern/volume.svg";
    document.getElementById("gif").src = "/data/songs modern.gif";
  } else {
    toggle.innerHTML = `Thème actuel: vintage, changer pour: moderne`;
    document.getElementById("vinyl1").src = "/data/vinyl.png";
    document.getElementById("vinyl2").src = "/data/vinyl.png";
    document.getElementById("previousImg").src =
      "/data/icons/vintage/previous.png";
    document.getElementById("play").src = "/data/icons/vintage/play.png";
    document.getElementById("pause").src = "/data/icons/vintage/pause.png";
    document.getElementById("nextImg").src = "/data/icons/vintage/next.png";
    document.getElementById("volume1").src = "/data/icons/vintage/volume.svg";
    document.getElementById("volume2").src = "/data/icons/vintage/volume.svg";
    document.getElementById("gif").src = "/data/songs vintage.gif";
  }
};

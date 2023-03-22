const audio = document.querySelector("audio");
const progressEl = document.querySelector('input[type="range"]');

const vinyl1 = document.querySelector(".vinyl1");
const vinyl2 = document.querySelector(".vinyl2");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");
const download = document.querySelector("#download");
const volumeSlider = document.querySelector(".slider");

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
let songIndex = 0;
let isPlaying = false;
let mouseDownOnSlider = false;

let playlist = document.querySelector("#playlist");

function init() {
  fetch("/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      for (let i = 0; i < data.length; i++) {
        let sound = data[i];

        playlist.innerHTML += `
           <li data-src="/data/sounds/${sound.id}.mp3" data-name="${sound.title}"
                        data-index="${sound.id}"><span class="songName">${sound.title}</span><span>${sound.duration}</span></li>`;
      }
      function loadAudio() {
        audio.src = songArray[songIndex];

        let songListItems = songList.getElementsByTagName("li");
        songHeading = songListItems[songIndex].getAttribute("data-name");

        title.innerText = songHeading;
        cover.innerHTML = `<img src="/data/covers/${songIndex}.png" alt="" class="cover">`;
        download.innerHTML = `<a href="/data/sounds/${songIndex}.mp3" download>Télécharger ce titre!</a>`;
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
      function playAudio() {
        audio.play();
        playPauseButton.querySelector("#pause").classList.remove("hidden");
        playPauseButton.querySelector("#play").classList.add("hidden");
        isPlaying = true;
        vinyl1.classList.remove("vinyl1-paused");
        vinyl1.classList.add("vinyl1-animation");
        vinyl2.classList.remove("vinyl2-paused");
        vinyl2.classList.add("vinyl2-animation");
      }

      function pauseAudio() {
        audio.pause();
        playPauseButton.querySelector("#play").classList.remove("hidden");
        playPauseButton.querySelector("#pause").classList.add("hidden");
        isPlaying = false;
        vinyl1.classList.add("vinyl1-paused");
        vinyl2.classList.add("vinyl2-paused");
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

      songList.addEventListener(
        "click",
        function (e) {
          songIndex = e.target.closest("li").getAttribute("data-index");
          loadAudio();
          playAudio();
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
    });
}
init();

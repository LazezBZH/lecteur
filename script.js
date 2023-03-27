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
let randomChoice = false;
let randomBtn = document.getElementById("random");

console.log(randomChoice);
function init() {
  fetch("/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);

      for (let i = 0; i < data.length; i++) {
        let sound = data[i];

        playlist.innerHTML += `
        
           <li data-src="/data/sounds/${sound.title}.mp3" data-name="${sound.title}" data-artist="${sound.artist}" 
                        data-index="${sound.id}"><div> <div class="songName">${sound.title}</div><div class="artistName">${sound.artist}</div></div><div class="duration">${sound.duration} &thinsp; &thinsp;<div class="img-duration"><img src="/data/icons/play.svg" width="24px" alt="play"></div></div></li>`;
      }

      songList.addEventListener(
        "click",
        function (e) {
          randomChoice = false;
          randomBtn.classList.remove("random-clign");
          console.log(randomChoice);
          document.getElementsByClassName("player")[0].style.display = "flex";
          playlistAll.classList.remove("playlist-onload");
          songIndex = e.target.closest("li").getAttribute("data-index");
          console.log(songIndex);
          loadAudio();
          playAudio();
        },
        false
      );
      randomBtn.addEventListener("click", doRandom);
      function doRandom() {
        setRandom();
        playRandom();
        randomBtn.classList.add("random-clign");
        playlistAll.classList.remove("playlist-onload");
      }
      function setRandom() {
        randomChoice = true;
        console.log(randomChoice);
      }
      function playRandom() {
        const randomIndex = Math.floor(Math.random() * data.length);
        console.log(randomIndex);
        document.getElementsByClassName("player")[0].style.display = "flex";
        songIndex = randomIndex;
        loadAudio();
        playAudio();
      }
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
          aPreviousSong();
        },
        false
      );

      nextButton.addEventListener(
        "click",
        function () {
          aNextSong();
        },
        false
      );
      audio.addEventListener(
        "ended",
        function () {
          aNextSong();
        },
        false
      );
      function aPreviousSong() {
        if (!randomChoice) {
          previousSong();
        } else playRandom();
      }
      function aNextSong() {
        if (!randomChoice) {
          nextSong();
        } else playRandom();
      }
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
        var width = screen.width;
        if (width >= 810) {
          songList.getElementsByTagName("li")[songIndex].scrollIntoView();
        }
      }
      function loadSongs() {
        let songs = songList.getElementsByTagName("li");
        for (i = 0; i < songs.length; i++) {
          songArray.push(songs[i].getAttribute("data-src"));
        }
        console.log("songarray", songArray);

        loadAudio();
      }

      loadSongs();
    });
}

init();

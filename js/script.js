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
const closeButton = document.querySelector("#close");

const songList = document.querySelector(".song-list");
let songListItems = songList.getElementsByTagName("li");

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

let randomChoice = false;
let randomBtn = document.getElementById("random");
let randomNums = [];

console.log("random choice:", randomChoice);

//uniquement la playlist visible au chargement du site
if (!songIndex) {
  document.getElementsByClassName("player")[0].style.display = "none";
  playlistAll.classList.add("playlist-onload");
}

function init() {
  fetch("/data/data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);

      for (let i = 0; i < data.length; i++) {
        let sound = data[i];

        playlist.innerHTML += `
        
           <li data-src="/data/sounds/${sound.title}.mp3" data-name="${sound.title}" data-artist="${sound.artist}" 
                        data-index="${sound.id}"><div> <div class="song-name">${sound.title}</div><div class="artist-name">${sound.artist}</div></div><div class="duration">${sound.duration} &thinsp; &thinsp;<div class="img-duration"><img src="/data/icons/play.svg" width="24px" alt="play"></div></div></li>`;
      }

      //démarrer le lecteur au clic sur la playlist
      songList.addEventListener(
        "click",
        function (e) {
          randomChoice = false;
          randomNums = [];
          randomBtn.classList.remove("random-clign");
          console.log("random choice:", randomChoice);
          document.getElementsByClassName("player")[0].style.display = "flex";
          playlistAll.classList.remove("playlist-onload");
          songIndex = e.target.closest("li").getAttribute("data-index");
          console.log("index song playing:", songIndex);
          loadAudio();
          playAudio();
        },
        false
      );
      //choix mode random
      randomBtn.addEventListener("click", doRandom);
      function doRandom() {
        setRandom();
        playRandom();
        randomBtn.classList.add("random-clign");
        playlistAll.classList.remove("playlist-onload");
      }
      function setRandom() {
        randomChoice = true;
        console.log("random choice:", randomChoice);
      }
      //obtenir un index random et affecter cette valeur à songIndex
      // random index générés stockés dans un tableau randomNums
      //si le prochain random index figure dans ce tableau on en génère un nouveau
      //si le tableau contient tous les titres on le vide
      function playRandom() {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        const randomIndex = Math.floor(Math.random() * data.length);
        console.log("index random song playing:", randomIndex);
        if (randomNums.length == 12) {
          randomNums = [];
        }
        if (randomNums.includes(randomIndex)) {
          playRandom();
        } else {
          randomNums.push(randomIndex);

          console.log("index song(s) allready played:", randomNums);
          document.getElementsByClassName("player")[0].style.display = "flex";
          songIndex = randomIndex;
          loadAudio();
          playAudio();
        }
      }

      //player et controls
      function playAudio() {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
      closeButton.addEventListener("click", close);
      function close() {
        audio.pause();
        audio.currentTime = 0;
        document.getElementsByClassName("player")[0].style.display = "none";
        playlistAll.classList.add("playlist-onload");
        vinyl1.classList.add("vinyl1-paused");
        vinyl2.classList.add("vinyl2-paused");
        isPlaying = false;
        for (i = 0; i < songListItems.length; i++) {
          songListItems[i].classList.remove("active");
        }
        songList.getElementsByTagName("li")[0].scrollIntoView();
        randomBtn.classList.remove("random-clign");
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
      //fonctionnement différent des boutons next et prévious si mode aléatoire sélectionné
      function aPreviousSong() {
        if (!randomChoice) {
          previousSong();
        } else if (randomChoice) playRandom();
      }
      function aNextSong() {
        if (!randomChoice) {
          nextSong();
        } else if (randomChoice) playRandom();
      }

      //volume et barre de progression
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

      //définir la source audio et l'affichage dans le player
      //   let songListItems = songList.getElementsByTagName("li");
      function loadAudio() {
        audio.src = songArray[songIndex];

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
      //générer playlist d'après le json
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

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
  document.getElementById("closeImg").src = "/data/icons/modern/close.png";
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
    document.getElementById("closeImg").src = "/data/icons/modern/close.png";
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
    document.getElementById("closeImg").src = "/data/icons/vintage/close.png";
    document.getElementById("volume1").src = "/data/icons/vintage/volume.svg";
    document.getElementById("volume2").src = "/data/icons/vintage/volume.svg";
    document.getElementById("gif").src = "/data/songs vintage.gif";
  }
};

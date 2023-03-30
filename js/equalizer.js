// Définir les dimensions du svg
// Set svg dimensions
let width = 120;
let height = 50;
let myEqualizer = document.getElementById("equalizer");

// Créer l'échelle pour les données
// Create the scale for the data
let y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

// Créer le svg
// Create the svg
let svg = d3
  .select("#equalizer")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Créer les barres de l'égaliseur
// Create the equalizer bars
let bars = svg
  .selectAll(".equalizer-bar")
  .data([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  .enter()
  .append("rect")
  .attr("class", "equalizer-bar")
  .attr("x", function (d, i) {
    return i * 10 + 10;
  })
  .attr("y", function (d) {
    return y(d);
  })
  .attr("width", 5)
  .attr("height", function (d) {
    return height - y(d);
  });

// Mettre à jour les barres de l'égaliseur
// Update equalizer bars
function updateEqualizer(data) {
  bars
    .data(data)
    .attr("y", function (d) {
      return y(d);
    })
    .attr("height", function (d) {
      return height - y(d);
    });
}

// Obtenir le flux audio de l'utilisateur
// Get User Audio Stream
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function (stream) {
    // Créer un objet AudioContext
    // Create an AudioContext object
    let audioContext = new AudioContext();

    // Créer un noeud MediaStreamAudioSourceNode pour le flux audio
    // Create a MediaStreamAudioSourceNode for the audio stream

    let source = audioContext.createMediaStreamSource(stream);

    // Créer un noeud AnalyserNode pour analyser le flux audio
    // Create an AnalyserNode to analyze the audio stream
    let analyser = audioContext.createAnalyser();
    analyser.fftSize = 32;

    // Connecter le noeud source au noeud analyser
    // Connect source node to analyze node
    source.connect(analyser);

    // Créer un tableau pour stocker les données de l'analyseur
    // Créer un tableau pour stocker les données de l'analyseur
    let dataArray = new Uint8Array(analyser.frequencyBinCount);

    // Mettre à jour les données de l'égaliseur à chaque trame d'animation
    // Update equalizer data every animation frame
    function update() {
      analyser.getByteFrequencyData(dataArray);
      updateEqualizer(dataArray);
      requestAnimationFrame(update);
    }

    // Commencer l'animation
    // Start Animation
    requestAnimationFrame(update);
  })
  .catch(function (error) {
    console.log("Erreur lors de l'obtention du flux audio: " + error.message);
  });

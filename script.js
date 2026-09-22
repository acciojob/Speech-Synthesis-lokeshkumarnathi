// Your script here.
const text = document.getElementById("text");
const voiceSelect = document.getElementById("voice");

const rate = document.getElementById("rate");
const pitch = document.getElementById("pitch");

const rateValue = document.getElementById("rateValue");
const pitchValue = document.getElementById("pitchValue");

const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");

let voices = [];


// Load available voices
function loadVoices() {

  voices = window.speechSynthesis.getVoices();

  voiceSelect.innerHTML = "";

  if (voices.length === 0) {

    const option = document.createElement("option");

    option.textContent = "No voices available";

    voiceSelect.appendChild(option);

    return;
  }

  voices.forEach((voice, index) => {

    const option = document.createElement("option");

    option.value = index;

    option.textContent = voice.name + " (" + voice.lang + ")";

    voiceSelect.appendChild(option);

  });
}


// Voices may load after the page loads
window.speechSynthesis.onvoiceschanged = loadVoices;

loadVoices();


// Rate slider
rate.addEventListener("input", function () {

  rateValue.textContent = rate.value;

});


// Pitch slider
pitch.addEventListener("input", function () {

  pitchValue.textContent = pitch.value;

});


// Speak button
speakButton.addEventListener("click", function () {

  const message = text.value.trim();

  // Prevent empty speech
  if (message === "") {
    return;
  }

  // Stop previous speech
  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(message);

  const selectedVoice = voices[voiceSelect.value];

  if (selectedVoice) {
    speech.voice = selectedVoice;
  }

  speech.rate = parseFloat(rate.value);

  speech.pitch = parseFloat(pitch.value);

  window.speechSynthesis.speak(speech);

});


// Stop button
stopButton.addEventListener("click", function () {

  window.speechSynthesis.cancel();

});


// Change voice while speaking
voiceSelect.addEventListener("change", function () {

  if (!window.speechSynthesis.speaking) {
    return;
  }

  const message = text.value.trim();

  if (message === "") {
    return;
  }

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(message);

  const selectedVoice = voices[voiceSelect.value];

  if (selectedVoice) {
    speech.voice = selectedVoice;
  }

  speech.rate = parseFloat(rate.value);

  speech.pitch = parseFloat(pitch.value);

  window.speechSynthesis.speak(speech);

});
document.addEventListener("DOMContentLoaded", function(event) {
  if (!buzz.isSupported()) {
    alert("Your browser is too old, time to update!");
  }
  var mySound = new buzz.sound("test tone.wav");
  mySound.play();
});
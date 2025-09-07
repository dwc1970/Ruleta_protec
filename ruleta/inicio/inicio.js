document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const fadeOverlay = document.getElementById("fade-overlay");

  startButton.addEventListener("click", function () {
    // 1. Añade la clase 'visible' al overlay para que empiece a desvanecerse
    fadeOverlay.classList.add("visible");

    // 2. Espera 5 segundos (el tiempo de la transición CSS)
    setTimeout(function () {
      window.location.href = "vader/vader.html";
    }, 5000); // 5000 milisegundos = 5 segundos
  });
});

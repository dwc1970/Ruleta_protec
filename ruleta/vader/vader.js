document.addEventListener("DOMContentLoaded", () => {
  const typedTextElement = document.getElementById("typed-text");
  const vaderGif = document.getElementById("vader-gif");

  // La frase que aparecerá letra por letra
  const phrase =
    "Demuestra lo que has aprendido, joven Aprendiz, y pásate al lado oscuro del curriculum.";
  let i = 0;
  const typingSpeed = 50; // Velocidad de escritura en milisegundos

  function typeWriter() {
    if (i < phrase.length) {
      typedTextElement.innerHTML += phrase.charAt(i);
      i++;
      setTimeout(typeWriter, typingSpeed);
    } else {
      // Cuando la frase termina de escribirse
      setTimeout(() => {
        // Añade la clase para activar la animación de desvanecimiento
        vaderGif.classList.add("fade-out");

        // Espera 3 segundos para que la animación termine antes de redirigir
        setTimeout(() => {
          // La ruta para ir de la carpeta 'vader' a la carpeta 'ruleta'
          window.location.href = "../ruleta/ruleta.html";
        }, 3000); // 3000 milisegundos = 3 segundos
      }, 1000); // Pequeña pausa de 1 segundo antes de que comience a desvanecerse
    }
  }

  // Iniciar el efecto de escritura
  typeWriter();
});

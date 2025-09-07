document.addEventListener("DOMContentLoaded", () => {
  const welcomeMessage = document.getElementById("welcome-message");
  const scoreElement = document.getElementById("score");
  const correctMatchesElement = document.getElementById("correct-matches");
  const spinBtn = document.getElementById("spin-btn");
  const restartBtn = document.getElementById("restart-btn");
  const finishBtn = document.getElementById("finish-btn");
  const continueBtn = document.getElementById("continue-btn");
  const exitBtn = document.getElementById("exit-btn");
  const rouletteSection = document.getElementById("roulette-section");
  const rouletteWheel = document.querySelector(".roulette-wheel");

  const questionModal = document.getElementById("question-modal");
  const modalTitle = document.getElementById("modal-title");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");
  const feedbackMessage = document.getElementById("feedback-message");

  const resultModal = document.getElementById("result-modal");
  const resultImage = document.getElementById("result-image");
  const resultMessage = document.getElementById("result-message");

  let score = 0;
  let correctMatches = 0;
  let incorrectAnswers = 0;
  const earlyFinishThreshold = 8;
  let gameIsRunning = false;
  let currentQuestion = null;
  let allQuestions = [];

  const triviaContent = [
    {
      question:
        "¿Cómo se puede entender el currículum según el texto en su dimensión de intención o plan?",
      correctAnswer: "Como la intención o plan.",
    },
    {
      question:
        "¿Cómo se entiende el currículum en su dimensión de experiencia real en la escuela?",
      correctAnswer: "Como la experiencia real en la escuela.",
    },
    {
      question: "¿Cuál es la visión de Kansas sobre el currículum?",
      correctAnswer:
        "El currículum son todas las experiencias educativas que resultan de la labor docente.",
    },
    {
      question:
        "¿Qué dos dimensiones del currículum se deben estudiar según el texto?",
      correctAnswer:
        "La dimensión prescriptiva (formal) y la dimensión práctica (real).",
    },
    {
      question: "¿Qué es el currículum formal?",
      correctAnswer:
        "Es la planificación oficial y documentada del proceso de enseñanza-aprendizaje.",
    },
    {
      question: "¿Qué elementos incluye el currículum formal?",
      correctAnswer: "Objetivos, contenidos, estrategias y evaluaciones.",
    },
    {
      question:
        '¿Cuál es el currículum que se considera "legitimado racionalmente" y "estructurado"?',
      correctAnswer: "El currículum formal.",
    },
    {
      question: "¿A qué se refiere el currículum real o vivido?",
      correctAnswer:
        "A la puesta en práctica del currículum formal en el aula.",
    },
    {
      question:
        "¿Qué factores afectan la puesta en práctica del currículum real?",
      correctAnswer: "Factores sociales, culturales y personales.",
    },
    {
      question:
        "¿Qué son las enseñanzas encubiertas y no explícitas que se transmiten en la escuela?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question: "¿Qué refleja el currículum oculto?",
      correctAnswer:
        "La ideología y los valores de la institución y del sistema social.",
    },
    {
      question: "¿Qué puede reproducir el currículum oculto?",
      correctAnswer: "Desigualdades sociales.",
    },
    {
      question:
        "¿Qué existe entre la teoría curricular y la práctica educativa?",
      correctAnswer: "Un hiato o tensión.",
    },
    {
      question: '¿Cómo se define el currículum como un "proyecto"?',
      correctAnswer:
        "Una visión más amplia que la de un simple plan de estudios, que lo concibe como un instrumento para la transformación de la enseñanza.",
    },
    {
      question: "¿Qué integra el currículum como proyecto?",
      correctAnswer: "Objetivos culturales, entre otros.",
    },
    {
      question:
        "¿Qué es el currículum formal según la primera definición del texto?",
      correctAnswer:
        "La planificación oficial del proceso de enseñanza-aprendizaje.",
    },
    {
      question:
        "¿Qué es el currículum real según la primera definición del texto?",
      correctAnswer:
        "La puesta en práctica en el aula, con las modificaciones que surgen de la interacción entre el plan y la realidad.",
    },
    {
      question:
        "¿Qué es el currículum oculto según la primera definición del texto?",
      correctAnswer: "Las enseñanzas encubiertas y no explícitas.",
    },
    {
      question:
        "¿Cuál es el ejemplo de currículum formal que se da en el texto?",
      correctAnswer:
        "El plan de estudios que indica que se debe enseñar la tabla periódica.",
    },
    {
      question: "¿Cuál es el ejemplo de currículum real que se da en el texto?",
      correctAnswer:
        "El docente que utiliza un juego de cartas y un video para enseñar la tabla periódica.",
    },
    {
      question:
        "¿Cuál es el ejemplo de currículum oculto que se da en el texto?",
      correctAnswer: "El docente que premia la puntualidad y la disciplina.",
    },
    {
      question: "¿Cómo se relaciona el currículum con la cultura?",
      correctAnswer:
        "El currículum es el medio por el cual los individuos se incorporan a la cultura.",
    },
    {
      question: '¿Qué se entiende por "currículum formal"?',
      correctAnswer: "La planificación oficial y documentada.",
    },
    {
      question: '¿Qué es el "currículum vivido"?',
      correctAnswer: "La adaptación del currículum formal en el aula.",
    },
    {
      question: '¿Qué se entiende por "currículum oculto"?',
      correctAnswer: "Las enseñanzas encubiertas y no explícitas.",
    },
    {
      question:
        "¿Cuál es la principal diferencia entre el currículum formal y el real?",
      correctAnswer:
        "El currículum formal es lo que se planea, y el real es lo que realmente sucede.",
    },
    {
      question: "¿Qué es un plan de estudios?",
      correctAnswer: "El documento que contiene el currículum formal.",
    },
    {
      question:
        "¿Qué aspectos del proceso de enseñanza-aprendizaje son prescritos en el currículum formal?",
      correctAnswer: "Objetivos, contenidos, estrategias y evaluación.",
    },
    {
      question: "¿Qué influye en la adaptación del currículum formal al real?",
      correctAnswer: "Factores socioculturales y económicos.",
    },
    {
      question: "¿Qué se transmite a través del currículum oculto?",
      correctAnswer:
        "Normas sociales y expectativas como la sumisión y la obediencia.",
    },
    {
      question:
        '¿Qué se entiende por la visión del currículum como un "proyecto"?',
      correctAnswer:
        "Es una visión que lo concibe como un instrumento para la transformación de la enseñanza.",
    },
    {
      question: "¿Quién escribió el texto que se resume?",
      correctAnswer: "Martha Casarini.",
    },
    {
      question:
        "¿Qué dos conceptos principales relaciona la definición de currículum?",
      correctAnswer: "La relación entre la intención y la realidad.",
    },
    {
      question:
        "¿Qué concepto resalta la importancia de la experiencia en la escuela?",
      correctAnswer: "El currículum real o vivido.",
    },
    {
      question:
        "¿Cuál de los tres tipos de currículum es el que se documenta de forma oficial?",
      correctAnswer: "El currículum formal.",
    },
    {
      question:
        "¿Cuál de los tres tipos de currículum es el que se adapta en el aula?",
      correctAnswer: "El currículum real.",
    },
    {
      question:
        "¿Cuál de los tres tipos de currículum no está explícito en la planificación?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question: "¿Qué tipo de currículum puede generar desigualdades sociales?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question:
        "¿Qué se propone para ver el currículum como un instrumento para la transformación de la enseñanza?",
      correctAnswer: 'Ver el currículum como un "proyecto".',
    },
    {
      question:
        "¿Cuál es la relación entre el currículum y el trabajo del profesor?",
      correctAnswer:
        "El currículum como proyecto sirve de guía para el profesor.",
    },
    {
      question:
        "¿Qué documento contiene las intenciones, objetivos y contenidos?",
      correctAnswer: "El currículum formal.",
    },
    {
      question:
        "¿Qué tipo de currículum considera los factores socioculturales y económicos?",
      correctAnswer: "El currículum real.",
    },
    {
      question:
        "¿Qué ejemplo del texto ilustra la diferencia entre el currículum formal y el real?",
      correctAnswer:
        "La enseñanza de la tabla periódica (formal) y el uso de un juego y un video (real).",
    },
    {
      question: "¿Qué ejemplo del texto ilustra el currículum oculto?",
      correctAnswer:
        "Premiar la puntualidad y la disciplina más allá de la calificación de las tareas.",
    },
    {
      question:
        "¿Qué tipo de currículum es el plan de estudios con intenciones, objetivos y contenidos?",
      correctAnswer: "El currículum formal.",
    },
    {
      question: "¿Cuál es el currículum que se adapta en el aula?",
      correctAnswer: "El currículum real.",
    },
    {
      question:
        "¿Qué tipo de currículum se encarga de las enseñanzas implícitas?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question: "¿El currículum formal es una planificación oficial?",
      correctAnswer: "Sí, es la planificación oficial.",
    },
    {
      question:
        "¿El currículum real se ve afectado por factores socioculturales?",
      correctAnswer:
        "Sí, se ve afectado por factores socioculturales y económicos.",
    },
    {
      question: "¿El currículum oculto tiene un trasfondo ideológico?",
      correctAnswer: "Sí, tiene un trasfondo ideológico y político.",
    },
    {
      question:
        "¿Qué se entiende por currículum desde la perspectiva de la intención?",
      correctAnswer: "Lo que se planea y se escribe en el plan de estudios.",
    },
    {
      question:
        "¿Qué se entiende por currículum desde la perspectiva de la realidad?",
      correctAnswer: "Lo que realmente sucede en las escuelas.",
    },
    {
      question:
        "¿Qué institución destaca el currículum como todas las experiencias educativas?",
      correctAnswer: "La visión de Kansas.",
    },
    {
      question:
        "¿Qué tipo de currículum está estructurado y legitimado racionalmente?",
      correctAnswer: "El currículum formal.",
    },
    {
      question:
        "¿Cuál es la principal diferencia entre currículum formal y currículum oculto?",
      correctAnswer:
        "El currículum formal es explícito y el oculto es implícito.",
    },
    {
      question: "¿Qué ocurre con el currículum formal en el aula?",
      correctAnswer:
        "Se adapta y se pone en práctica, convirtiéndose en currículum real.",
    },
    {
      question:
        "¿Qué tipo de currículum refleja la ideología y los valores de la institución?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question:
        "¿Qué tipo de currículum se utiliza para interpretar la tensión entre el currículum formal y el real?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question: "¿Cuál es un ejemplo de currículum real?",
      correctAnswer:
        "Un docente que usa un juego para enseñar un tema planificado.",
    },
    {
      question: "¿Cuál es un ejemplo de currículum formal?",
      correctAnswer: "El plan de estudios que indica qué se debe enseñar.",
    },
    {
      question: "¿Cuál es un ejemplo de currículum oculto?",
      correctAnswer: "Un docente que premia la puntualidad y la disciplina.",
    },
    {
      question:
        '¿A qué se refiere el término "currículum" en su sentido más amplio según el texto?',
      correctAnswer: "Como un proyecto.",
    },
    {
      question:
        "¿Qué visión del currículum lo concibe como una guía para el profesor?",
      correctAnswer: "La visión del currículum como un proyecto.",
    },
    {
      question:
        "¿Cómo se relaciona el currículum con la asimilación de la cultura?",
      correctAnswer:
        "Es el medio por el cual los individuos asimilan y se incorporan a la cultura.",
    },
    {
      question:
        "¿Qué tipo de currículum es el que se vive día a día en la escuela?",
      correctAnswer: "El currículum real.",
    },
    {
      question:
        "¿Qué tipo de currículum es el que se planea antes de la enseñanza?",
      correctAnswer: "El currículum formal.",
    },
    {
      question: "¿Qué tipo de currículum se refiere a las normas no escritas?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question: '¿Qué se entiende por "currículum como proyecto"?',
      correctAnswer:
        "Es una visión que concibe al currículum como una guía para la transformación de la enseñanza.",
    },
    {
      question: "¿Cómo se describe el currículum formal?",
      correctAnswer:
        "Como un plan de estudios con objetivos, contenidos y evaluaciones prescritas.",
    },
    {
      question: "¿Cómo se describe el currículum real?",
      correctAnswer:
        "Como la adaptación del plan formal en el aula, afectada por factores sociales y culturales.",
    },
    {
      question: "¿Cómo se describe el currículum oculto?",
      correctAnswer: "Como las enseñanzas implícitas y encubiertas.",
    },
    {
      question:
        "¿Qué concepto se enfoca en la relación entre intención y realidad?",
      correctAnswer: "La definición de currículum.",
    },
    {
      question:
        "¿Cómo se le llama a la adaptación del plan de estudios en el aula?",
      correctAnswer: "Currículum real o vivido.",
    },
    {
      question:
        "¿Qué aspecto del currículum incluye la sumisión y la obediencia?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question:
        "¿Qué tipo de currículum se enfoca en la labor docente para las experiencias educativas?",
      correctAnswer: "El currículum en la visión de Kansas.",
    },
    {
      question: "¿Qué se necesita para pasar del currículum formal al real?",
      correctAnswer: "La adaptación y puesta en práctica en el aula.",
    },
    {
      question:
        "¿Cuál es el documento que orienta el proceso de enseñanza-aprendizaje?",
      correctAnswer: "El currículum formal.",
    },
    {
      question:
        "¿Qué tipo de currículum se modifica por la interacción social?",
      correctAnswer: "El currículum real.",
    },
    {
      question:
        "¿Qué se transmite a través del currículum oculto además de valores?",
      correctAnswer: "Roles sociales.",
    },
    {
      question: "¿Qué se entiende por la visión de Kansas sobre el currículum?",
      correctAnswer:
        "Que el currículum es el conjunto de todas las experiencias educativas que resultan de la labor docente.",
    },
    {
      question: "¿Cómo se puede entender el currículum como una herramienta?",
      correctAnswer:
        "Como una herramienta que no solo refleja intenciones, sino que indica cómo llevar a cabo los propósitos educativos.",
    },
    {
      question: "¿Qué es el currículum formal?",
      correctAnswer: "El plan de estudios formal y documentado.",
    },
    {
      question: "¿Qué es el currículum real?",
      correctAnswer: "La puesta en práctica del plan formal en el aula.",
    },
    {
      question: "¿Qué es el currículum oculto?",
      correctAnswer: "Las enseñanzas implícitas y encubiertas.",
    },
    {
      question:
        "¿Qué tipo de currículum refleja los valores de la institución?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question:
        "¿Qué tipo de currículum incluye las lecciones, tareas y evaluaciones planificadas?",
      correctAnswer: "El currículum formal.",
    },
    {
      question:
        "¿Qué tipo de currículum se ve afectado por la realidad del aula?",
      correctAnswer: "El currículum real.",
    },
    {
      question: "¿Cuál de los tres tipos de currículum es el plan de estudios?",
      correctAnswer: "El currículum formal.",
    },
    {
      question: "¿Cuál de los tres tipos de currículum se lleva a la práctica?",
      correctAnswer: "El currículum real.",
    },
    {
      question:
        "¿Cuál de los tres tipos de currículum es el que no está en el plan de estudios?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question: "¿Qué se busca al estudiar el currículum?",
      correctAnswer:
        "La relación entre lo que se planea y lo que ocurre en el aula.",
    },
    {
      question: "¿Qué implica el currículum como proyecto?",
      correctAnswer: "Integrar objetivos culturales, sociales y personales.",
    },
    {
      question:
        "¿Qué es la principal diferencia entre el currículum formal y el real?",
      correctAnswer:
        "El currículum formal es lo prescrito, el real es la adaptación.",
    },
    {
      question: "¿Qué tipo de currículum transmite enseñanzas encubiertas?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question:
        "¿Cómo se le llama a la planificación oficial del proceso de enseñanza-aprendizaje?",
      correctAnswer: "Currículum formal.",
    },
    {
      question:
        "¿Qué tipo de currículum es la adaptación del plan formal en el aula?",
      correctAnswer: "Currículum real/vivido.",
    },
    {
      question:
        "¿Cuál es el currículum que se refiere a las enseñanzas no explícitas?",
      correctAnswer: "Currículum oculto.",
    },
    {
      question: "¿Qué es un ejemplo de la vida real del currículum formal?",
      correctAnswer:
        "El plan de estudios que indica enseñar la tabla periódica.",
    },
    {
      question: "¿Qué es un ejemplo de la vida real del currículum real?",
      correctAnswer: "Usar un juego para enseñar la tabla periódica.",
    },
    {
      question: "¿Qué es un ejemplo de la vida real del currículum oculto?",
      correctAnswer: "Premiar la puntualidad.",
    },
    {
      question: '¿A qué se refiere la "dimensión prescriptiva" del currículum?',
      correctAnswer: "Se refiere al currículum formal.",
    },
    {
      question: '¿A qué se refiere la "dimensión práctica" del currículum?',
      correctAnswer: "Se refiere al currículum real.",
    },
    {
      question:
        "¿Qué tipo de currículum es la planificación oficial del proceso de enseñanza-aprendizaje?",
      correctAnswer: "Currículum formal.",
    },
    {
      question:
        "¿Qué tipo de currículum se ve modificado por la realidad del aula?",
      correctAnswer: "Currículum real.",
    },
    {
      question:
        "¿Qué tipo de currículum transmite los valores sociales de forma no explícita?",
      correctAnswer: "Currículum oculto.",
    },
    {
      question: "¿Cuál es la principal característica del currículum formal?",
      correctAnswer: "Es la planificación oficial y documentada.",
    },
    {
      question: "¿Cuál es la principal característica del currículum real?",
      correctAnswer: "Es la puesta en práctica del plan formal en el aula.",
    },
    {
      question: "¿Cuál es la principal característica del currículum oculto?",
      correctAnswer: "Son las enseñanzas encubiertas y no explícitas.",
    },
    {
      question:
        "¿Cómo se llama al documento que contiene los objetivos y contenidos del currículum formal?",
      correctAnswer: "Plan de estudios.",
    },
    {
      question: "¿Qué es el currículum real o vivido?",
      correctAnswer:
        "La adaptación del plan formal en el aula por factores socioculturales y personales.",
    },
    {
      question: "¿Qué se enseña a través del currículum oculto?",
      correctAnswer: "Valores, normas y roles sociales.",
    },
    {
      question:
        "¿Por qué es importante estudiar el currículum en sus diferentes dimensiones?",
      correctAnswer:
        "Para entender la relación entre la teoría curricular y la práctica educativa.",
    },
    {
      question:
        '¿Qué se entiende por "currículum como un instrumento" para el profesor?',
      correctAnswer: "Como una guía para la transformación de la enseñanza.",
    },
    {
      question:
        "¿Qué se menciona como un ejemplo de currículum formal en el texto?",
      correctAnswer:
        "La planificación de lecciones, tareas y evaluaciones sobre la tabla periódica.",
    },
    {
      question:
        "¿Qué se menciona como un ejemplo de currículum real en el texto?",
      correctAnswer:
        "Usar un juego de cartas y un video para enseñar la tabla periódica.",
    },
    {
      question:
        "¿Qué se menciona como un ejemplo de currículum oculto en el texto?",
      correctAnswer: "Premiar a los alumnos que entregan sus tareas a tiempo.",
    },
    {
      question:
        "¿Qué tipo de currículum está relacionado con la ideología y política?",
      correctAnswer: "El currículum oculto.",
    },
    {
      question: "¿Qué se entiende por currículum en la visión de Kansas?",
      correctAnswer:
        "El currículum es el conjunto de todas las experiencias educativas que resultan de la labor docente.",
    },
    {
      question:
        "¿Cuál es la relación entre currículum y cultura según el texto?",
      correctAnswer:
        "La educación escolarizada es el medio por el cual los individuos asimilan y se incorporan a la cultura.",
    },
    {
      question:
        "¿Qué es el hiato entre la teoría curricular y la práctica educativa?",
      correctAnswer:
        "Es la tensión o discrepancia entre lo que se propone en la teoría curricular y lo que realmente sucede en la práctica educativa.",
    },
  ];

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createRouletteSlices() {
    rouletteWheel.innerHTML = "";
    const numSlices = 20;
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let i = 0; i < numSlices; i++) {
      const slice = document.createElement("div");
      slice.classList.add("roulette-slice");
      slice.style.transform = `rotate(${i * (360 / numSlices)}deg)`;
      slice.innerHTML = `<span>${alphabet[i]}</span>`;
      rouletteWheel.appendChild(slice);
    }
  }

  function spinRoulette() {
    if (gameIsRunning) return;
    gameIsRunning = true;
    spinBtn.disabled = true;

    const randomSpin = Math.floor(Math.random() * 360) + 1800;
    rouletteWheel.style.transition =
      "transform 3s cubic-bezier(0.1, 0.7, 1.0, 0.1)";
    rouletteWheel.style.transform = `rotate(${randomSpin}deg)`;

    setTimeout(() => {
      gameIsRunning = false;
      spinBtn.disabled = false;

      const chosenQuestionIndex = Math.floor(
        Math.random() * triviaContent.length
      );
      currentQuestion = triviaContent[chosenQuestionIndex];

      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const winningSliceIndex = Math.floor((randomSpin % 360) / (360 / 20));
      const winningSliceLabel = alphabet[winningSliceIndex];

      showQuestionModal(winningSliceLabel);
    }, 3000);
  }

  function showQuestionModal(rouletteLabel) {
    modalTitle.textContent = `Letra: ${rouletteLabel}`;
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = "";
    optionsContainer.style.pointerEvents = "auto";
    feedbackMessage.textContent = "";

    const options = getOptions(currentQuestion);
    options.forEach((option) => {
      const optionItem = document.createElement("div");
      optionItem.classList.add("option-item");
      optionItem.textContent = option;
      optionItem.dataset.answer = option;
      optionItem.addEventListener("click", handleAnswer);
      optionsContainer.appendChild(optionItem);
    });

    questionModal.style.display = "flex";
  }

  function hideQuestionModal() {
    questionModal.style.display = "none";
    rouletteWheel.style.transform = `rotate(0deg)`;
  }

  function getOptions(correctQuestion) {
    let options = [correctQuestion.correctAnswer];
    let incorrectOptions = triviaContent
      .filter((q) => q.correctAnswer !== correctQuestion.correctAnswer)
      .map((q) => q.correctAnswer);
    shuffle(incorrectOptions);
    options.push(...incorrectOptions.slice(0, 3));
    shuffle(options);
    return options;
  }

  function showResultModal(isCorrect) {
    hideQuestionModal();
    if (isCorrect) {
      resultImage.src = "sidius.gif";
      resultMessage.textContent =
        "La fuerza del curriculum es intensa en ti mi joven aprendiz";
      resultMessage.style.color = "darkgreen";
    } else {
      resultImage.src = "yoda.gif";
      resultMessage.textContent = "Estudiar debes más joven padawan";
      resultMessage.style.color = "darkred";
    }

    resultModal.style.display = "flex";
    resultMessage.style.animation = "none";
    resultMessage.offsetHeight;
    resultMessage.style.animation = null;

    setTimeout(() => {
      resultModal.style.display = "none";
      rouletteWheel.style.transform = `rotate(0deg)`;

      gameIsRunning = false;

      if (incorrectAnswers >= 2 || score >= 100) {
        endGame("gameover");
      } else {
        welcomeMessage.textContent = "¡Gira la Ruleta!";
        showInitialControls();
        rouletteSection.style.display = "flex";
      }
    }, 3000);
  }

  function handleAnswer(event) {
    if (gameIsRunning) return;
    gameIsRunning = true;
    optionsContainer.style.pointerEvents = "none";

    const selectedAnswer = event.target.closest(".option-item");
    const isCorrect =
      selectedAnswer.dataset.answer === currentQuestion.correctAnswer;

    if (isCorrect) {
      score += 20;
      correctMatches++;
      selectedAnswer.classList.add("correct");
      feedbackMessage.textContent = "¡Correcto! ✅";
    } else {
      incorrectAnswers++;
      selectedAnswer.classList.add("incorrect");
      const correctOption = optionsContainer.querySelector(
        `[data-answer="${currentQuestion.correctAnswer}"]`
      );
      if (correctOption) correctOption.classList.add("correct");
      feedbackMessage.textContent = "¡Incorrecto! ❌";
    }

    scoreElement.textContent = score;
    correctMatchesElement.textContent = correctMatches;

    setTimeout(() => {
      showResultModal(isCorrect);
    }, 1500);
  }

  function showInitialControls() {
    spinBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
    finishBtn.style.display = "none";
    continueBtn.style.display = "none";
    exitBtn.style.display = "none";
    rouletteSection.style.display = "flex";
  }

  function endGame(reason) {
    rouletteSection.style.display = "none";
    hideQuestionModal();

    if (score >= 100) {
      welcomeMessage.textContent = `¡Felicidades, ganaste! Tu puntaje es de ${score}.`;
    } else if (reason === "gameover") {
      welcomeMessage.textContent = `Has tenido 2 errores. ¡Juego terminado! Tu puntaje final es: ${score}.`;
    } else if (reason === "finalizado") {
      welcomeMessage.textContent = `Tienes ${correctMatches} aciertos y ${score} puntos.`;
    } else {
      welcomeMessage.textContent = `Juego terminado. Tu puntaje final es: ${score}.`;
    }

    welcomeMessage.style.display = "block";
    spinBtn.style.display = "none";
    restartBtn.style.display = "inline-block";
    exitBtn.style.display = "inline-block";
    finishBtn.style.display = "none";
    continueBtn.style.display = "none";
  }

  function exitGame() {
    window.location.href = "../index.html";
  }

  createRouletteSlices();

  spinBtn.addEventListener("click", spinRoulette);
  restartBtn.addEventListener("click", () => location.reload());
  exitBtn.addEventListener("click", exitGame);
});

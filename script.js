const quizData = [
    {
      question: "Commonly used data types DO NOT include...?",
      a: "Alerts",
      b: "Strings",
      c: "Booleans",
      d: "Numbers",
      correct: "a",
    },
    {
      question: "Arrays in JavaScript can be used to store...?",
      a: "Numbers and strings",
      b: "Booleans",
      c: "Alerts",
      d: "All of the above",
      correct: "a",
    },
    {
      question: "String values must be enclosed in...?",
      a: "Quotes",
      b: "Parentheses",
      c: "Curly brackets",
      d: "Square brackets",
      correct: "a",
    },
  ];
  
  const quiz = document.getElementById("quiz");
  const answerElements = document.querySelectorAll(".answer");
  const questionElement = document.getElementById("question");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const submitButton = document.getElementById("submit");
  const timerElement = document.getElementById("timer");
  const highScores = [];
  
  let currentQuiz = 0;
  let score = 0;
  let timeLeft = 60; // 1 minute in seconds
  let timerId;
  
  const deselectAnswers = () => {
    answerElements.forEach((answer) => (answer.checked = false));
  };
  
  const getSelected = () => {
    let answer;
    answerElements.forEach((answerElement) => {
      if (answerElement.checked) answer = answerElement.id;
    });
    return answer;
  };
  
  const loadQuiz = () => {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionElement.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
  };
  
  const startTimer = () => {
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timerElement.innerText = `Time left: ${timeLeft} seconds`;
      } else {
        clearInterval(timerId);
        endQuiz();
      }
    }, 1000);
  };
  
  const saveHighScore = () => {
    const playerName = prompt("Enter your name:");
    const highScore = { name: playerName, score: score };
    highScores.push(highScore);
  };
  
  const endQuiz = () => {
    clearInterval(timerId);
    saveHighScore();
    // Sort the high scores array based on the score in descending order
    highScores.sort((a, b) => b.score - a.score);
  
    let highScoresHTML = "<h2>High Scores</h2>";
    highScores.forEach((highScore, index) => {
      highScoresHTML += `<p>${index + 1}. ${highScore.name} - ${highScore.score}</p>`;
    });
  
    quiz.innerHTML = `
      <h2>You answered ${score}/${quizData.length} questions correctly</h2>
      <button onclick="history.go(0)">Play Again</button>
      <div>${highScoresHTML}</div>
    `;
  };
  
  submitButton.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
      } else {
        timeLeft -= 5; // Deduct 5 seconds for incorrect answer
        if (timeLeft <= 0) {
          endQuiz();
          return;
        }
      }
  
      currentQuiz++;
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        endQuiz();
      }
    }
  });
  
  loadQuiz();
  startTimer();
  
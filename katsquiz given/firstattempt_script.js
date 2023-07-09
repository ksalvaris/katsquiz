// Questions that will be asked
const Questions = [
    {
      q: "Commonly used data types DO NOT include...?",
      a: [
        { text: "Alerts", isCorrect: false },
        { text: "Strings", isCorrect: false },
        { text: "Booleans", isCorrect: false },
        { text: "Numbers", isCorrect: true }
      ]
    },
    {
      q: "Arrays in JavaScript can be used to store...?",
      a: [
        { text: "Numbers and strings", isCorrect: true },
        { text: "Booleans", isCorrect: false },
        { text: "Alerts", isCorrect: false },
        { text: "All of the above", isCorrect: false }
      ]
    },
    {
      q: "String values must be enclosed within...?",
      a: [
        { text: "Quotes", isCorrect: true },
        { text: "Parentheses", isCorrect: false },
        { text: "Curly brackets", isCorrect: false },
        { text: "Square brackets", isCorrect: false }
      ]
    }
  ];
  
  let currQuestion = 0;
  let score = 0;
  let highScores = [];
  
  // Function to load the first question 
  function loadQues() {
    const question = document.getElementById("quest");
    const answer = document.getElementById("ans");
  
    question.textContent = Questions[currQuestion].q;
    answer.innerHTML = "";
  
    for (let i = 0; i < Questions[currQuestion].a.length; i++) {
      const choicesdiv = document.createElement("div");
      const choice = document.createElement("input");
      const choiceLabel = document.createElement("label");
  
      choice.type = "radio";
      choice.name = "answer";
      choice.value = i;
  
      choiceLabel.textContent = Questions[currQuestion].a[i].text;
  
      choicesdiv.appendChild(choice);
      choicesdiv.appendChild(choiceLabel);
      answer.appendChild(choicesdiv);
    }
    
  }

  loadQues();

  // Calling the next question
  function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
      currQuestion++;
      loadQues();
    } else {
      document.getElementById("question-section").classList.add("hidden");
      document.getElementById("result").classList.remove("hidden");
      loadScore();
      saveHighScore();
      document.getElementById("high-scores").classList.remove("hidden");
    }
  }
  
  
  function loadScore() {
    const totalScore = document.getElementById("score");
    totalScore.textContent = `You scored ${score} out of ${Questions.length}`;
  
    const highScoreSection = document.getElementById("high-scores");
    highScoreSection.innerHTML = "";
  
    // Display high scores
    const highScoreTitle = document.createElement("h2");
    highScoreTitle.textContent = "High Scores";
    highScoreSection.appendChild(highScoreTitle);
  
    const highScoreList = document.createElement("ol");
  
    // Iterate over high scores and create list items
    for (let i = 0; i < Math.min(highScores.length, 5); i++) {
      const highScoreItem = document.createElement("li");
      highScoreItem.textContent = highScores[i];
      highScoreList.appendChild(highScoreItem);
    }
  
    highScoreSection.appendChild(highScoreList);
  }
    
 
  function checkAns() {
    const selectedAns = parseInt(
      document.querySelector('input[name="answer"]:checked').value
    );
  
    if (Questions[currQuestion].a[selectedAns].isCorrect) {
      score++;
      console.log("Correct");
      nextQuestion();
    } else {
      nextQuestion();
    }
  }
  
  function saveHighScore() {
    const playerName = prompt("Enter your name:");
  
    // Create a string to store the score and player name
    const highScore = `${playerName}: ${score}`;
  
    // Add the high score to the array
    highScores.push(highScore);
  
    // Sort the high scores in descending order
    highScores.sort((a, b) => {
      const scoreA = parseInt(a.split(":")[1]);
      const scoreB = parseInt(b.split(":")[1]);
      return scoreB - scoreA;
    });
  
    // Keep only the top 5 high scores
    highScores = highScores.slice(0, 5);

    saveHighScore();

  return highScores;
  
  }

  // Call the loadScore function to display the updated high scores
  
  
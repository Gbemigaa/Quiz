// var startingMinute = 1;
// let time = startingMinute *60;
// var start = document.getElementById('start-btn')

// var countdownEl = document.getElementById('countdown');

// var interval;

// setInterval(updateCountdown,1000);

//    function updateCountdown(){
//     var minute = Math.floor(time / 60);
//     let seconds = time % 60;

//     seconds = seconds < 1 ? '0' + seconds : seconds;

//     countdownEl.innerHTML = `${minute}: ${seconds}`;
//     time--;   

    

//     while(time < 0){
//         clearInterval(updateCountdown)
//         time--;
//     }
//    };
//event listener



const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const highscoreButton = document.getElementById('highscore-btn')
const scoreContainerElement = document.getElementById('score-container')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
highscoreButton.addEventListener('click', highscores() )

function highscores(){
    scoreContainerElement.classList.remove('hide')
}

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'View Highscores'
    highscoreButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What does SQL mean?',
    answers: [
      { text: 'Structure Query Language', correct: false },
      { text: 'Synopsis Query Language', correct: false },
      { text: 'Structured Query Language', correct: true }
    ]
  },
  {
    question: 'What does HTML mean?',
    answers: [
      { text: 'Hypertext Markup Language', correct: true },
      { text: 'Harrytotter Markup Language', correct: false },
      { text: 'Helium Markup Language', correct: false },
      { text: 'Hoodtext Markup Language', correct: false }
    ]
  },
  {
    question: 'Which is the right way to set up a local repository on Github?',
    answers: [
      { text: 'git config -global init.defaultbranch main', correct: false },
      { text: 'git config --global init.default branch main', correct: true },
      { text: 'git config  init.defaultbranch main', correct: false },
      { text: 'git push origin main', correct: false }
    ]
  },
  {
    question: 'What would you use to loop through an array on Javascript?',
    answers: [
      { text: 'if', correct: false },
      { text: 'for', correct: true },
      { text: 'while', correct: false },
      {text: 'const', correct: false}
    ]
  }
]


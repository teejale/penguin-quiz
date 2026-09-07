
// darkmode
function changeMode() {
  let element = document.body;
  //using toggle to switch between elements
  element.classList.toggle("darkMode");
  //declare new variable that checks if darkMode exist as a class
  const isDarkMode = element.classList.contains("darkMode");
  let darkLightBtn = document.querySelector("#modeBtn");
  //check if the class is activated and set condition to it
  if (isDarkMode) {
    darkLightBtn.textContent = "Change to light mode";
  } else {
    darkLightBtn.textContent = "Change to dark mode";
  }
}


//add JSON 
const quizData = [
  {
    // checkbox options
    question: "What food do penguins eat? Three right answers!",
    options: ["Starfish", "Krill", "Algae", "Fish", "Squid", "Seaweed"],
    type: "checkbox",
    answer: ["Krill", "Fish", "Squid"],
    img: "img/bob-brewer-CG3Zo4boXoA-unsplash.jpg"
  },
  {
    question: "Which penguin species is this?",
    options: ["King Penguin", "Gentoo Penguin", "Chinstrap Penguin", "Emperor Penguin", "Adelié Penguin"],
    answer: "King Penguin",
    img: "img/hubert-neufeld-j-udI4zim2E-unsplash.jpg"
  },
  {
    question: "Do all penguins go through fasting?",
    options: ["Yes", "No"],
    answer: "Yes",
    img: "img/cornelius-ventures-xw0qdCSerPo-unsplash.jpg"
  },
  {
    question: "Which penguin species swims the fastest?",
    options: ["Macaroni Penguin", "Humboldt Penguin", "Gentoo Penguin", "Galapagos Penguin"],
    answer: "Gentoo Penguin",
    img: "img/tao-EhCyX3SHw1o-unsplash.jpg"
  },
  {
    // checkbox options
    question: "Penguins can be found in four different continents. Which are they?",
    options: ["South America", "Europe", "Africa", "Australia", "Asia", "North America", "Antarctica"],
    type: "checkbox",
    answer: ["South America", "Africa", "Australia", "Antarctica"],
    img: "img/hartono-creative-studio-1gW-pzeXX2E-unsplash.jpg"
  },
  {
    question: "Which penguin species is this little chick?",
    options: ["African Penguin", "Macaroni Penguin", "Rockhopper Penguin", "Little Penguin"],
    answer: "African Penguin",
    img: "img/miguel-alcantara-Ai4qoYZgetA-unsplash.jpg"
  },
  {
    question: "Which species is this?",
    options: ["Snares Penguin", "Erect-Crestet Penguin", "Magellanic Penguin", "Royal Penguin"],
    answer: "Magellanic Penguin",
    img: "img/sander-crombach-5k_zylvdFPs-unsplash.jpg"
  },
  {
    question: "Which penguin species is the tallest?",
    options: ["King Penguin", "Emperor Penguin", "Royal Penguin"],
    answer: "Emperor Penguin",
    img: "img/patricia-serna-zPZ9vqqDNBA-unsplash(1).jpg"

  },
  {
    question: "Which penguin species is this?",
    options: ["Yellow-Eyed-Penguin", "Adelié Penguin", "Galapagos Penguin", "Fiordland Penguin"],
    answer: "Adelié Penguin",
    img: "img/jean-wimmerlin-jNHKHND7F9E-unsplash.jpg"
  },
  {
    question: "What maxmimum time can penguins hold their breath?",
    options: ["20 min", "9 min", "13 min", "2 min", "30 min"],
    answer: "20 min",
    img: "img/jacob-meissner-R_SdTtodRKA-unsplash.jpg"
  },

];

//declare variables
const questionElement = document.querySelector("#questions");
const optionsElement = document.querySelector("#options");
const nextBtn = document.querySelector("#next");
const submitBtn = document.querySelector("#submit");
const showRightAnsw = document.querySelector("#rightAnswer");
const redoBtn = document.querySelector("#redo");

nextBtn.addEventListener("click", nextQuestion);
// Starts with first question (index 0)
let currentQuestion = 0;
// starts with 0 scores
let score = 0;
function showQuestion() {
  //targeting quizdata and currentQuestion, saves it in variable quiz
  const quiz = quizData[currentQuestion];
  //targeting the question
  questionElement.innerText = quiz.question;
  //cler all HTML content of options
  optionsElement.innerHTML = "";
  const image = document.querySelector("#penguins");
  // add the class hidden as default 
  image.classList.add("hidden");
  quiz.options.forEach((option, i) => {
    const input = document.createElement("input");
    //give a unique id to every input
    input.setAttribute("id", `checkBoxOpt_${i}`);
    //give a unique value to every input
    input.setAttribute("value", i);
    //the code will execute if there is checkboxes
    if (quiz.type === "checkbox") {
      input.setAttribute("type", "checkbox");
      // addeventlistener for checkboxes
      input.addEventListener("click", () => {
        //retrieves all checked inputs from options
        const inputs = document.querySelectorAll("#options input:checked");
        //checks if the length of inputs are less than or equal than answer length
        if (inputs.length >= quiz.answer.length) {
          //retrieves all unchecked inputs
          const notChecked = document.querySelectorAll(`#options input:not(:checked)`);
          notChecked.forEach((box) => {
            //inputs that is not checked will be disabled
            box.disabled = true;
          });
        } else {
          //if checked less than 3 the all checkboxs will be non disabled
          const allOptions = document.querySelectorAll(`#options input`);
          allOptions.forEach((box) => {
            box.disabled = false;
          });
        }  
      });
      // create labels for options so the text will display 
    } else {
      input.setAttribute("type", "radio");
      input.name = "answers";
    }
    optionsElement.appendChild(input); 
    const label = document.createElement("label");
    //give a unique label for every checkbox
    label.setAttribute("for", `checkBoxOpt_${i}`);
    label.innerText = option;
    optionsElement.appendChild(label);
    
    // check if there is img in the quiz and set condition to it
    if(quiz.img) {
      image.src = quiz.img;
      //remove class hidden to reveal image
      image.classList.remove("hidden");
    }
  }); 
}

function labelStyle() {
  const quiz = quizData[currentQuestion];
  //add style to labels
  const labels = document.querySelectorAll("#options label");
  console.log(labels)
  labels.forEach((label, i) => {
    if (quiz.answer.includes(label.innerText)) {
      label.classList.add("rightLabel");
    } else {
      label.classList.add("wrongLabel");
    }
  });
}


submitBtn.addEventListener("click", (e) => {
  const quiz = quizData[currentQuestion];
  const selectedOptions = document.querySelectorAll("#options input:checked");
  const selectedOptionsArr = Array.from(selectedOptions);

  // alert if user try to click submit without checking in any options
  if (quiz.type === "checkbox" && selectedOptionsArr.length < quiz.answer.length) {
    alert(`You have to select ${quiz.answer.length} options!`);
    return;
  } else if (selectedOptionsArr.length === 0) {
    alert(`You have to select 1 option`);
    return;
  }
  const selectedAnswers = selectedOptionsArr.map((opt) => {
    return quiz.options[opt.value];
  });
  let correctOptionsScore = 0;
  //checkbox scores
  if (selectedAnswers.length > 1 ) {
    selectedAnswers.forEach((answer) => {
      if (quiz.answer.includes(answer)) {
        score++
        correctOptionsScore++;
      }
    });
    //radio buttons score
    showRightAnsw.innerText = `You answered ${correctOptionsScore} / ${quiz.answer.length} correct!`;
  } else if (quiz.answer === selectedAnswers[0]) {
      score++
      showRightAnsw.innerText = "Right!";
    } else {
      showRightAnsw.innerText = `Wrong! The right answer is: ${quiz.answer}`;
    }

  labelStyle();
  //prevents user to check in other option after checking in an option
  submitBtn.disabled = true;
  const allOptions = document.querySelectorAll("#options input");
  allOptions.forEach((box) => {
    box.disabled = true;
  })

  // remove disabled 
  nextBtn.disabled = false;
});

function nextQuestion() {
  //the queryselector here only work for radio and not checkboxes
  //checkboxes can have multiple checked inputs, detects only one
  //queryselectorAll for multiselect checkboxes
  const selectedOption = document.querySelector("#options input:checked");
  //checks if the user checked any of the options, if not than the value is null
  if(selectedOption === null) {
    //remind user to check any checkbox
    alert("you have not checked in any");
    //with return statement stays on the same page so user can check in checkbox
    return;
  }
  // moves to next question
  currentQuestion++;
  // if there is any questions left then move on to the next question
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    //if there is no more questions left show the results
    showResult();
  }
  submitBtn.disabled = false;
  //disable next button 
  nextBtn.disabled = true;
  //remove previous right answer
  showRightAnsw.innerText="";
}

//calls function 
showQuestion();

//function for the score result
function showResult() {
  quiz.innerHTML = `<h1> Quiz Completed </h1> 
  <p> Your score: ${score}/15</p>`;
  if(score <= 8) {
    const badScoreText = document.createElement("p");
    badScoreText.innerText = "Bad score..."
    badScoreText.setAttribute("id","badScoreOutput")
    // badScoreText.style.color= "red";
    quiz.append(badScoreText);
  } else if(score <=12) {
    const goodScoreText = document.createElement("p");
    goodScoreText.innerText = "Good Score!"
    goodScoreText.setAttribute("id", "goodScoreOutput")
    // goodScoreText.style.color = "yellow";
    quiz.append(goodScoreText);
  }
  else {
    const perfectScoreText = document.createElement("p");
    perfectScoreText.innerText = "Perfect Score!"
    perfectScoreText.setAttribute("id", "perfectScoreOutput")
    // perfectScoreText.style.color = "green";
    quiz.append(perfectScoreText);
  }
  
  //show redo button
  redoBtn.classList.remove("hidden");
  quiz.append(redoBtn);

  //click button to redo the quiz
  redoBtn.addEventListener("click",() => {
    if("click") {
      location.replace("");
    }
  });
  
}


// darkmode
const darkLightBtn = document.querySelector("#modeBtn");


darkLightBtn.addEventListener("click", () => {
  darkLightBtn.append();
  
});

const quizData = [
  { 
    // checkbox options
    question: "What food do penguins eat? Three right answers!",
    options: ["Starfish", "Krill", "Algae", "Fish", "Squid", "Seaweed"],
    type: "checkbox",
    answer:["Krill", "Fish", "Squid"]
  },
  {
    question: "Which penguin species is this?",
    options: ["King Penguin", "Gentoo Penguin", "Chinstrap Penguin", "Emperor Penguin", "Adelié Penguin"],
    answer: "King Penguin"
  },
  {
    question: "Do all penguins go through fasting?",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    question: "All penguins are flightless birds and semi-aquatic, meaning they live on land but spend most of their time in the water. The penguins' anatomy is shaped for water and therefore they are clumsy on land but really great and grandiose in water. There is one species that is the fastest of them all under water, with a maximum burst of speed of 36km/h. Which penguin is it?",
    options: ["Macaroni Penguin", "Humboldt Penguin", "Gentoo Penguin", "Galapagos Penguin"],
    answer: "Gentoo Penguin"
  },
  {
    // checkbox options
    question: "Penguins can be found in four different continents. Which are they?",
    options: ["South America", "Europe", "Africa", "Australia", "Asia", "North America", "Antarctica"],
    type: "checkbox",
    answer: ["South America", "Africa", "Australia", "Antarctica"]
  },
  {
    question: "Chicks go through an akward teen phase were they begin to molt. In this stage they look silly but for a chick it is a matter of survival. They shed their fluffy fur and grow waterproof feathers. A step closer to become an independent adult! Which penguin species is this little chick?",
    options: ["African Penguin", "Macaroni Penguin", "Magellanic Penguin", "Little Penguin"],
    answer: "African Penguin"
  },
  {
    question: "Which species is this?",
    options: ["Snares Penguin", "Erect-Crestet Penguin", "Northern Rockhopper Penguin", "Royal Penguin"],
    answer: "Northern Rockhopper Penguin"
  },
  {
    question: "Which species is the tallest?",
    options: ["King Penguin", "Emperor Penguin", "Royal Penguin"],
    answer: "Emperor Penguin"
  },
  {
    question: "Which specis is this?",
    options: ["Yellow-Eyed-Penguin", "Magellanic Penguin", "Galapagos Penguin", "Fiordland Penguin"],
    answer: "Magellanic Penguin"
  },
  {
    question: "What maxmimum time can emperor penguins hold their breath?",
    options: ["20 min", "10 min", "60 min", "5 min", "45 min"],
    answer: "20 min"
  },

];

//declare variables
const questionElement = document.querySelector("#questions");
const optionsElement = document.querySelector("#options");
const submitBtn = document.querySelector("#submit");


submitBtn.addEventListener("click", selectAnswer);
// Starts with first question (index 0)
let currentQuestion = 0; 
// starts with 0 scores
let score = 0; 

function showQuestion() {
  //targeting quizdata and currentQuestion, saves it in variable quiz
  const quiz = quizData[currentQuestion];
  //targeting the questions 
  questionElement.innerText = quiz.question; 

  //cler all HTML content of options
  optionsElement.innerHTML = "";
  quiz.options.forEach(option => {
    if(quiz.type === "checkbox") {
      const checkbox = document.createElement("input");
      checkbox.setAttribute("type", "checkbox");
      checkbox.addEventListener("click", () => {
        const inputs = document.querySelectorAll("#options input:checked");
        if(inputs.length > 3) {
          //unchecked 
          const checkLimit = document.querySelectorAll(`#options input type= "hidden"`);
          // document.querySelectorAll(checkLimit).disabled = true;
          
        }
      });
      const label = document.createElement("label");
      label.innerText = option;
      // create labels for options so the text will display on DOM
      optionsElement.appendChild(label);
      checkbox.innerText = option; 
      optionsElement.appendChild(checkbox);
      
    
    } else {
      const radioBtn = document.createElement("input");
      radioBtn.setAttribute("type", "radio");
      radioBtn.name = "answers";
      radioBtn.innerText = option;
      const label = document.createElement("label");
      label.innerText = option;
      optionsElement.appendChild(radioBtn);
      optionsElement.appendChild(label);
      

    }
  
  });
}

function selectAnswer(e) {
  const selectedButton = e.target; 
  const answer = quizData[currentQuestion].answer;

  if(selectedButton.innerText === answer) {
    score ++
    
    
  } else {

  }

  currentQuestion++; 

  if(currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quiz.innerHTML = `<h1> Quiz Completed </h1> 
  <p> Show your score: ${score}/${quizData.length}</p>`;
}

showQuestion();
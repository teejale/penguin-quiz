
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
    answer: ["Krill", "Fish", "Squid"]
  },
  {
    question: "Which penguin species is this?",
    options: ["King Penguin", "Gentoo Penguin", "Chinstrap Penguin", "Emperor Penguin", "Adelié Penguin"],
    answer: "King Penguin",
    img: "/img/matthew-stephenson-EWJyQTLSo5o-unsplash.jpg"
  },
  {
    question: "Do all penguins go through fasting?",
    options: ["Yes", "No"],
    answer: "Yes"
  },
  {
    question: "Which penguin species swims the fastest of them all under water?",
    options: ["Macaroni Penguin", "Humboldt Penguin", "Gentoo Penguin", "Galapagos Penguin"],
    answer: "Gentoo Penguin"
    //"All penguins are flightless birds and semi-aquatic, meaning they live on land but spend 
    // most of their time in the water. The penguins' anatomy is shaped for water and therefore 
    // they are clumsy on land but moves fast and grandiose under water water. 
    // The gentoo penguin is the fastest with a maximum burst of speed of 36km/h". 
  },
  {
    // checkbox options
    question: "Penguins can be found in four different continents. Which are they?",
    options: ["South America", "Europe", "Africa", "Australia", "Asia", "North America", "Antarctica"],
    type: "checkbox",
    answer: ["South America", "Africa", "Australia", "Antarctica"]
  },
  {
    question: "Which penguin species is this little chick?",
    options: ["African Penguin", "Macaroni Penguin", "Magellanic Penguin", "Little Penguin"],
    answer: "African Penguin",
    img: "/img/miguel-alcantara-Ai4qoYZgetA-unsplash.jpg"
    //Chicks go through an akward teen phase were they begin to molt. 
    // In this stage they can look silly, but for a chick it is a matter of survival. 
    // They shed their fluffy fur and grow waterproof feathers. A step closer to 
    // become an independent adult! 
  },
  {
    question: "Which species is this?",
    options: ["Snares Penguin", "Erect-Crestet Penguin", "Northern Rockhopper Penguin", "Royal Penguin"],
    answer: "Northern Rockhopper Penguin",
    img: "/img/thomas-denton-pjt4AzvfTh0-unsplash.jpg"
  },
  {
    question: "Which penguin species is the tallest?",
    options: ["King Penguin", "Emperor Penguin", "Royal Penguin"],
    answer: "Emperor Penguin"
  },
  {
    question: "Which penguin species is this?",
    options: ["Yellow-Eyed-Penguin", "Magellanic Penguin", "Galapagos Penguin", "Fiordland Penguin"],
    answer: "Magellanic Penguin",
    img: "/img/agl-fotos-GQLT-fno6AU-unsplash.jpg"
  },
  {
    question: "What maxmimum time can penguins hold their breath?",
    options: ["20 min", "9 min", "13 min", "2 min", "30 min"],
    answer: "20 min"
    //Emperor and king penguins can hold their breath the longest out of all the other penguin species. When diving they can hold their breath up to 20 minutes (sometimes longer in deep dives). 
    // Smaller penguin can hold their breath in a much shorter period of time compared to the bigger species. 
  },

];



//declare variables
const questionElement = document.querySelector("#questions");
const optionsElement = document.querySelector("#options");
const nextBtn = document.querySelector("#next");
const submitBtn = document.querySelector("#submit");
const showRightAnsw = document.querySelector("#rightAnswer");


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

function arraysEqualIgnoreOrder(a, b) {
  if (a.length !== b.length) return false;

  const sortedA = [...a].sort();
  const sortedB = [...b].sort();

  return sortedA.every((val, i) => val === sortedB[i]);
}


//change this 
// function arraysEqualIgnoreOrder(a, b) {
//   if (a.length !== b.length) return false;

//   const sortedA = [...a].sort();
//   const sortedB = [...b].sort();

//   return sortedA.every((val, i) => val === sortedB[i]);
// }

submitBtn.addEventListener("click", (e)  => { 
  const quiz = quizData[currentQuestion];
  const selectedOptions = document.querySelectorAll("#options input:checked");
  const selectedOptionsArr = Array.from(selectedOptions);


  if(quiz.type === "checkbox" && selectedOptionsArr.length < quiz.answer.length) {
    alert(`You have to select ${quiz.answer.length} options!`);
    return;
  }
  
  //map method
  const selectedAnswers = selectedOptionsArr.map((opt) => {
    return quiz.options[opt.value];
  })

  console.log(selectedAnswers.length);

  if(selectedAnswers.length > 1 && arraysEqualIgnoreOrder(selectedAnswers, quiz.answer)) {
    score++
    showRightAnsw.style.color = "green";
    showRightAnsw.innerText = "Right!";
  } else if (quiz.answer === selectedAnswers[0]) {
    score++
    showRightAnsw.style.color = "green";
    showRightAnsw.innerText = "Right!";
  } else {
    showRightAnsw.style.color = "red";
    showRightAnsw.innerText = `Wrong! The right answer is: ${quiz.answer}`;
  }

  submitBtn.disabled = true;
  selectedOptions.forEach((box) => {
    box.disabled = true;
  })

  // selectedOptions.forEach((e) => {

  // });
  // if quiz.answer includes ALLA e.value 
  // if(quiz.answer.includes(e.value))

  //show the next button 
  nextBtn.classList.remove("hidden");

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
  //hide the next button 
  nextBtn.classList.add("hidden");
  //remove previous right answer
  showRightAnsw.innerText="";
}

//calls function 
showQuestion();

//function for the score result
function showResult() {
  quiz.innerHTML = `<h1> Quiz Completed </h1> 
  <p> Show your score: ${score}/${quizData.length}</p>`;
  const links = document.createElement("link")
  
}


//create a next button that shows when clicked an answer!
// create a play again button at the end of the quiz! 
// add cursor pointers!


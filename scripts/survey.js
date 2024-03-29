var answers = [];

var question1 = `
<div class="survey">
<div class="start-survey" id="question2">
  <p>2. What time do you need to wake up during weekdays</p>
  <div class="start-survey-buttons">
    <input type="number" id="q2Input" name="q2" />
  </div>
  <button type="button" id="nextButton">NEXT</button>
  </div>
</div>`;

var question2 = `
<div class="survey">
<div class="start-survey" id="question3">
  <p>3. What time do you go to sleep</p>
  <div class="start-survey-buttons">
    <input type="number" id="q3Input" name="q3" />
  </div>
  <button type="button" id="nextButton">NEXT</button>
  </div>
</div>`;

var question3 = `
<div class="survey">
<div class="start-survey" id="question4">
  <p>4. Do you consume caffeine 8 hours or less before you sleep</p>
  <div class="start-survey-buttons">
    <div>
      <input type="radio" id="q4A" name="q4" value="yes" />
      <label for="q4A">Yes</label>
    </div>

    <div>
      <input type="radio" id="q4B" name="q4" value="no" />
      <label for="q4B">No</label>
    </div>
  </div>
  <button type="button" id="nextButton">NEXT</button>
  </div>
</div>`;

var question4 = `
<div class="survey">
<div class="start-survey" id="question5">
  <p>5. Are you male or female</p>
  <div class="start-survey-buttons">
    <div>
      <input type="radio" id="q5A" name="q5" value="male" />
      <label for="q5A">Male</label>
    </div>

    <div>
      <input type="radio" id="q5B" name="q5" value="female" />
      <label for="q5B">Female</label>
    </div>
    
    <div>
      <input type="radio" id="q5C" name="q5" value="prefer_not_to_answer" />
      <label for="q5C">Prefer not to answer</label>
    </div>
  </div>
</div>
<button type="submit" class="survey-button" id="page2Button">Submit</button>`;

// Define an array of HTML snippets
var questions = [question1, question2, question3, question4];

var currentIndex = 0;

// Function to update the form text
function updateFormText() {
  // Get the div element
  var div = document.getElementById("surveyDiv");

  // Clear the existing text in the div
  div.innerHTML = "";

  // Get the current HTML snippet from the array
  var currentHtml = questions[currentIndex];

  // Add the HTML snippet to the div
  div.innerHTML = currentHtml;

  // Increment the index for the next question
  console.log(answers);
  currentIndex++;
  attachNextButtonListener();
  storeAnswer();
}

// Function to store answer for the current question
function storeAnswer() {
  var currentAnswer;

  // Determine the type of input for the current question
  switch (currentIndex) {
    case 1: // Radio input for question 1
      currentAnswer = getSelectedOption('question1');
      break;
    case 2: // Number input for question 2
      currentAnswer = document.getElementById('q2Input');
      break;
    case 3: // Number input for question 3
      currentAnswer = document.getElementById('q3Input');
      break;
    case 4: // Radio input for question 4
      currentAnswer = getSelectedOption('question4');
      break;
    case 5: // Radio input for question 5
      currentAnswer = getSelectedOption('question5');
      break;
  }

  // Store the current answer in the answers array
  answers[currentIndex - 1] = currentAnswer;
}

// Function to attach event listener to the NEXT button
function attachNextButtonListener() {
  var nextButton = document.getElementById("nextButton");
  if (nextButton) {
    nextButton.addEventListener("click", updateFormText);
  }
}

// Call the function to attach event listener to the NEXT button initially
attachNextButtonListener();

// Function to handle form submission

document.addEventListener('submit', function(event) {
  // Check if the clicked element is the submit button inside the survey form
  if (event.target.closest('#surveyForm [type="submit"]')) {
    event.preventDefault(); // Prevent default form submission

    // Get the current user
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in
      var userId = user.uid;

      // Get answers for questions 1 to 5

      console.log(answers);

      // Push data to Firestore
      firebase.firestore()
        .collection('users')
        .doc(userId)
        .update(answers)
        .then(function () {
          // Clear form after successful submission
          document.getElementById('surveyForm').reset();
          window.location.href = '/schedule.html';
        })
        .catch(function (error) {
          console.error("Error submitting form:", error);
          alert("An error occurred. Please try again later.");
        });
    } else {
      // No user is signed in
      console.log("No user is signed in.");
      alert("Please sign in to submit your feedback.");
    }
  }
});

// Function to get the selected option for a question
function getSelectedOption(questionId) {
  var options
}
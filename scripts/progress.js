var currentQuestion = 1; // Track the current question

// Function to show the next question
function showNextQuestion(questionNumber, quality) {
  document.getElementById('question' + questionNumber).style.display = 'none'; // Hide the current question

  if (questionNumber === 1) {
    // Store sleep quality in Firestore
    db.collection("users").doc(firebase.auth().currentUser.uid).collection("progress").add({
      quality: quality,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(function(docRef) {
      console.log("Sleep quality submitted with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding sleep quality: ", error);
    });
  } else if (questionNumber === 2) {
    document.getElementById('question' + questionNumber).style.display = 'block'; // Show the next question
  }
}

// Function to handle form submission
document.getElementById("progressForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get user input (hours slept)
  var hours = document.getElementById("hours").value;

  // Validate input
  if (!hours) {
    alert("Please enter the number of hours slept.");
    return;
  }

  // Convert hours to a number
  hours = parseInt(hours);

  // Store data in Firestore
  db.collection("users").doc(firebase.auth().currentUser.uid).collection("sleep").add({
    hours: hours,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(function(docRef) {
    console.log("Hours slept submitted with ID: ", docRef.id);
    // Optionally, you can display a success message or redirect the user to another page
  })
  .catch(function(error) {
    console.error("Error adding hours slept: ", error);
    // Handle errors here (e.g., show an error message)
  });
});
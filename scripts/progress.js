document.getElementById("progressForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // Get user input
  var quality = document.querySelector('input[name="quality"]:checked');
  var hours = document.getElementById("hours").value;

  // Validate input
  if (!quality || !hours) {
    alert("Please fill out all fields.");
    return;
  }

  // Store data in Firestore
  db.collection("users").doc(firebase.auth().currentUser.uid).collection("progress").add({
    quality: quality.value,
    hours: parseInt(hours),
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(function(docRef) {
    console.log("Progress submitted with ID: ", docRef.id);
    
    // Hide the questions and reset the form
    document.getElementById("progressForm").reset();
    document.querySelectorAll(".question").forEach(function(question) {
      question.style.display = "none";
    });
  })
  .catch(function(error) {
    console.error("Error adding progress: ", error);
    // Handle errors here (e.g., show an error message)
  });
});


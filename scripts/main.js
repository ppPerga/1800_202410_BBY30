function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid); // Let's know who the logged-in user is by logging their UID
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
                console.log(userName);
                //$("#name-goes-here").text(userName); // jQuery
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in."); // Log a message when no user is logged in
        }
    })
}
insertNameFromFirestore();

// Function to check if a "q1" object with an answer exists in Firestore for the currently logged-in user
function checkFirestoreForQ1Answer() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var uid = user.uid; // Get the UID of the logged-in user
            // Reference to the Firestore collection of users
            var usersCollection = firebase.firestore().collection("users");

            // Reference to the document of the specific user
            var userDoc = usersCollection.doc(uid);

            // Get the user's document
            userDoc.get()
                .then(function(doc) {
                    if (doc.exists) {
                        // Check if the document contains a "q1" answer
                        if (doc.data().q1) {
                            // "q1" answer exists
                            // Change HTML content accordingly
                            document.getElementById("mainDiv").innerHTML = `<h2>Hello <span id="name-goes-here"></span></h2>
                            <p>
                              Welcome to the sleep app, a simple addition to your daily life
                              that is sure to improve your sleep.
                            </p>
                        
                            <hr class="my-4" />
                        
                            <p>
                              We see you already took the survey to get started, feel free to take it again to change
                              your answers.
                            </p>
                            <a href="survey.html">
                              <button type="button" class="btn btn-primary">
                                Take Survey
                              </button>
                            </a>`;
                            // You can add more HTML manipulation here
                            insertNameFromFirestore();

                        }
                    } else {
                        // User document does not exist
                        console.log("No such document!");
                    }
                })
                .catch(function(error) {
                    console.error("Error getting user document: ", error);
                    // Handle errors here (e.g., show an error message)
                });
        } else {
            // User is not logged in
            console.log("User not logged in.");
        }
    });
}

// Call the function to check Firestore for q1 answer for the currently logged-in user
checkFirestoreForQ1Answer();

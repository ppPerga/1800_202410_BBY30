function insertNameFromFirestore() {
    // Check if the user is logged in:
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid); // Go to the Firestore document of the user
            currentUser.get().then(userDoc => {
                // Get the user name
                let userName = userDoc.data().name;
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
                        str = "<b>Tips for before you sleep: </b><br>" 
                        + "-Keep technology out of bedroom<br>"
                        + "-Cold room will help you to fall asleep<br>"
                        + "-meditation before bed helps for better sleep<br><br>"
                        + "<b>Tips for after you wake up</b><br>"
                        + "-Wake up at the same time youre waking up every day no matter what<br>"
                        + "-Rub ice cube on your wrist to trigger the hormones of adrenaline<br>"
                        + "-Have the sunlight in your room and open the curtains"
                        if (!doc.data().q1) {
                            // "q1" answer exists
                            // Change HTML content accordingly
                            document.getElementById("mainBottom").removeAttribute('hidden');
                            insertNameFromFirestore();
                        } else{
                            document.getElementById('tipsDiv').innerHTML = str;

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
checkFirestoreForQ1Answer();

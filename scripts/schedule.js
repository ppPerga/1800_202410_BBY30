const firestore = firebase.firestore();

// Function to fetch answers from Firestore and update the HTML
async function loadResultsAndUpdateHTML(userId) {
    try {
        const docSnapshot = await userId
            .get()
            .then((docSnapshot) => {
                if (docSnapshot.exists) {
                    const answers = docSnapshot.data();
 
                    if (answers.q1 != null) {
                        var bedtime = answers.q2-answers.q1;
                        console.log(bedtime);
                        if (bedtime <= 0) {
                            bedtime+=24;
                        }
                        if (bedtime < 10){
                            bedtime = "0"+bedtime;
                        }
                        document.getElementById('scheduleDiv').innerHTML = "For your age range we reccomend getting " + answers.q1
                            + ":00 hours of sleep by going to bed at " + bedtime + ":00 and take 30 mins to 1 hour before and after sleeping" 
                            "for routines"; 
                    } else {
                        document.getElementById('scheduleDiv').innerHTML = "Survey not taken, no schedule";
                    }
                } else {
                    console.log("Document does not exist.");
                    document.getElementById('scheduleDiv').innerHTML = "Survey not taken, no schedule";
                }
            })
            .catch((error) => {
                console.error("Error fetching document:", error);
                document.getElementById('scheduleDiv').innerHTML = "Error loading results. Please try again later.";
            });
    } catch (error) {
        console.error("Error loading results and updating HTML:", error);
        document.getElementById('scheduleDiv').innerHTML = "Error loading results. Please try again later.";
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        currentUser = db.collection("users").doc(user.uid)
        loadResultsAndUpdateHTML(currentUser);
    } else {
        // No user is signed in.
        console.log("User not authenticated.");
    }
});

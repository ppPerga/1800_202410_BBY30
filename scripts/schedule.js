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
                        if (bedtime <= 0) {
                            bedtime+=24;
                        }

                        var str;
                        sleepTime = answers.q2 - answers.q3;
                        if(sleepTime < 0){
                            sleepTime += 24;
                        }
                            if(sleepTime < answers.q1) {
                                str = "You didnt sleep as much as the minimum recomended amount. We suggest getting " + answers.q1 
                                + "-" + (answers.q1-(-2)) + " hours of sleep per night.";
                            } else if (sleepTime > answers.q1-(-2)) {
                                str = "You slept more than the upper bound reccomended for people your age. We suggest getting " 
                                + answers.q1 + "-" + (answers.q1-(-2)) + " hours of sleep per night.";
                            } else {
                                str = "You slept a healthy amount for people your age, between " + answers.q1 + "-" 
                                + (answers.q1-(-2)) +". Keep it up!";
                            }

                            if (answers.q4 = "yes") {
                                str += "<br> Caffiene can stay in your system for upwards of 16 hours. Try to keep this to your morning routine or eliminate it outright";
                            } else {
                                str += "<br> Caffiene can stay in your system for upwards of 16 hours. Avoid drinking it outside of your morning routine"
                            }

                        document.getElementById('scheduleDiv').innerHTML = "For your age range we reccomend getting " + answers.q1
                            + ":00 hours of sleep by going to bed at " + bedtime 
                            + ":00 and take 30 mins to 1 hour before and after sleeping for routines. <br>" + str + ""; 
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

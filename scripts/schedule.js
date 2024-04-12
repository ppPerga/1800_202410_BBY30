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
                        var bedtime = answers.q2 - answers.q1;
                        if (bedtime <= 0) {
                            bedtime += 24;
                        }
                        var str2;
                        var str;
                        sleepTime = answers.q2 - answers.q3;
                        if (sleepTime <= 0) {
                            sleepTime += 24;
                        }
                        if(sleepTime < answers.q1){
                            str = "You don't sleep enough for people your age.<br><br>  <b>You need " + (answers.q1 - sleepTime) + " more hours per night</b><br><br>"
                            + "We recommend " + answers.q1 + ":00 - " + (answers.q1 - (-1)) + ":00 hours<br>"
                            + "You get only " + sleepTime + ":00 hours of sleep<br>";
                        } else if(sleepTime > answers.q1 - (-2)){
                            str = "You sleep more than the upper bound of people your age.<br><br>  <b>You should sleep " + (sleepTime - answers.q1) + " Less hours per night</b><br><br>"
                            + "We recommend " + answers.q1 + ":00 - " + (answers.q1 - (-2)) + ":00 hours<br>"
                            + "You get " + sleepTime + ":00 hours of sleep";;
                        } else {
                            str = "You sleep a good amount for people your age<br><br>"
                            + "We recommend " + answers.q1 + ":00 - " + (answers.q1 - (-2)) + ":00 hours<br>"
                            + "You get " + sleepTime + ":00 hours of sleep ";
                            
                        }
                        bedtime -=2;
                        if (bedtime <= 0) {
                            bedtime += 24;
                        }
                        str2 = "<b>Night Time Scheduale</b>: <br>" 
                        + (bedtime) + ":00 : Brush teeth, Shower<br>" + bedtime + ":30 : Meditation<br><br>";
                        
                        bedtime += 1;
                        if (bedtime >= 24) {
                            bedtime -= 24;
                        }
                        str2 += bedtime + ":00 : Go to bed<br><b>Morning Scheduale</b>:<br>"
                        + answers.q2 + ":00 : Wake up, brush teeth, shower<br>" 
                        + (answers.q2) + ":30 : Eat breakfast<br>"
                        + (answers.q2-(-1)) +  ":00 Start work";

                        if(answers.q4 = "yes"){
                            str2 += "<br><br> Caffiene can stay in your system for upwards of 16:00 hours, keep it to your morning" + 
                            " routine."
                        }

                        str0 = "<b>Tips for before you sleep: </b><br>" 
                        + "-Keep technology out of bedroom<br>"
                        + "-Cold room will help you to fall asleep<br>"
                        + "-meditation before bed helps for better sleep<br><br>"
                        + "<b>Tips for after you wake up</b><br>"
                        + "-Wake up at the same time youre waking up every day no matter what<br>"
                        + "-Rub ice cube on your wrist to trigger the hormones of adrenaline<br>"
                        + "-Have the sunlight in your room and open the curtains"
                        

                        document.getElementById('scheduleDiv').innerHTML = str;

                        document.getElementById('scheduleDiv2').innerHTML = str2;

                        document.getElementById('scheduleDiv0').innerHTML = str0;




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

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        currentUser = db.collection("users").doc(user.uid)
        loadResultsAndUpdateHTML(currentUser);
    } else {
        // No user is signed in.
        console.log("User not authenticated.");
    }
});

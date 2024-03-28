const firestore = firebase.firestore();

function generateUniqueStrings(answersData) {
    const uniqueStrings = {};
    answersData.forEach((answer, index) => {
        // Generate a unique string for each answer (0-4)
        const uniqueString = `a${index}_${Date.now()}`;
        uniqueStrings[uniqueString] = answer;
    });
    return uniqueStrings;
}

// Function to fetch answers from Firestore and update the HTML
async function loadResultsAndUpdateHTML(userId) {
    try {
        const docSnapshot = await firebase.firestore()
            .collection('users')
            .doc(userId)
            .collection('answers')
            .doc('answersData')
            .get();

        console.log("Document Snapshot:", docSnapshot);

        if (docSnapshot.exists) {
            const answersData = docSnapshot.data().answers;
            console.log("answersData:", answersData);

            if (answersData && answersData.length > 0) {
                const uniqueStrings = generateUniqueStrings(answersData);
                document.getElementById('scheduleDiv').innerHTML = JSON.stringify(uniqueStrings);
            } else {
                document.getElementById('scheduleDiv').innerHTML = "Survey not taken, no schedule";
            }
        } else {
            console.log("Document does not exist.");
            document.getElementById('scheduleDiv').innerHTML = "Survey not taken, no schedule";
        }
    } catch (error) {
        console.error("Error loading results and updating HTML:", error);
        document.getElementById('scheduleDiv').innerHTML = "Error loading results. Please try again later.";
    }
}

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        // User is signed in.
        loadResultsAndUpdateHTML(user.uid);
    } else {
        // No user is signed in.
        console.log("User not authenticated.");
    }
});

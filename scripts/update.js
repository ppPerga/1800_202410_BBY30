function fetchProgressData() {
    var user = firebase.auth().currentUser;
    if (user) {
      db.collection("users").doc(user.uid).collection("progress")
        .orderBy("timestamp")
        .get()
        .then(function(querySnapshot) {
          var data = [];
          querySnapshot.forEach(function(doc) {
            var point = {
              time: doc.data().timestamp.toDate(),
              length: doc.data().hours,
              quality: doc.data().quality
            };
            data.push(point);
          });
          document.getElementById('progressAnswers').insertAdjacentHTML("beforeend", generateProgressTable(data));
        })
        .catch(function(error) {
          console.error("Error fetching progress data: ", error);
          // Handle errors here (e.g., show an error message)
        });
    } else {
      console.error("User is not authenticated.");
      // Handle cases where the user is not authenticated
    }
  }

  // Check authentication state
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      // Call the function to fetch progress data
      fetchProgressData();
    } else {
      // No user is signed in.
      console.error("User is not authenticated.");
      // Handle cases where the user is not authenticated
    }
  });

  function generateProgressTable(data) {
    var table = `<table class="sleep-table">`;
    var button = '<button id="updateButton" type="submit">Update</button>';
    table += "<tr><th>Time</th><th>Length</th><th>Quality</th></tr>";
    data.forEach(function(point) {
        table += "<tr>";
        table += "<td>" + point.time + "</td>";
        table += "<td>" + point.length + "</td>";
        table += "<td>" + point.quality + "</td>";
        table += "<td>" + button + "</td>";
        table += "</tr>";
    });
    table += "</table>";
    return table;
}
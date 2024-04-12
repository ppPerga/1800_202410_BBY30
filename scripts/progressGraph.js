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
            x: doc.data().timestamp.toDate(),
            y: doc.data().hours,
            color: doc.data().quality === "Good" ? "blue" : "red"
          };
          data.push(point);
        });

        const snap = db.collection('users').doc('uid').collection('progress').limit(1).get()
        if (!snap.empty) {
          createLineGraph(data);
        } else {
        }
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

function createLineGraph(data) {
  var ctx = document.getElementById("progressChart").getContext("2d");
  var progressChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [{
        label: "Sleep Duration",
        data: data,
        backgroundColor: "lightblue",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        pointBackgroundColor: function(context) {
          return context.dataset.data[context.dataIndex].color;
        },
        pointRadius: 5
      }]
    },
    options: {
      scales: {
        x: {  
          type: 'time', 
          time: {  
              unit: 'day'
          },  
          title: {  
              display: true,  
              text: 'Date'  
          }  
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        scaleLabel: {
          display: true,
          labelString: "Sleep Duration (hours)"
        },
        ticks: {
          beginAtZero: true,
          callback: function(value, index, values) {
            return value + "h";
          }
        }
      }
    }
  }
});
}

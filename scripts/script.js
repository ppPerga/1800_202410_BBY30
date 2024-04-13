

function sayHello() {
    
}
//sayHello();

// document.getElementById("loginBtn").addEventListener("click", function() {
//     window.location.href = "login.html";
// });

function loginbutton() {
  window.location.href = "login.html";
}

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
      }).catch((error) => {
        // An error happened.
      });

      
}


function handleLogout() {
  Swal.fire({
    position: "middle",
    icon: "success",
    title: "You've logged out succesfully!",
    showConfirmButton: false,
    timer: 1000
});

logout();


setTimeout(function() {
    window.location.href = "login.html";
}, 1300);
}


// document.getElementById('logout').addEventListener('click', function() {
//   handleLogout();
// });

document.getElementById('logout-setting').addEventListener('click', function() {
  console.log("Error");
  handleLogout();
});


//////////////////////////////////////////////////////////////////////////////////

// //Handle click event on delete account button
// document.getElementById("deleteAccountBt").addEventListener("click", function () {
//   // Confirm with the user before proceeding with account deletion
//   if (confirm("Are you sure you want to delete your account?")) {
//     // Reauthenticate the user
//     var user = firebase.auth().currentUser;
//     var credential;

//     // Prompt the user to re-enter their password
//     var password = prompt("Please enter your password to confirm account deletion:");

//     // Create a credential with the provided password
//     credential = firebase.auth.EmailAuthProvider.credential(
//       user.email,
//       password
//     );

//     // Reauthenticate the user with the provided credential
//     user.reauthenticateWithCredential(credential)
//       .then(function () {
//         // User successfully reauthenticated, proceed with account deletion
//         return user.delete();
//       })
//       .then(function () {
//         // Account deletion successful
//         console.log("Account deleted successfully.");
//         // Redirect to index
//         window.location.href = "login.html";
//       })
//       .catch(function (error) {
//         // Handle reauthentication errors or account deletion errors
//         console.error("Error deleting account: ", error);
//         alert("Failed to delete account. Please try again later.");
//       });
//   }
// });


document.getElementById("deleteAccountBtn").addEventListener("click", function() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      var user = firebase.auth().currentUser;
      var credential;

      user.delete();
      
      Swal.fire({
        title: "Deleted!",
        text: "Your account has been deleted.",
        showConfirmButton: false,
        icon: "success"
      });

      setTimeout(function() {
        window.location.href = "login.html";
    }, 1300);
    }
  });
})

// Function to enable or disable dark mode
function toggleDarkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
  
  // Check if dark mode is enabled
  var isDarkModeEnabled = element.classList.contains("dark-mode");

  // Store the user's preference in localStorage
  localStorage.setItem("darkModeEnabled", isDarkModeEnabled);
}

// Function to apply dark mode based on user preference
function applyDarkMode() {
  // Check if dark mode was enabled before
  var isDarkModePreviouslyEnabled = localStorage.getItem("darkModeEnabled");

  // Apply dark mode if it was enabled before
  if (isDarkModePreviouslyEnabled === "true") {
    toggleDarkMode();
  }
}

// Apply dark mode on page load
applyDarkMode();


// function darkMode() {
//   var element = document.body;
//   element.classList.toggle("dark-mode");
// }



//   const logoutBtn = document.querySelector('#sign-out');
// logoutBtn.addEventListener('click', (e) => {
//   e.preventDefault();
//   auth.signOut().then(() => {
//     // Custom Modal from sweetalert
//     Swal.fire({
//       icon: 'success',
//       title: 'Logout successful',
//       showConfirmButton: false,
//       timer: 1500 
//     }).then(() => {
//       window.location.href = "login.html";
//     });
//   });
// });

// Swal.fire({
//   position: "top-end",
//   icon: "success",
//   title: "Your work has been saved",
//   showConfirmButton: false,
//   timer: 1500
  
// }.then(window.location.href = "login.html"));
// Logout function

//alternate to meditation page, how are you doing form
function showAlert(image) {
  switch (image) {
    case 'very_happy':
      alert('That is great news! Enjoy you day with any acitvity you like to do, hope you have a great day.');
      break;
    case 'moderate':
      alert('You can boost up your mood by doing some simple activits');
      break;
      case 'very_bad':
      alert('We are sorry you feel this way. We recommend taking some time to meditate and reflect on what is causing you to feel this way.');
      break;
    default:
      alert('Unknown image clicked!');
  }
}

// document.querySelectorAll('.clickable').forEach(function(img) {
//   img.addEventListener('click', function(event) {
//     event.preventDefault(); // Prevent default form submission behavior
//     var altText = this.alt; // Get the alt attribute of the clicked image
//     switch (altText) {
//       case 'very_happy':
//         alert('You clicked Image 1!');
//         break;
//       case 'Image 2':
//         alert('You clicked Image 2!');
//         break;
//       // Add more cases for additional images
//       default:
//         alert('Unknown image clicked!');
//     }
//   });
// });


function sayHello() {
    
}
//sayHello();

// document.getElementById("loginBtn").addEventListener("click", function() {
//     window.location.href = "login.html";
// });

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

document.getElementById('logout').addEventListener('click', function() {

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
});



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


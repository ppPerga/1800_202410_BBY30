function sayHello() {
    
}
//sayHello();

document.getElementById("loginBtn").addEventListener("click", function() {
    window.location.href = "login.html";
});

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


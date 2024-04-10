// Check if the form should be hidden
function shouldHideForm() {
    const timestamp = localStorage.getItem('hideFormUntil');
  
    if (timestamp) {
      return new Date(timestamp) > new Date();
    }
  
    return false;
  }
  
  // Hide or show the form based on the stored state
  function updateFormVisibility() {
    const form = document.getElementById('progressForm');
    if (shouldHideForm()) {
      form.hidden = true;
    } else {
      form.hidden = false;
    }
  }
  
  // Function to hide the form for a day after submission
  function hideFormForDayAfterSubmission() {
    // Check if the form has been submitted
    const form = document.getElementById('progressForm');
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form submission
  
      // Your form submission logic here...
  
      // Once the form is submitted, hide it for a day
      hideFormForDay();
    });
  }
  
  // Function to hide the form for a day
  function hideFormForDay() {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + (12 * 1000));
    localStorage.setItem('hideFormUntil', tomorrow);
    updateFormVisibility();
  }
  
  // Call function to update form visibility
  updateFormVisibility();
  
  // Call function to hide form after submission
  hideFormForDayAfterSubmission();
  
  // Attach event listener to the button (optional)
  document.getElementById('nextButton').addEventListener('click', hideFormForDay);
  
function shouldHideForm() {
  const timestamp = localStorage.getItem('hideFormUntil');
  if (timestamp) {
    return new Date(timestamp) > new Date();
  } else {
    return false;
  }
}

function updateFormVisibility() {
  const form = document.getElementById('progressForm');
  if (shouldHideForm()) {
    form.hidden = true;
  } else {
    form.hidden = false;
  }
}

function hideFormForDay() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + (24 * 60 * 60 * 1000)); // 24 hours in milliseconds
  localStorage.setItem('hideFormUntil', tomorrow);
  updateFormVisibility();
}

document.getElementById('progressForm').addEventListener('submit', function(event) {
  var quality = document.querySelector('input[name="quality"]:checked');
  var hours = document.getElementById("hours").value;

  // Validate input
  if (!quality || hours === '' || hours < 0 || hours > 24) {
    event.preventDefault(); // Prevent form submission
    return;
  }

  // Your form submission logic here...
  hideFormForDay();
});

document.getElementById('hours').addEventListener('input', function(event) {
  // Remove any non-digit characters
  this.value = this.value.replace(/\D/g, '');

  // Ensure the value is not empty and not greater than 24
  if (this.value === '' || parseInt(this.value) > 24) {
    this.value = '';
  }
});

// Initial form visibility update
updateFormVisibility();

document.addEventListener('DOMContentLoaded', function() {
    var cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
      card.addEventListener('click', function() {
        this.classList.toggle('flip');
      });
    });
  });
  


  document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission
    var form = this;
    var formData = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action);
    xhr.setRequestHeader('Accept', 'application/json');

    // Change button text to "Sending..."
    var sendButton = form.querySelector('button[type="submit"]');
    sendButton.innerText = 'Sending...';
    sendButton.disabled = true; // Disable the button while sending

    xhr.onreadystatechange = function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        var successMessage = form.querySelector('.sent-message');
        var errorMessage = form.querySelector('.error-message');
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.ok && response.next === '/thanks?language=en') {
                successMessage.style.display = 'block'; // Show the success message
                errorMessage.style.display = 'none'; // Hide the error message
                form.reset(); // Clear the form inputs
                // Hide the success message after 3 seconds
                setTimeout(function () {
                    successMessage.style.display = 'none';
                    form.reset(); // Clear the form inputs

                }, 5000);
            } else {
                errorMessage.innerHTML = 'Oops! Something went wrong and we couldn\'t send your message.';
                errorMessage.style.display = 'none'; // Show the error message
                setTimeout(function () {
                  errorMessage.style.display = 'none';
                }, 5000);
            }
        } else {
            errorMessage.innerHTML = 'Oops! Something went wrong and we couldn\'t send your message.';
            errorMessage.style.display = 'none'; // Show the error message
        }
        // Change button text back to "Send Message"
        sendButton.innerText = 'Send Message';
        sendButton.disabled = false; // Enable the button after sending
    };
    xhr.send(formData);
});





document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent the form from submitting the default way

  var firstname = document.getElementById('fname').value.trim();
  var mobile = document.getElementById('mobile').value.trim();
  var email = document.getElementById('email').value.trim();
  var subject = document.getElementById('subject').value.trim();
  
  // First name validation: should not contain numbers
  var nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(firstname)) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'First name should not contain numbers or special characters.',
      });
      return;
  }
  
  // Mobile number validation: should be exactly 10 digits, should not start with 0-5, and should not contain letters
  var mobileRegex = /^[6-9]\d{9}$/;
  if (!mobileRegex.test(mobile)) {
      Swal.fire({
          icon: 'error',
          title: 'Invalid mobile number',
          text: 'Please Enter Valid Mobile Number',
      });
      return;
  }

  // Email validation: simple regex for email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
      Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Please enter a valid email address.',
      });
      return;
  }
});

// Add input event listener to mobile number field to prevent letters and enforce format
document.getElementById('mobile').addEventListener('input', function() {
  // Remove any non-numeric characters from the input value
  this.value = this.value.replace(/\D/g, '');

  // Check if the first digit is between 6 and 9, and if it's not, remove it
  if (!/^[6-9]/.test(this.value)) {
      this.value = this.value.slice(1);
  }

  // Limit the length of the mobile number to 10 digits
  if (this.value.length > 10) {
      this.value = this.value.slice(0, 10);
  }
});

// Add input event listener to name field to prevent numbers
document.getElementById('fname').addEventListener('input', function() {
  // Remove any numeric characters from the input value
  this.value = this.value.replace(/\d/g, '');
});
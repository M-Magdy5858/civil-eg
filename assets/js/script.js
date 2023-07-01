// Get the "go-to-top" button element
const goToTopBtn = document.getElementById("goToTopBtn");

// Add an event listener to the window to listen for scroll events
window.addEventListener("scroll", () => {
  // If the user has scrolled more than 20 pixels, show the button
  if (window.scrollY > 50) {
    goToTopBtn.style.display = "block";
  } else {
    goToTopBtn.style.display = "none";
  }
});

// Add an event listener to the button to listen for clicks
goToTopBtn.addEventListener("click", () => {
  // Scroll to the top of the page using the scrollTo() method
  window.scrollTo({ top: 0, behavior: "smooth" });
});


const form = document.getElementById("contact-form");
    
function handleSubmit(event) {
  event.preventDefault();
  const status = document.getElementById("contact-form-status");
  const data = new FormData(event.target);
console.log({data})
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    console.log({response})
    if (response.ok) {
      status.innerHTML = "Thanks for your submission!";
      form.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Oops! There was a problem submitting your form"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Oops! There was a problem submitting your form"
  });
}
form.addEventListener("submit", handleSubmit)
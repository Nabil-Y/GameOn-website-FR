/////////////////////////////////
// DOM Elements
/////////////////////////////////

// navigation element
const topNav = document.querySelector("#myTopnav");

//mobile navigation hamburger icon
const navBtn = document.querySelector("#navBtn");

// modal window
const modalWindow = document.querySelector(".bground");

// modal form
const modalForm = document.querySelector("#modalForm");

// Display modal button
const modalBtn = document.querySelectorAll(".modal-btn");

//Close modal button
const modalClose = document.querySelector(".close");

// NodeList of all input fields in the form
const formData = document.querySelectorAll(".formData");

// Radio buttons array
const radioBtns = Array.from(document.querySelectorAll(".checkbox-input[type=radio]"));

// terms and conditions checkbox
const terms = document.getElementById("checkbox1");

/////////////////////////////////
// Functions
/////////////////////////////////


// Display nav on mobile
const toggleNav = () => topNav.classList.toggle("responsive");

//Display or Hide Modal
const toggleModal = () => modalWindow.classList.toggle("block");

// form validation
const validate = (event) => {
  
  // Radio buttons check
  radioBtns.every(item => item.checked === false) 
    ? radioBtns[0].closest(".formData").setAttribute("data-error-visible", "true") 
    : radioBtns[0].closest(".formData").setAttribute("data-error-visible", "false")
  ;

  // terms and conditions check
  terms.checked 
    ? terms.parentElement.setAttribute("data-error-visible", "false") 
    : terms.parentElement.setAttribute("data-error-visible", "true")
  ;

  // Stop auto reload on submit 
  event.preventDefault();
}

/////////////////////////////////
// Events
/////////////////////////////////

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", toggleModal));

// Close event modal 
modalClose.addEventListener("click", toggleModal);

// Topnav menu display event
navBtn.addEventListener("click", toggleNav);

// Form validation submit event 
modalForm.addEventListener("submit", validate);


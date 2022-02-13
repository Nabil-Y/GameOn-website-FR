/////////////////////////////////
// DOM Elements
/////////////////////////////////

// navigation element
const topNav = document.querySelector("#myTopnav");

//mobile navigation hamburger icon
const navBtn = document.querySelector("#navBtn");

// Display modal button
const modalBtn = document.querySelectorAll(".modal-btn");

// modal window
const modalWindow = document.querySelector(".bground");

// modal form
const modalForm = document.querySelector("#modalForm");

//Close modal button
const modalClose = document.querySelector(".close");

// NodeList of all input fields in the form
const formData = Array.from(document.querySelectorAll(".formData"));

// Radio buttons array
const radioBtns = Array.from(document.querySelectorAll(".checkbox-input[type=radio]"));

// terms and conditions checkbox
const terms = document.getElementById("checkbox1");

// Regex Validators

const regex = {
  name: /^[a-zà-ú']{2}([a-zà-ú-' ]+)?/i,
  email: /^[\w.-]+@[\w.-]+\.[a-z]{2,}$/,
  birthDate: /((?!00)^[0-2][0-9]|^3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, 
  competitionNumber: /^[0-9]{1,2}$/
}

// user data in form

const user = {
  firstName: document.getElementById("first"),
  lastName: document.getElementById("last"),
  email: document.getElementById("email"),
  birthDate: document.getElementById("birthdate"),
  competitionNumber: document.getElementById("quantity")
}

/////////////////////////////////
// Functions
/////////////////////////////////


// Display nav on mobile
const toggleNav = () => topNav.classList.toggle("responsive");

//Display or Hide Modal
const toggleModal = () => modalWindow.classList.toggle("block");

// form validation
const validate = (event) => {
  // firstName check
  user.firstName.value.match(regex.name)
    ? user.firstName.closest(".formData").setAttribute("data-error-visible", "false") 
    : user.firstName.closest(".formData").setAttribute("data-error-visible", "true")
  ;

  // lastName check
  user.lastName.value.match(regex.name)
    ? user.lastName.closest(".formData").setAttribute("data-error-visible", "false") 
    : user.lastName.closest(".formData").setAttribute("data-error-visible", "true")
  ;
  
  // email check
  user.email.value.match(regex.email)
    ? user.email.closest(".formData").setAttribute("data-error-visible", "false") 
    : user.email.closest(".formData").setAttribute("data-error-visible", "true")
  ;
  
  // birthdate check // 1- Regex Check // 2- Check if year of birth is > 1900 // 3- Check if year of birth isn't equal or higher to actual year
    user.birthDate.value.match(regex.birthDate) && parseInt(user.birthDate.value.slice(-4)) > 1900  && parseInt(user.birthDate.value.slice(-4)) < new Date().getFullYear()
      ? user.birthDate.closest(".formData").setAttribute("data-error-visible", "false")
      : user.birthDate.closest(".formData").setAttribute("data-error-visible", "true")
    ;
  
//   if (parseInt(user.birthDate.value.slice(-4)) > 1900 && parseInt(user.birthDate.value.slice(-4)) < new Date().getFullYear()) {
  
  // competitions number check
  user.competitionNumber.value.match(regex.competitionNumber)
    ? user.competitionNumber.closest(".formData").setAttribute("data-error-visible", "false") 
    : user.competitionNumber.closest(".formData").setAttribute("data-error-visible", "true")
  ;

  // Radio buttons check
  radioBtns.every(item => item.checked === false) 
    ? radioBtns[0].closest(".formData").setAttribute("data-error-visible", "true") 
    : radioBtns[0].closest(".formData").setAttribute("data-error-visible", "false")
  ;

  // terms and conditions check
  terms.checked 
    ? terms.closest(".formData").setAttribute("data-error-visible", "false") 
    : terms.closest(".formData").setAttribute("data-error-visible", "true")
  ;

  // Final check for errors in form 

  if (formData.every(data => data.getAttribute("data-error-visible") === "false") ) {
    // Hide content
    formData.map(data => data.classList.add("hidden"));
    document.querySelector(".text-label").classList.add("hidden");

    //Show confirmation message
    document.querySelector(".confirmation").classList.add("block");
    document.querySelector(".confirmation").innerText = "Merci pour \n votre inscription";

    //Change submit button
    document.querySelector(".btn-submit").value = "Fermer";
    document.querySelector(".btn-submit").addEventListener("click", toggleModal);
  }

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

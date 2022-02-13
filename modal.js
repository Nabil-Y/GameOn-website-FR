/////////////////////////////////
// DOM Elements
/////////////////////////////////

// Navigation element
const topNav = document.querySelector("#myTopnav");
// Mobile navigation hamburger icon
const navBtn = document.querySelector("#navBtn");
// Display modal button
const modalBtn = document.querySelectorAll(".modal-btn");
// Modal window
const modalWindow = document.querySelector(".bground");
// Modal form
const modalForm = document.querySelector("#modalForm");
// Close modal button
const modalClose = document.querySelector(".close");
// NodeList of all input fields in the form
const formData = Array.from(document.querySelectorAll(".formData"));
// Radio buttons array
const radioBtns = Array.from(document.querySelectorAll(".checkbox-input[type=radio]"));
// Terms and conditions checkbox
const terms = document.getElementById("checkbox1");
// Submit button
const submitBtn = document.querySelector(".btn-submit");
// Confirmation
const confirmationMessage = document.querySelector(".confirmation");

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

// Modal input validator 
const inputValidator = (condition, elementToCheck) => condition 
  ? elementToCheck.closest(".formData").setAttribute("data-error-visible", "false") 
  : elementToCheck.closest(".formData").setAttribute("data-error-visible", "true")
;

// form validation
const validate = (event) => {
  // firstName check
  inputValidator( 
    user.firstName.value.match(regex.name),
    user.firstName
  );

  // lastName check
  inputValidator( 
    user.lastName.value.match(regex.name),
    user.lastName
  );
  
  // email check
  inputValidator( 
    user.email.value.match(regex.email),
    user.email
  );

  // birthdate check 
  // 1- Regex Check // 2- Check if year of birth is > 1900 // 3- Check if (year of birth < actual year)
  inputValidator( 
    user.birthDate.value.match(regex.birthDate) 
    && parseInt(user.birthDate.value.slice(-4)) > 1900 
    && parseInt(user.birthDate.value.slice(-4)) < new Date().getFullYear(),
    user.birthDate
  );

  
  // competitions number check
  inputValidator( 
    user.competitionNumber.value.match(regex.competitionNumber),
    user.competitionNumber
  );

  // Radio buttons check
  inputValidator( 
    radioBtns.some(btn => btn.checked === true) ,
    radioBtns[0]
  );

  // terms and conditions check
  inputValidator( 
    terms.checked,
    terms
  );

  // Final check for errors in form 

  if (formData.every(data => data.getAttribute("data-error-visible") === "false")) {
    // Hide content
    formData.map(data => data.classList.add("hidden"));
    document.querySelector(".text-label").classList.add("hidden");

    //Show confirmation message
    confirmationMessage.classList.add("block");
    confirmationMessage.innerText = "Merci pour \n votre inscription";

    //Change submit button
    submitBtn.value = "Fermer";
    submitBtn.addEventListener("click", toggleModal);
  }

  // Stop auto reload on submit 
  event.preventDefault();
}

/////////////////////////////////
// Events
/////////////////////////////////

// launch modal event
modalBtn.forEach(btn => btn.addEventListener("click", toggleModal));

// Close event modal 
modalClose.addEventListener("click", toggleModal);

// Topnav menu display event
navBtn.addEventListener("click", toggleNav);

// Form validation submit event 
modalForm.addEventListener("submit", validate);

/////////////////////////////////
// DOM Elements
/////////////////////////////////

// Modal elements
const modal = {
  open: Array.from(document.querySelectorAll(".modal-btn")),
  window: document.querySelector(".bground"),
  form: document.querySelector("#modalForm"),
  close: document.querySelector(".close"),
  formData: Array.from(document.querySelectorAll(".formData")),
  termsConditions: document.getElementById("checkbox1"),
  submitBtn: document.querySelector(".btn-submit"),
  confirmationMessage: document.querySelector(".confirmation")
}

// Nav elements
const nav = {
  top: document.querySelector("#myTopnav"),
  btn: document.querySelector("#navBtn")
}

// Radio elements
const radio = {
  question: document.querySelector(".text-label"),
  btns: Array.from(document.querySelectorAll(".checkbox-input[type=radio]"))
}

// user data in form
const user = {
  firstName: document.getElementById("first"),
  lastName: document.getElementById("last"),
  email: document.getElementById("email"),
  birthDate: document.getElementById("birthdate"),
  competitionNumber: document.getElementById("quantity")
}

// Regex Validators
const regex = {
  name: /^[a-zà-ú']{2}([a-zà-ú-' ]+)?$/i,
  email: /^[\wà-ú.-]+@[\wà-ú.-]+\.[a-z]{2,}$/,
  birthDate: /((?!00)^[0-2][0-9]|^3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, 
  competitionNumber: /^[0-9]{1,2}$/
}

/////////////////////////////////
// Functions
/////////////////////////////////


// Display nav on mobile
const toggleNav = () => nav.top.classList.toggle("responsive");

// Change modal Layout on validation
const changeModalLayout = () => {
  modal.formData.map(input => input.classList.toggle("hidden"));
  radio.question.classList.toggle("hidden");
  modal.confirmationMessage.classList.toggle("block");
}

//Display or Hide Modal
const toggleModal = () => {
  modal.window.classList.toggle("block");
  modal.formData.map(input => input.removeAttribute("data-error-visible"));

  if (modal.confirmationMessage.classList.contains("block")) {
    changeModalLayout();
    modal.form.reset();
    modal.submitBtn.value = "C'est parti";
    modal.submitBtn.removeEventListener("click", toggleModal);
  }
}

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
    radio.btns.some(btn => btn.checked === true) ,
    radio.btns[0]
  );
  // terms and conditions check
  inputValidator( 
    modal.termsConditions.checked,
    modal.termsConditions
  );

  // Final check for errors in form 
  if (modal.formData.every(input => input.getAttribute("data-error-visible") === "false")) {
    // Hide content and add confirmation message
    changeModalLayout();
    //Change submit button
    modal.submitBtn.value = "Fermer";
    modal.submitBtn.addEventListener("click", toggleModal);
  }

  // Stop auto reload on submit 
  event.preventDefault();
}

/////////////////////////////////
// Events
/////////////////////////////////

// launch modal event
modal.open.map(btn => btn.addEventListener("click", toggleModal));

// Close event modal 
modal.close.addEventListener("click", toggleModal);

// Top navigation menu display event
nav.btn.addEventListener("click", toggleNav);

// Form validation submit event 
modal.form.addEventListener("submit", validate);

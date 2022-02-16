/////////////////////////////////
// DOM Elements
/////////////////////////////////

/**
 * Modal elements
 */
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

/**
 * Nav elements
 */
const nav = {
  top: document.querySelector("#myTopnav"),
  btn: document.querySelector("#navBtn")
}

/**
 * Radio elements
 */
const radio = {
  question: document.querySelector(".text-label"),
  btns: Array.from(document.querySelectorAll(".checkbox-input[type=radio]"))
}

/**
 * User input elements
 */
const user = {
  firstName: document.getElementById("first"),
  lastName: document.getElementById("last"),
  email: document.getElementById("email"),
  birthDate: document.getElementById("birthdate"),
  competitionNumber: document.getElementById("quantity")
}

/**
 * Regex validators
 */
const regex = {
  name: /^[a-zà-ú']{2}([a-zà-ú-' ]+)?$/i,
  email: /^[\wà-ú.-]+@[\wà-ú.-]+\.[a-z]{2,}$/,
  birthDate: /((?!00)^[0-2][0-9]|^3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, 
  competitionNumber: /^[0-9]{1,2}$/
}

/////////////////////////////////
// Functions
/////////////////////////////////


/**
 * Display/hide navigation menu on mobile
 * @returns toggle class "responsive" for nav.top element
 */
const toggleNav = () => nav.top.classList.toggle("responsive");

/**
 * Change modal Layout on validation
 * Toggle visibility of all inputs and the question before radio buttons
 * Toggle visibility of confirmation message
 */
const changeModalLayout = () => {
  modal.formData.map(input => input.classList.toggle("hidden"));
  radio.question.classList.toggle("hidden");
  modal.confirmationMessage.classList.toggle("block");
}

/**
 * Toggle vibility of modal window
 */
const toggleModal = () => {
  modal.window.classList.toggle("block");
  modal.formData.map(input => input.removeAttribute("data-error-visible"));

  /**
   * Checks if form has been completed before
   * If completed => reset all content in modal
   */
  if (modal.confirmationMessage.classList.contains("block")) {
    changeModalLayout();
    modal.form.reset();
    modal.submitBtn.value = "C'est parti";
    modal.submitBtn.removeEventListener("click", toggleModal);
  }
}

/**
 * Modal input validator 
 * @param condition 
 * @param elementToCheck 
 * @returns Display or Hide error message for elementToCheck closest input based on condition state (true or false)  
 */
const inputValidator = (condition, elementToCheck) => condition 
  ? elementToCheck.closest(".formData").setAttribute("data-error-visible", "false") 
  : elementToCheck.closest(".formData").setAttribute("data-error-visible", "true")
;

/**
 * Form validation
 * @param event 
 */
const validate = (event) => {
  /**
   * FirstName check
   */
  inputValidator( 
    user.firstName.value.match(regex.name),
    user.firstName
  );
  /**
   * LastName check
   */
  inputValidator( 
    user.lastName.value.match(regex.name),
    user.lastName
  );
  /**
   * Email check
   */
  inputValidator( 
    user.email.value.match(regex.email),
    user.email
  );
  /**
   * Birthdate check 
   * 1- Regex check
   * 2- Check if year of birth is > 1900
   * 3- Check if (year of birth < actual year)
   */
  inputValidator( 
    user.birthDate.value.match(regex.birthDate) 
    && parseInt(user.birthDate.value.slice(-4)) > 1900 
    && parseInt(user.birthDate.value.slice(-4)) < new Date().getFullYear(),
    user.birthDate
  );
  /**
   * Competitions number check
   */
  inputValidator( 
    user.competitionNumber.value.match(regex.competitionNumber),
    user.competitionNumber
  );
  /**
   * Radio buttons check
   */
  inputValidator( 
    radio.btns.some(btn => btn.checked === true) ,
    radio.btns[0]
  );
  /**
   * Terms and conditions check
   */
  inputValidator( 
    modal.termsConditions.checked,
    modal.termsConditions
  );

  /**
   * If no error, complete form validation
   */
  if (modal.formData.every(input => input.getAttribute("data-error-visible") === "false")) {
    /**
     * Hide content and display confirmation message
     */
    changeModalLayout();
    /**
     * Change submit button
     */
    modal.submitBtn.value = "Fermer";
    modal.submitBtn.addEventListener("click", toggleModal);
  }

  /**
   * Stop auto reload on submit 
   */
  event.preventDefault();
}

/////////////////////////////////
// Events
/////////////////////////////////

/**
 * Launch modal event
 */
modal.open.map(btn => btn.addEventListener("click", toggleModal));

/**
 * Close modal event 
 */
modal.close.addEventListener("click", toggleModal);

/**
 * Top navigation menu display event
 */
nav.btn.addEventListener("click", toggleNav);

/**
 * Form validation submit event 
 */
modal.form.addEventListener("submit", validate);

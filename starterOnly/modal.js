/////////////////////////////////
// DOM Elements
/////////////////////////////////

const topNav = document.querySelector("#myTopnav");
const navBtn = document.querySelector("#navBtn");

const modalBg = document.querySelector(".bground");
const modalForm = document.querySelector("#modalForm");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelector(".close");

/////////////////////////////////
// Functions
/////////////////////////////////


// Display nav on mobile
const editNav = () => {
  if (topNav.className === "topnav") {
    topNav.className += " responsive";
  } else {
    topNav.className = "topnav";
  }
}

// form validation
const validate = (event) => {
  console.log("blabla");
  event.preventDefault();
}

/////////////////////////////////
// Events
/////////////////////////////////

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click",  () => modalBg.style.display = "block" ));

// Close event modal 
modalClose.addEventListener("click", () => modalBg.style.display = "none");

// Topnav menu display event
navBtn.addEventListener("click", editNav);

// Form validation submit event 
modalForm.addEventListener("submit", validate);


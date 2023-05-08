/*--------------------- DARK/LIGHT MODE ---------------------*/

const darkSVG = document.querySelector(".dark-mode-svg")
const lightSVG = document.querySelector(".light-mode-svg")
const lightDarkBtn = document.querySelector(".dark-light-btn")
const root = document.querySelector(":root")
const helloBG = document.getElementById("hello")
const contactBG = document.getElementById("contact")

//Remove event listener
const darkSVGTransition = () => {
  lightDarkBtn.disabled = false
  darkSVG.removeEventListener("transitionend", darkSVGTransition)
}

//Remove event listener
const lightSVGTransition = () => {
  lightDarkBtn.disabled = false
  lightSVG.removeEventListener("transitionend", lightSVGTransition)
}

//Button for dark/light mode
const toggleDarkLightMode = () => {
  //Light Mode 
  if(darkSVG.classList.contains("dark-light-selected")) {
    //Prevent multiple button clicks during transition
    lightDarkBtn.disabled = true
    darkSVG.addEventListener("transitionend", darkSVGTransition)
    //Light mode on, dark mode off
    darkSVG.style.opacity = 0
    lightSVG.style.opacity = 1
    //Toggle to light mode
    darkSVG.classList.remove("dark-light-selected")
    lightSVG.classList.add("dark-light-selected")
    //ADD CODE TO CHANGE ROOT VARIABLE COLOR TO LIGHT
    root.style.setProperty("--dark-text", "#252525")
    root.style.setProperty("--dark-header", "#f0f0f0")
    root.style.setProperty("--dark-grey", "#gggggg")
    helloBG.style.background = "url('./images/hello-bg-inverted.jpg') center/cover no-repeat"
    contactBG.style.background = "url('./images/contact-bg.jpg') center/cover no-repeat"

  } else {
    //Dark Mode (initial)
    lightDarkBtn.disabled = true
    lightSVG.addEventListener("transitionend", lightSVGTransition)
    //Dark mode on, light mode off
    lightSVG.style.opacity = 0
    darkSVG.style.opacity = 1
    //Toggle to dark mode
    lightSVG.classList.remove("dark-light-selected")
    darkSVG.classList.add("dark-light-selected")
    //ADD CODE TO CHANGE ROOT VARIABLE COLOR TO DARK
    root.style.setProperty("--dark-text", "#f0f0f0")
    root.style.setProperty("--dark-header", "#252525")
    root.style.setProperty("--dark-grey", "#424242")
    helloBG.style.background = "url('./images/hello-bg.jpg') center/cover no-repeat"
    contactBG.style.background = "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('./images/contact-bg.jpg') center/cover no-repeat"
  }
}

//EVENT LISTENER
lightDarkBtn.addEventListener("click", toggleDarkLightMode)

/*--------------------- NAVBAR ---------------------*/

//Selector variables
const navBtnOpen = document.querySelector(".navbar-btn-open")
const navBtnClose = document.querySelector(".navbar-btn-close")
const mobileNav = document.querySelector(".mobile-navbar")

//EVENT LISTENER FUNCTIONS
const changeToggleBtnOpen = () => {
  //Make buttons clickable, Remove event listener
  navBtnClose.disabled = false
  navBtnOpen.disabled = false
  mobileNav.removeEventListener("transitionend", changeToggleBtnOpen)
}
const changeToggleBtnClose = () => {
  //Make buttons clickable, Remove event listener
  navBtnClose.disabled = false
  navBtnOpen.disabled = false
  mobileNav.removeEventListener("transitionend", changeToggleBtnClose)
}

//When navBtn is clicked toggle the navbar, after animation navBtn icon image changes
const toggleNav = () => {
  //Prevent multiple button clicks during transition
  navBtnClose.disabled = true
  navBtnOpen.disabled = true
  //Navbar toggle
  if(mobileNav.classList.contains("nav-toggle")) {
    //Navbar will be toggled to close
    //Wait for navbar transition to finish
    mobileNav.addEventListener("transitionend", changeToggleBtnClose)
    mobileNav.classList.toggle("nav-toggle")
  } else {
    //Navbar will be toggled to open
    //Wait for navbar transition to finish
    mobileNav.addEventListener("transitionend", changeToggleBtnOpen)
    mobileNav.classList.toggle("nav-toggle")
  }
}

//EVENT LISTENERS
navBtnOpen.addEventListener("click", toggleNav)
navBtnClose.addEventListener("click", toggleNav)
//On scroll if navbar is open, close it
window.addEventListener("scroll", ()=> {
  if(mobileNav.classList.contains("nav-toggle")) {
    navBtnClose.click()
  }
})

/*-------------- NAVBAR CURRENT SELECTION (SCROLL + CLICK) --------------*/

const sections = document.querySelectorAll("section")
const mobileNavAnchors = document.querySelectorAll(".mobile-navbar a")
const desktopNavAnchors = document.querySelectorAll(".desktop-navbar a")

//NAVIGATION - CURRENT SELECTED - SCROLL
window.addEventListener("scroll", ()=> {
  let selected = ""

  // let totalPageHeight = document.documentElement.scrollHeight
  // console.log("Total page height", totalPageHeight)

  sections.forEach((section) => {
    //Get section top offset from top of page
    const sectionOffsetTop = section.offsetTop
    // console.log("sectionOffsetTop", sectionOffsetTop)
    const sectionClientHeight = section.clientHeight
    // console.log("sectionClientHeight", sectionClientHeight)
    if(scrollY >= (sectionOffsetTop - sectionClientHeight / 2)) {
      selected = section.getAttribute('id')
    }
  })
  
  //Search through anchors and remove previous "nav-selected" class from mobile
  for(a of mobileNavAnchors) {
    //Removing mobile selected nav anchor
    a.classList.remove("nav-selected")
    if(a.classList.contains(`a-${selected}`)) {
      a.classList.add("nav-selected")
    }
  }
  //Search through anchors and remove previous "nav-selected" class from desktop
  for(a of desktopNavAnchors) {
    //Removing desktop selected nav anchor
    a.classList.remove("nav-selected")
    if(a.classList.contains(`a-${selected}`)) {
      a.classList.add("nav-selected")
    }
  }
})

/*--------------------- FORM ---------------------*/

//Form selector
const contactForm = document.querySelector("#contact-form-post")
//Form name selectors
const formName = document.querySelector("#name")
const nameIconErr = document.querySelector("#name-icon-err")
const nameIconOk = document.querySelector("#name-icon-ok")
const nameError = document.querySelector(".name-error")
//Form email selectors
const formEmail = document.querySelector("#email")
const emailIconErr = document.querySelector("#email-icon-err")
const emailIconOk = document.querySelector("#email-icon-ok")
const emailError = document.querySelector(".email-error")
//Form comment selectors
const formComment = document.querySelector("#comment")
const commentIconErr = document.querySelector("#comment-icon-err")
const commentIconOk = document.querySelector("#comment-icon-ok")
const commentError = document.querySelector(".comment-error")
//Form submit response success/error selector
const submitResponseContainer = document.querySelector(".submit-response-container")
const submitResponse = document.querySelector(".submit-response")

//Current state of submit
let submitState = false
let submitCap = 0

//Email regex test
const emailValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

//Custom submit form
const submitForm = (e) => {
  //Prevent standard form submission
  e.preventDefault()

  //If submission is true return
  if(submitState || submitCap > 2) return

  //Error flags
  let nameErrFlag = false
  let emailErrFlag = false
  let commentErrFlag = false

  //Get form data
  const nameVal = formName.value.trim()
  const emailVal = formEmail.value.trim()
  const commentVal = formComment.value.trim()

  //Form name validation
  if(nameVal === "" || nameVal === null) {
    //Validation failed
    nameErrFlag = true
    formName.style.outline = "1px solid rgb(255, 126, 126)"
    nameIconErr.style.visibility = "visible"
    nameIconOk.style.visibility = "hidden"
    nameError.style.visibility = "visible"
  } else {
    //Validation success
    nameErrFlag = false
    formName.style.outline = "1px solid rgb(125, 255, 125)"
    nameIconErr.style.visibility = "hidden"
    nameIconOk.style.visibility = "visible"
    nameError.style.visibility = "hidden"
  }

  //Form email validation
  if(emailVal === "" || emailVal === null || emailValid(emailVal) === false) {
    //Validation failed
    emailErrFlag = true
    formEmail.style.outline = "1px solid rgb(255, 126, 126)"
    emailIconErr.style.visibility = "visible"
    emailIconOk.style.visibility = "hidden"
    emailError.style.visibility = "visible"
  } else {
    //Validation success
    emailErrFlag = false;
    formEmail.style.outline = "1px solid rgb(125, 255, 125)"
    emailIconErr.style.visibility = "hidden"
    emailIconOk.style.visibility = "visible"
    emailError.style.visibility = "hidden"
  }

  //Form comment validation
  if(commentVal === "" || commentVal === null) {
    //Validation failed
    commentErrFlag = true;
    formComment.style.outline = "1px solid rgb(255, 126, 126)"
    commentIconErr.style.visibility = "visible"
    commentIconOk.style.visibility = "hidden"
    commentError.style.visibility = "visible"
  } else {
    //Validation success
    commentErrFlag = false;
    formComment.style.outline = "1px solid rgb(125, 255, 125)"
    commentIconErr.style.visibility = "hidden"
    commentIconOk.style.visibility = "visible"
    commentError.style.visibility = "hidden"
  }

  //Validation error, test error flags
  if(nameErrFlag === true || emailErrFlag === true || commentErrFlag === true) {
    return false
  }

  //Set submit state true, success
  submitState = true
  //Increase submitCap
  submitCap++

  //Validation success, Create form data object
  const formData = {
    from_name: nameVal,
    from_email: emailVal,
    message: commentVal
  }

  //Reset form after submit response
  const resetForm = () => {
    setTimeout(() => {
      //Reset form data values
      contactForm.reset()
      //Reset submitState
      submitState = false
    }, 1000)
  }

  //Reset submit response
  //@param ( resetForm(), response)
  const resetSubmitResponse = (reset, response) => {
    setTimeout(() => {
      submitResponse.innerHTML = "none"
      submitResponse.style.color = "transparent"
      submitResponseContainer.style.visibility = "hidden"
      //If response is successful reset the form
      if(response) reset()
    }, 1000)
  }

  //Initialize connection to emailjs
  emailjs.init()
  //Send form data to emailjs
  emailjs.send("pcf_27vlpfe", "pcf_template_v3w31de", formData, "QGFTODCjXoAHHdelw")
  .then(() => {
    //Response success
    submitResponse.innerHTML = "Submission success"
    submitResponse.style.color = "#00ff00"
    submitResponseContainer.style.visibility = "visible"
    resetSubmitResponse(resetForm, true)
  }, (error) => {
    //Response error;
    submitResponse.innerHTML = "Submission error"
    submitResponse.style.color = "#ff0000"
    submitResponseContainer.style.visibility = "visible"
    resetSubmitResponse(resetForm, false)
  });

  //Reset name validation success
  formName.style.outline = "none"
  nameIconOk.style.visibility = "hidden"
  //Reset email validation success
  formEmail.style.outline = "none"
  emailIconOk.style.visibility = "hidden"
  //Reset comment validation success
  formComment.style.outline = "none"
  commentIconOk.style.visibility = "hidden"
}

contactForm.addEventListener("submit", submitForm)

/*--------------------- SCROLL TO LOCAL JUMP LINK ---------------------*/

function jumpTo(link) {
  document.querySelector(link).scrollIntoView({
        behavior: 'smooth'
    });
}

/*--------------------- POST FORM DATA TO SERVER ---------------------*/

//Fetch POST form data
// const postFormData = async (formData) => {
//   const response = await fetch('http://localhost:3000/contact-form', {
//     method:'POST', 
//     headers: {'Content-Type': 'application/json'},
//     body: JSON.stringify(formData)
//   });
//   return await response.json();
// };

  //Post form data, get response data from server
  // const resObject = await postFormData(formData)
  //   .then(resObj => resObj)
  //   .catch(err => console.log(err));
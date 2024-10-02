/* scripts for Ridgevale Primary School website */

"use strict"; // contents must be interpreted in JavaScript strict mode

// global variable to use in more than one function 
var dateObject = new Date(); 
var formValidity = true;
var extras = [];
var extrasString;
var profile = {};
var stringObject;
var email = document.getElementById("Email Address");

// this function allows a user to display a different date/month/year
function populateCalendar(currentMonth) {
	var date;
	var dateToday = new Date();
	var weekday;
	var daysInMonth;
	var dateCells;
	var calCaption;
	var month;
	var year;
	var monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	if (currentMonth === -1) {
		dateObject.setMonth(dateObject.getMonth() - 1);
	} else if (currentMonth === 1) {
		dateObject.setMonth(dateObject.getMonth() + 1);
	}
	month = dateObject.getMonth();
	year = dateObject.getFullYear();
	dateObject.setDate(1);
	weekday = dateObject.getDay();
	calCaption = monthArray[month] + " " + year;
	document.querySelector("#calendar table caption").innerHTML = calCaption;
	if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {// Jan, Mar, May, Jul, Aug, Oct, Dec
		 daysInMonth = 31;
	} else if (month === 1) { //February
		if (year % 4 === 0) { // check if year is a leap year
			if (year % 100 === 0) { // year ending in 00 is not a leap year unless divisible by 400 
				if (year % 400 === 0) {
					daysInMonth = 29;
				} else {
					daysInMonth = 28;
				}
			} else {
				daysInMonth = 29;
			}
		} else {
			daysInMonth = 28;
		}
	} else {// Apr, Jun, Sep, Nov
		daysInMonth = 30;
	}
	dateCells = document.getElementsByName("date");
	for (var i = 0; i < dateCells.length; i++) {
		//clear existing table dates
		dateCells[i].innerHTML = "";
		dateCells[i].className = "";
	}
	for (var i = weekday; i < daysInMonth + weekday; i++) {
		//loop to add dates to the cells of the calender table
		dateCells[i].innerHTML = dateObject.getDate();
		dateCells[i].className = "date";
		if (dateToday < dateObject) {
			dateCells[i].className = "futuredate";
		} else if (dateToday > dateObject) {
			dateCells[i].className = "pastdate";
		} else if (dateToday.getDate() - 1 == dateObject.getDate()) {
			dateCells[i].className = "currentdate";
		}
		date = dateObject.getDate() + 1;
		dateObject.setDate(date);
	}
	// reset month to the month shown
	dateObject.setMonth(dateObject.getMonth() - 1);
}

function prevMo() {
	populateCalendar(-1);
}

function nextMo() {
	populateCalendar(1);
}

function changeMonth() {
	var prevMonth = document.getElementById("prev");
	var nextMonth = document.getElementById("next");
	if (prevMonth.addEventListener) {
		prevMonth.addEventListener("click", prevMo, false);
		nextMonth.addEventListener("click", nextMo, false);
	} else if (prevMonth.attachEvent) {
		prevMonth.attachEvent("onclick", prevMo);
		nextMonth.attachEvent("onclick", nextMo);
	}
}

function scrollToTop() {
	var toTopButtn = document.getElementById("topbttn");
	// statement to get the current scroll value
	let y = window.scrollY;
	
	// When scroll value is greater than the window height, change the class of toTopButtn to have it displayed
	if (y > 500) {
		toTopButtn.className = "top";
	} else {
		toTopButtn.className = "hide";
	}
}

/* validate Personal Info fieldset */
function validatePersonalInfo() {
	var errorDiv = document.querySelector(" #errorInfo");
	var fName = document.getElementById("First Name");
	var lName = document.getElementById("Last Name");
	var tel = document.getElementById("Phone Number");
	var email = document.getElementById("Email Address");
	var errorColor = "red";
	var inputElements = document.querySelectorAll(" .personalinfo");
	var elementCount = inputElements.length;
	var currentElement;
    var errorDiv = document.getElementById("errorEmail");
    var emailVerify = /^[_\w\-]+(\.[_\w\-]+)*@[\w\-]+(\.[\w\-]+)*(\.[\D]{2,6})$/; 
	try {
		for (var i = 0; i < elementCount; i++) {
			// validate input elements for first name, last name, email address and phone number fields
			currentElement = inputElements[i];
			if (currentElement.value === "") {
			currentElement.style.background = "red";
			throw "Please complete all personal information fields";
			} else {
			currentElement.style.background = "white";
			formValidity = true;
			}
		}
		if (emailVerify.test(email.value) === false) {
			email.style.background = "red";
			throw "Please provide a valid email address";
		} else {
			throw "";
			email.style.background = "white";
		}
		/*if ((usernameElement.value !== "" && pass1Element.value !== "" && pass2Element.value !== "")) {
			// all fields are filled 
			if (pass1Element.value !== pass2Element.value) {
				// passwords do not match
				passwordMismatch = true;
				throw "Passwords entered do not match; please reenter.";
			}
		}*/
	}
	catch(msg) {
		errorDiv.innerHTML = msg;
		errorDiv.style.display = "block";
		/*if (passwordMismatch) {
			usernameElement.style.background = "";
			pass1Element.style.background = invColor;
			pass2Element.style.background = invColor;
		} else {*/
		if (fName.value === "") {
			fName.style.background = errorColor;
		}
		if (lName.value === "") {
			lName.style.background = errorColor;
		}
		if (tel.value === "") {
			tel.style.background = errorColor;
		}
		if (email.value === "") {
			email.style.background = errorColor;
		}
		formValidity = false;
	}
}

/* validate type of school fees payment */
function validatePayment() {
	var errorDiv = document.querySelector("#errorInfo2");
	var annualPay = document.getElementById("AnnualPayment");
	var monthPay = document.getElementById("MonthlyPayment");
	var inputElements = document.querySelectorAll(" .pay");
	var elementCount = inputElements.length;
	var currentElement;
	try {
		if(!annualPay.checked && !monthPay.checked) {
			// verify that a payment period is selected
			for (var i = 0; i < 2; i++) {
				inputElements[i].style.outline = "1px solid red";
			} throw "Please select a payment period";
		} else {
			for (var i = 0; i < 2; i++) {
				inputElements[i].style.outline = "";
			} throw ""; formValidity = true;
		}
		/*for (var i = 0; i < elementCount; i++) {
			// verify that a month and year have been selected
			currentElement = inputElements[i];
			if (!currentElement.se === -1) {
				currentElement.style.border = "1px solid red";
				fieldsetValidity = false;
			} else {
				currentElement.style.border = "";
			}
		}
		if(cvvElement.value === "") {
			// verify that a cvv value has been entered
			cvvElement.style.background = "rgb(255, 233, 233)";
			fieldsetValidity = false;
		} else {
			cvvElement.style.background = "white";
		}
		if (!fieldsetValidity) { //check if any field is blank
			throw "Please complete all payment information.";
		} else {
			errorDiv.style.display = "none";
		}*/
	}
	catch(msg) {
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

function validateNumAttending() {
	var errorDiv = document.querySelector(" #errorInfo3");
	var children = document.getElementById("childrenNr");
	try {
		if (children.value === "") {
			children.style.background = "red";
			throw "Please enter how many children will be attending (1 - 4)";
		} else {
			children.style.background = "white";
			throw "";
			formValidity = true;
		}
	}
	catch(msg) {
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

function validateSelectDate() {
	var errorDiv = document.querySelector(" #errorInfo4");
	var request = document.getElementById("RequestDate");
	try {
		if (request.value === "") {
			request.style.background = "red";
			throw "Please select a date";
		} else {
			request.style.background = "white";
			throw "";
			formValidity = true;
		}
	}
	catch(msg) {
		errorDiv.style.display = "block";
		errorDiv.innerHTML = msg;
		formValidity = false;
	}
}

/*validate form */
function formValidate(evt) {
	if (evt.preventDefault) {
		evt.preventDefault(); // prevent form from submitting
	} else {
		evt.returnValue = false; // prevent form from submitting in IE8
	}
	formValidity = true; // reset value for validation
	validateAddressSection();
	validatePersonalInfo();
	validatePayment();
	validateNumAttending();
	validateSelectDate();
	createCookies();
	if (formValidity === true) {
		document.getElementById("errorText").innerHTML = "";
		document.getElementById("errorText").style.display = "none";
		document.getElementsByTagName("form")[0].submit();
	} else {
		document.getElementById("errorText").innerHTML = "Please fix the highlighted missing information and then resubmit the form.";
		document.getElementById("errorText").style.display = "block";
		scroll(0,0);
	}
}

// add selected extra-mural activities to extras array
function registerActivities(event) {
   if (event === undefined) { // get caller element in IE8
      event = window.event;
   }
   var callerElement = event.target || event.srcElement;
   var activity = callerElement.value;
   if (callerElement.checked) { // if box has just been checked
      //add checkbox value to extras array
	  extras.push(activity);

     /* // add checkbox value to list in profile section
      var newLodging = document.createElement("li");
      newLodging.innerHTML = lodgingName;
      document.getElementById("profileLodgings").appendChild(newLodging);
      // make profile section and lodging section visible
      document.getElementById("profile").style.display = "block";
      document.getElementById("lodgingsSection").style.display = "block";*/
    } else {// if extra-mural activities box has just been unchecked
		var removeItems = document.querySelectorAll(" .extras");
		for (var i = 0; i < removeItems.length; i++) {
			if (removeItems[i].innerHTML === activity) {
				//remove element at index i from array
				extra.splice(i, 1);
				// remove lodging from profile list
				//listItems[i].parentNode.removeChild(listItems[i]);
				break;
			}
		}
	}
}

//convert extras array into string for submission
function changeToString() {
	//convert extras array to string
	extrasString = extras.toString();
	
	//convert profile object to string
	stringObject = JSON.stringify(profile);
}

function createCookies() {
	var fields = document.querySelectorAll("input[type=text], input[type=email], input[type=date], input[type=checkbox], input[type=number]");
	for (var i = 0; i < fields.length; i++) {
		var currentValue = decodeURIComponent(fields[i].value);
		currentValue = currentValue.replace(/\+/g, " ");
		document.cookie = fields[i].name + "=" + currentValue;
	}
}

// validate entered username
function validateUsername() {
   var unInput = document.getElementById("username");
   var errorDiv = document.getElementById("usernameError");
   try {
	   //if username input is less than 5 characters the following code must be executed
	   if (/.{5,}/.test(unInput.value) === false) {
		   throw "Username must be atleast 5 characters long";
	    } else if (/\W/.test(unInput.value) === true) {
		   throw "Username must contain only letters and numbers";
	    }

		// remove any username error styling and message
		unInput.style.background = "";
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
		// copy valid username value to profile object
		profile.username = unInput.value;
		profile.email = email.value;
		// copy valid email value to profile object
		// copy profile.username value to profile section
		//document.getElementById("profileUsername").innerHTML = profile.username;
		// make profile section and username section visible
		//document.getElementById("profile").style.display = "block";
		//document.getElementById("usernameSection").style.display = "block";
   }
   catch(msg) {
      // display error message
      errorDiv.style.display = "block";
      errorDiv.innerHTML = msg;
      // change input style
      unInput.style.background = "red";
   }
}

// validate entered password
function validatePassword() {
	var pw1Input = document.getElementById("pass1");
    var pw2Input = document.getElementById("pass2");
    var errorDiv = document.getElementById("passwordError");
    try {
	    if (/.{8,}/.test(pw1Input.value) === false) {
			throw "Password must be atleast 8 characters";
	    } else if (pw1Input.value.localeCompare(pw2Input.value) !== 0) {
		    throw "Passwords must match";
	    } else if (/[a-zA-Z]/.test(pw1Input.value) === false) {
		    throw "Password must contain at least one letter";
	    } else if (/\d/.test(pw1Input.value) === false) {
		    throw "Password must contain at least one number";
	    } else if (/[!@#_]/.test(pw1Input.value) === false) {
		    throw "Password must contain at least one of the following symbols ! @ # _";
	    }

		// remove any password error styling and message
		pw1Input.style.background = "";
		pw2Input.style.background = "";
		errorDiv.style.display = "none";
		errorDiv.innerHTML = "";
		// copy valid password to profile object
		profile.password = pw1Input.value;
    }
    catch(msg) {
       // display error message
       errorDiv.style.display = "block";
       errorDiv.innerHTML = msg;
       // change input style
       pw1Input.style.background = "red";
       pw2Input.style.background = "red";      
   }
}

function displayDataFile() {
	var xhr;
	if (window.XMLHttpRequest) {
		xhr = new XMLHttpRequest(); // for all browsers except IE
	} else {
		xhr = new ActiveXObject("Microsoft.XMLHTTP"); // for IE
	}
	xhr.abort();
	xhr.open("GET", "Staff_Data_File.xml", true);
	xhr.onreadystatechange = function () {
		if (xhr.readyState === 4 && xhr.status === 200) {			
		var items = xhr.responseXML.getElementsByTagName("staffmembers");
		var output = '<ul>';
		for (var i = 0; i < items.length; i++)
			output += "<li>" + items[i].firstChild.nodeValue + "</li>";
			output += "</ul>";
			var div = document.getElementById("info");
			div.innerHTML = output;
		}
	}
	xhr.send(null);
}

function display(event) {
	if (evt.type=== "click") {
		var subMenu = document.getElementById("menus");
		submenu.className = "show";
	}
}

function hide(event) {
	if (evt.type === "blur") {
		var subMenu = document.getElementById("menus");
		subMenu.className = "hideMenu";
	}
}

function createEventListeners() {
	var activities = document.getElementsByName("extramurals");
    if (activities[0].addEventListener) {
		for (var i = 0; i < activities.length; i++) {
			activities[i].addEventListener("change", registerActivities, false);
		}
	} else if (activities[0].attachEvent) {
		for (var i = 0; i < activities.length; i++) {
			activities[i].attachEvent("onchange", registerActivities);
		}
	}
}

if (window.addEventListener) {
	window.addEventListener("scroll", scrollToTop, false);
} else if (window.attachEvent) {
	window.attachEvent("onscroll", scrollToTop);
}


if (window.addEventListener) {
	window.addEventListener ("load", populateCalendar, false);
	window.addEventListener("load", changeMonth, false);
} else if (window.attachEvent) {
	window.attachEvent("onload", populateCalendar);
	window.attachEvent("onload", changeMonth);
}

var staffM = document.getElementById("stafflink");
	if (staffM.addEventListener) {
		staffM.addEventListener("click", displayDataFile, false);
	} else if (staffM.attachEvent) {
		staffM.attachEvent("onclick", displayDataFile);
	}

var form = document.getElementsByTagName("form")[0];
	if (form.addEventListener) {
		form.addEventListener("submit", formValidate, false);
	} else if (form.attachEvent) {
		form.attachEvent("onsubmit", formValidate);
	}

var button = document.getElementById("submit");
    if (button.addEventListener) {
		button.addEventListener("click", changeToString, false);
	} else if (button.attachEvent) {
		button.attachEvent("onclick", changeToString);
	}

if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}
var unInput = document.getElementById("username");
    var pw2Input = document.getElementById("pass2");
    if (unInput.addEventListener) {
      unInput.addEventListener("change", validateUsername, false); 
      pw2Input.addEventListener("change", validatePassword, false); 
    } else if (unInput.attachEvent) {
      unInput.attachEvent("onchange", validateUsername);
      pw2Input.attachEvent("onchange", validatePassword);
    }

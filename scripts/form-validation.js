const form = document.querySelector("form");
const userName = document.getElementById("user-name");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeat-password");
const email = document.getElementById("email");
const firstName = document.getElementById("name");
const surname = document.getElementById("surname");
const country = document.getElementById("country");
const language = document.getElementById("language");
const city = document.getElementById("city");
const streetname = document.getElementById("street-name");
const zipcode = document.getElementById("zipcode");
const houseNumber = document.getElementById("house-number");
const bio = document.getElementById("bio");
const sex1 = document.getElementById("eboy");
const sex2 = document.getElementById("egirl");
const sex3 = document.getElementById("none");
const client = document.getElementById("client");
const supplier = document.getElementById("supplier");
const companyName = document.getElementById("company-name");
companyName.disabled = true;

var validityMap = new Map();
validityMap.set(userName, false);
validityMap.set(password, false);
validityMap.set(repeatPassword, false);
validityMap.set(email, false);
validityMap.set(firstName, false);
validityMap.set(surname, false);
validityMap.set(country, false);
validityMap.set(language, false);
validityMap.set(zipcode, false);

form.addEventListener("submit", (e) => {
	e.preventDefault();

	validate();
});

const throwError = (element, message) => {
	const inputValidation = element.parentElement;
	const error = inputValidation.querySelector(".message");
	error.classList.add("error");
	error.classList.remove("valid");

	validityMap.set(element, false);
	error.innerText = message;
};

const throwSuccess = (element) => {
	const inputValidation = element.parentElement;
	const success = inputValidation.querySelector(".message");
	success.classList.add("valid");
	success.classList.remove("error");

	validityMap.set(element, true);
	success.innerText = "Looks good!";
};

const validate = () => {
	const userNameValue = userName.value;
	const passwordValue = password.value;
	const repeatPasswordValue = repeatPassword.value;
	const emailValue = email.value;
	const nameValue = firstName.value;
	const surnameValue = surname.value;
	const countryValue = country.value;
	const languageValue = language.value;
	const zipcodeValue = zipcode.value;

	//Fields that can be empty
	throwSuccess(city);
	throwSuccess(streetname);
	throwSuccess(houseNumber);

	//Username check
	const userNamePattern = /.*[0-9!-\/:-@\[-\`{-~]{1,}$/;
	if (userNameValue.length < 5 || userNameValue.length > 12) {
		throwError(userName, "User ID has to be between 5 and 12 characters!");
	} else if (
		userNameValue.charAt(0) !== userNameValue.charAt(0).toUpperCase()
	) {
		throwError(userName, "User ID has to start with a capital letter!");
	} else if (!userNamePattern.test(userNameValue)) {
		throwError(
			userName,
			"User ID has to end with a number or a special character!"
		);
	} else {
		throwSuccess(userName);
	}

	//Password check
	const passwordPattern =
		/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!-\/:-@\[-\`{-~]).{12,}$/;
	if (passwordValue.length < 12) {
		throwError(password, "Password must be at least 12 characters long!");
	} else if (!passwordPattern.test(passwordValue)) {
		throwError(
			password,
			"Password must contain uppercase letters, lowercase letters, numbers, and symbols!"
		);
	} else {
		throwSuccess(password);
	}

	if (passwordValue !== repeatPasswordValue) {
		throwError(repeatPassword, "Your passwords must match!");
	} else {
		throwSuccess(repeatPassword);
	}

	const alphabetPattern = /^[a-zA-Z]+$/;
	//Name check
	if (!alphabetPattern.test(nameValue)) {
		throwError(firstName, "Your first name must only contain letters!");
	} else {
		throwSuccess(firstName);
	}

	if (!alphabetPattern.test(surnameValue)) {
		throwError(surname, "Your surname must only contain letters!");
	} else {
		throwSuccess(surname);
	}

	//ZIP code check
	const zipPattern = /^[0-9]{4}[A-Z]{2}$/;
	if (!zipPattern.test(zipcodeValue) && zipcodeValue !== "") {
		throwError(zipcode, "Your ZIP code must be of form 1234AB!");
	} else {
		throwSuccess(zipcode);
	}

	//email check
	const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	if (!emailPattern.test(emailValue)) {
		throwError(email, "Your email must be a valid email address!");
	} else {
		throwSuccess(email);
	}

	//Sex check
	if (!sex1.checked && !sex2.checked && !sex3.checked) {
		throwError(sex1, "Select your sex!");
	} else {
		throwSuccess(sex1);
	}

	//Suppllier/Client check
	if (!supplier.checked && !client.checked) {
		throwError(supplier, "Select your account type!");
	} else {
		throwSuccess(supplier);
	}

	if (supplier.checked && companyName.value === "") {
		throwError(companyName, "Provide your company name!");
	} else {
		throwSuccess(companyName);
	}

	supplier.onclick = () => {
		companyName.disabled = false;
	};

	client.onclick = () => {
		companyName.value = "";
		companyName.disabled = true;
	};

	//Null Checks

	if (userNameValue === "") {
		throwError(userName, "Provide your user ID!");
	}

	if (passwordValue === "") {
		throwError(password, "Provide your password!");
	}

	if (repeatPasswordValue === "") {
		throwError(repeatPassword, "Confirm your password!");
	}

	if (emailValue === "") {
		throwError(email, "Provide your email!");
	}

	if (nameValue === "") {
		throwError(firstName, "Provide your first name!");
	}

	if (surnameValue === "") {
		throwError(surname, "Provide your surname!");
	}

	if (countryValue === "") {
		throwError(country, "Provide your country!");
	} else {
		throwSuccess(country);
	}

	if (languageValue === "") {
		throwError(language, "Provide your language!");
	} else {
		throwSuccess(language);
	}

    let valid = true;
    for(let e of validityMap.values()) {
        if(e == false) valid = false;
    }

    if(valid) showTrackingData();
};

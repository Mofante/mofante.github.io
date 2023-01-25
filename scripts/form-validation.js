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

supplier.onclick = () => {
	companyName.disabled = false;
};

client.onclick = () => {
	companyName.value = "";
	companyName.disabled = true;
};

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
	const specialCharactersAndNumbers =
		"!@#$%^&*()_+=-`~,<.>/?;:'|]}[{0123456789";
	if (userNameValue.length < 5 || userNameValue.length > 12) {
		throwError(userName, "User ID has to be between 5 and 12 characters!");
	} else if (
		userNameValue.charAt(0) !== userNameValue.charAt(0).toUpperCase()
	) {
		throwError(userName, "User ID has to start with a capital letter!");
	} else if (
		!specialCharactersAndNumbers.includes(
			userNameValue.charAt(userNameValue.length - 1)
		)
	) {
		throwError(
			userName,
			"User ID has to end with a number or a special character!"
		);
	} else {
		throwSuccess(userName);
	}

	//Password check
	let containsUppercase = false;
	let containsLowercase = false;
	let containsNumber = false;
	let containsSymbol = false;

	for (x of passwordValue.split("")) {
		if (x >= "A" && x <= "Z") containsUppercase = true;
		if (x >= "a" && x <= "z") containsLowercase = true;
		if (x >= "0" && x <= "9") containsNumber = true;
		if ("!@#$%^&*()_-+={[}];:'|<>?,./`~".includes(x)) containsSymbol = true;
	}

	if (passwordValue.length < 12) {
		throwError(password, "Password must be at least 12 characters long!");
	} else if (
		!(
			containsLowercase &&
			containsUppercase &&
			containsNumber &&
			containsSymbol
		)
	) {
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

	//Name check
	if (
		!nameValue
			.toUpperCase()
			.split("")
			.every((x) => x >= "A" && x <= "Z")
	) {
		throwError(firstName, "Your first name must only contain letters!");
	} else {
		throwSuccess(firstName);
	}

	if (
		!surnameValue
			.toUpperCase()
			.split("")
			.every((x) => x >= "A" && x <= "Z")
	) {
		throwError(surname, "Your surname must only contain letters!");
	} else {
		throwSuccess(surname);
	}

	//ZIP code check
	if (zipcodeValue == "") {
		throwSuccess(zipcode);
	} else if (
		!(
			zipcodeValue.length === 6 &&
			zipcodeValue.charAt(0) >= "0" &&
			zipcodeValue.charAt(0) <= "9" &&
			zipcodeValue.charAt(1) >= "0" &&
			zipcodeValue.charAt(1) <= "9" &&
			zipcodeValue.charAt(2) >= "0" &&
			zipcodeValue.charAt(2) <= "9" &&
			zipcodeValue.charAt(3) >= "0" &&
			zipcodeValue.charAt(3) <= "9" &&
			zipcodeValue.charAt(4) >= "A" &&
			zipcodeValue.charAt(4) <= "Z" &&
			zipcodeValue.charAt(5) >= "A" &&
			zipcodeValue.charAt(5) <= "Z"
		)
	) {
		throwError(zipcode, "Your ZIP code must be of form 1234AB!");
	} else {
		throwSuccess(zipcode);
	}

	//email check
	if (
		!(
			emailValue.split("@").length > 1 &&
			emailValue.split("@").length < 3 &&
			emailValue.split("@")[1].split(".").length > 1
		)
	) {
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
	for (let e of validityMap.values()) {
		if (e == false) valid = false;
	}

	if (valid) showTrackingData();

	let sexValue = sex1.checked ? "eboy" : sex2.checked ? "egirl" : "eneither";

	let accountTypeValue = client.checked ? "client" : "supplier";
	if (valid)
		window.confirm(
			"User name: " +
				userNameValue +
				"\n" +
				"Password: " +
				passwordValue +
				"\n" +
				"Email: " +
				emailValue +
				"\n" +
				"Name: " +
				nameValue +
				"\n" +
				"Surname: " +
				surnameValue +
				"\n" +
				"Country: " +
				countryValue +
				"\n" +
				"Language: " +
				languageValue +
				"\n" +
				"City: " +
				city.value +
				"\n" +
				"Streetname: " +
				streetname.value +
				"\n" +
				"ZIP code: " +
				zipcodeValue +
				"\n" +
				"House number: " +
				houseNumber.value +
				"\n" +
				"Bio: " +
				bio.value +
				"\n" +
				"Sex: " +
				sexValue +
				"\n" +
				"Account type: " +
				accountTypeValue +
				"\n" +
				"Company name: " +
				companyName.value
		);
};
